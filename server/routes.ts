import express, { Request, Response } from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { 
  insertUserSchema, 
  insertChatMessageSchema, 
  insertImageGenerationSchema, 
  insertCodeGenerationSchema, 
  insertPointTransactionSchema
} from "@shared/schema";
import bcrypt from "bcryptjs";
import MemoryStore from "memorystore";
import { processChatMessage, generateCode, generateImage } from "./openai";

const SessionStore = MemoryStore(session);

// Helper function to hash passwords
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Helper function to compare passwords
const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export async function registerRoutes(app: Express): Promise<Server> {
  const router = express.Router();
  
  // Session setup
  app.use(session({
    cookie: { maxAge: 86400000 }, // 24 hours
    store: new SessionStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'zekibot-secret-key'
  }));
  
  // Passport setup
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await storage.getUserByEmail(email);
        if (!user) return done(null, false, { message: 'Kullanıcı bulunamadı' });
        
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Geçersiz şifre' });
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));
  
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  
  // Auth routes
  router.post('/auth/register', async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user exists
      const emailExists = await storage.getUserByEmail(userData.email);
      if (emailExists) {
        return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor' });
      }
      
      const usernameExists = await storage.getUserByUsername(userData.username);
      if (usernameExists) {
        return res.status(400).json({ message: 'Bu kullanıcı adı zaten kullanılıyor' });
      }
      
      // Hash password
      userData.password = await hashPassword(userData.password);
      
      // Create user
      const user = await storage.createUser(userData);
      
      // Create initial points transaction
      await storage.createPointTransaction({
        userId: user.id,
        amount: 100,
        description: 'Kayıt bonusu'
      });
      
      // Login user
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Oturum açma hatası' });
        }
        
        const { password, ...userWithoutPassword } = user;
        return res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
      }
      return res.status(500).json({ message: 'Sunucu hatası' });
    }
  });
  
  router.post('/auth/login', passport.authenticate('local'), (req: Request, res: Response) => {
    const user: any = req.user;
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });
  
  router.post('/auth/logout', (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: 'Çıkış yapılırken hata oluştu' });
      res.json({ message: 'Başarıyla çıkış yapıldı' });
    });
  });
  
  router.get('/auth/status', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const user: any = req.user;
      const { password, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    }
    return res.status(401).json({ message: 'Oturum açılmamış' });
  });
  
  // Middleware to check if user is authenticated
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: 'Oturum açmanız gerekiyor' });
  };
  
  // Middleware to check if user is admin
  const isAdmin = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated() && (req.user as any).isAdmin) {
      return next();
    }
    return res.status(403).json({ message: 'Yetkisiz erişim' });
  };
  
  // Points check middleware
  const hasEnoughPoints = (pointCost: number) => {
    return async (req: Request, res: Response, next: Function) => {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Oturum açmanız gerekiyor' });
      }
      
      const user: any = req.user;
      
      if (user.points < pointCost) {
        return res.status(402).json({ 
          message: 'Yeterli puanınız yok',
          required: pointCost,
          current: user.points
        });
      }
      
      next();
    };
  };
  
  // User routes
  router.get('/user/points', isAuthenticated, async (req: Request, res: Response) => {
    const user: any = req.user;
    res.json({ points: user.points });
  });
  
  router.get('/user/transactions', isAuthenticated, async (req: Request, res: Response) => {
    const user: any = req.user;
    const transactions = await storage.getPointTransactionsByUserId(user.id);
    res.json(transactions);
  });
  
  // Chat routes
  router.post('/chat', isAuthenticated, hasEnoughPoints(5), async (req: Request, res: Response) => {
    try {
      const user: any = req.user;
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: 'Mesaj gerekli' });
      }
      
      // Call OpenAI API
      const response = await processChatMessage(message);
      
      // Save chat message
      const chatMessage = await storage.createChatMessage({
        userId: user.id,
        message,
        response
      });
      
      // Deduct points
      await storage.createPointTransaction({
        userId: user.id,
        amount: -5,
        description: 'Sohbet kullanımı'
      });
      
      res.json(chatMessage);
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ message: `Sohbet mesajı gönderilirken hata oluştu: ${error.message}` });
    }
  });
  
  router.get('/chat/history', isAuthenticated, async (req: Request, res: Response) => {
    const user: any = req.user;
    const messages = await storage.getChatMessagesByUserId(user.id);
    res.json(messages);
  });
  
  // Image generation routes
  router.post('/image/generate', isAuthenticated, hasEnoughPoints(10), async (req: Request, res: Response) => {
    try {
      const user: any = req.user;
      const { prompt } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ message: 'Görsel açıklaması gerekli' });
      }
      
      // Call OpenAI DALL-E API
      const imageUrl = await generateImage(prompt);
      
      // Save image generation
      const imageGeneration = await storage.createImageGeneration({
        userId: user.id,
        prompt,
        imageUrl
      });
      
      // Deduct points
      await storage.createPointTransaction({
        userId: user.id,
        amount: -10,
        description: 'Görsel oluşturma'
      });
      
      res.json(imageGeneration);
    } catch (error: any) {
      console.error("Image generation error:", error);
      res.status(500).json({ message: `Görsel oluşturulurken hata oluştu: ${error.message}` });
    }
  });
  
  router.get('/image/history', isAuthenticated, async (req: Request, res: Response) => {
    const user: any = req.user;
    const images = await storage.getImageGenerationsByUserId(user.id);
    res.json(images);
  });
  
  // Code generation routes
  router.post('/code/generate', isAuthenticated, hasEnoughPoints(8), async (req: Request, res: Response) => {
    try {
      const user: any = req.user;
      const { prompt, language } = req.body;
      
      if (!prompt || !language) {
        return res.status(400).json({ message: 'Kod açıklaması ve dil seçimi gerekli' });
      }
      
      // Call OpenAI API for code generation
      const code = await generateCode(prompt, language);
      
      // Save code generation
      const codeGeneration = await storage.createCodeGeneration({
        userId: user.id,
        prompt,
        code,
        language
      });
      
      // Deduct points
      await storage.createPointTransaction({
        userId: user.id,
        amount: -8,
        description: 'Kod oluşturma'
      });
      
      res.json(codeGeneration);
    } catch (error: any) {
      console.error("Code generation error:", error);
      res.status(500).json({ message: `Kod oluşturulurken hata oluştu: ${error.message}` });
    }
  });
  
  router.get('/code/history', isAuthenticated, async (req: Request, res: Response) => {
    const user: any = req.user;
    const codes = await storage.getCodeGenerationsByUserId(user.id);
    res.json(codes);
  });
  
  // Admin routes
  router.get('/admin/users', isAuthenticated, isAdmin, async (req: Request, res: Response) => {
    const users = await storage.getAllUsers();
    // Remove passwords from response
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    res.json(usersWithoutPasswords);
  });
  
  // Add points route (admin only)
  router.post('/admin/add-points', isAuthenticated, isAdmin, async (req: Request, res: Response) => {
    try {
      const { userId, amount, description } = req.body;
      
      if (!userId || !amount || !description) {
        return res.status(400).json({ message: 'Kullanıcı ID, miktar ve açıklama gerekli' });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      }
      
      const transaction = await storage.createPointTransaction({
        userId,
        amount,
        description
      });
      
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ message: 'Puan eklenirken hata oluştu' });
    }
  });
  
  // Daily login bonus
  router.post('/user/daily-bonus', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const user: any = req.user;
      
      // In a real application, you'd check if the user already claimed
      // the daily bonus today. For demo purposes, we'll allow it every time.
      
      const transaction = await storage.createPointTransaction({
        userId: user.id,
        amount: 5,
        description: 'Günlük giriş bonusu'
      });
      
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ message: 'Günlük bonus alınırken hata oluştu' });
    }
  });
  
  // Register router
  app.use('/api', router);
  
  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
