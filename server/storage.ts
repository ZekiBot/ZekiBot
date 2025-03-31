import { 
  users, User, InsertUser, 
  chatMessages, ChatMessage, InsertChatMessage,
  imageGenerations, ImageGeneration, InsertImageGeneration,
  codeGenerations, CodeGeneration, InsertCodeGeneration,
  pointTransactions, PointTransaction, InsertPointTransaction
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByProviderInfo(provider: string, providerId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPoints(userId: number, points: number): Promise<User | undefined>;
  
  // Chat methods
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessagesByUserId(userId: number): Promise<ChatMessage[]>;
  
  // Image generation methods
  createImageGeneration(image: InsertImageGeneration): Promise<ImageGeneration>;
  getImageGenerationsByUserId(userId: number): Promise<ImageGeneration[]>;
  
  // Code generation methods
  createCodeGeneration(code: InsertCodeGeneration): Promise<CodeGeneration>;
  getCodeGenerationsByUserId(userId: number): Promise<CodeGeneration[]>;
  
  // Points transactions methods
  createPointTransaction(transaction: InsertPointTransaction): Promise<PointTransaction>;
  getPointTransactionsByUserId(userId: number): Promise<PointTransaction[]>;
  
  // Admin methods
  getAllUsers(): Promise<User[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatMessages: Map<number, ChatMessage>;
  private imageGenerations: Map<number, ImageGeneration>;
  private codeGenerations: Map<number, CodeGeneration>;
  private pointTransactions: Map<number, PointTransaction>;
  
  private currentUserId: number;
  private currentChatId: number;
  private currentImageId: number;
  private currentCodeId: number;
  private currentTransactionId: number;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    this.imageGenerations = new Map();
    this.codeGenerations = new Map();
    this.pointTransactions = new Map();
    
    this.currentUserId = 1;
    this.currentChatId = 1;
    this.currentImageId = 1;
    this.currentCodeId = 1;
    this.currentTransactionId = 1;
    
    // Create admin user
    this.createUser({
      username: 'admin',
      email: 'admin@zekibot.com',
      password: 'admin123',
      provider: null,
      providerId: null
    }).then(user => {
      this.users.set(user.id, {
        ...user,
        isAdmin: true,
        points: 1000
      });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }
  
  async getUserByProviderInfo(provider: string, providerId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.provider === provider && user.providerId === providerId,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      points: 100, 
      isAdmin: false,
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUserPoints(userId: number, points: number): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    const updatedUser = {
      ...user,
      points
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  // Chat methods
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatId++;
    const now = new Date();
    const chatMessage: ChatMessage = {
      ...message,
      id,
      createdAt: now
    };
    
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }
  
  async getChatMessagesByUserId(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).filter(
      message => message.userId === userId
    ).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  
  // Image generation methods
  async createImageGeneration(image: InsertImageGeneration): Promise<ImageGeneration> {
    const id = this.currentImageId++;
    const now = new Date();
    const imageGeneration: ImageGeneration = {
      ...image,
      id,
      createdAt: now
    };
    
    this.imageGenerations.set(id, imageGeneration);
    return imageGeneration;
  }
  
  async getImageGenerationsByUserId(userId: number): Promise<ImageGeneration[]> {
    return Array.from(this.imageGenerations.values()).filter(
      image => image.userId === userId
    ).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  
  // Code generation methods
  async createCodeGeneration(code: InsertCodeGeneration): Promise<CodeGeneration> {
    const id = this.currentCodeId++;
    const now = new Date();
    const codeGeneration: CodeGeneration = {
      ...code,
      id,
      createdAt: now
    };
    
    this.codeGenerations.set(id, codeGeneration);
    return codeGeneration;
  }
  
  async getCodeGenerationsByUserId(userId: number): Promise<CodeGeneration[]> {
    return Array.from(this.codeGenerations.values()).filter(
      code => code.userId === userId
    ).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  
  // Points transactions methods
  async createPointTransaction(transaction: InsertPointTransaction): Promise<PointTransaction> {
    const id = this.currentTransactionId++;
    const now = new Date();
    const pointTransaction: PointTransaction = {
      ...transaction,
      id,
      createdAt: now
    };
    
    this.pointTransactions.set(id, pointTransaction);
    
    // Update user points
    const user = await this.getUser(transaction.userId);
    if (user) {
      await this.updateUserPoints(user.id, user.points + transaction.amount);
    }
    
    return pointTransaction;
  }
  
  async getPointTransactionsByUserId(userId: number): Promise<PointTransaction[]> {
    return Array.from(this.pointTransactions.values()).filter(
      transaction => transaction.userId === userId
    ).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  
  // Admin methods
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
}

export const storage = new MemStorage();
