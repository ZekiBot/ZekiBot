import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { mockUser, mockTransactions } from '@/lib/staticData';

// Firebase imports
import { 
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  logoutUser,
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  signInWithGithub,
  signInWithApple,
  onAuthStateChange
} from '@/lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';

// Check if we're in static mode (GitHub Pages or Vercel)
const isStaticMode = () => {
  return window.location.hostname.includes('github.io') || 
         window.location.hostname.includes('vercel.app') ||
         import.meta.env.VITE_STATIC_MODE === 'true';
};

// Define types
export type User = {
  id: number;
  username: string;
  email: string;
  points: number;
  isAdmin: boolean;
  uid?: string; // Firebase UID
  photoURL?: string; // Profile photo from Firebase
};

export type AuthContextType = {
  // Auth state
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  register: (credentials: { username: string; email: string; password: string }) => void;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
  isRegistering: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  
  // Points state
  points: number;
  transactions: any[];
  pointsLoading: boolean;
  claimDailyBonus: () => void;
  isClaimingBonus: boolean;
};

// Create the auth context
export const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [points, setPoints] = useState<number>(0); 
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Derived state
  const isAdmin = user?.isAdmin || false;
  const isAuthenticated = !!user;
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Listen for Firebase auth state changes or use static mode
  useEffect(() => {
    // If in static mode, set mock user and skip Firebase
    if (isStaticMode()) {
      setUser(mockUser);
      setPoints(mockUser.points);
      setIsAuthLoading(false);
      return () => {}; // No cleanup needed
    }

    // Normal Firebase auth handling for non-static mode
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // API çağrısı ve kullanıcı verilerini alma
          // Gerçek uygulamada, Firebase kullanıcı kimliğini kullanarak veritabanından kullanıcı bilgilerini alın
          // Şimdilik mock veri kullanıyoruz
          const userData: User = {
            id: 1, // veritabanı ID'si
            username: firebaseUser.displayName || 'Kullanıcı',
            email: firebaseUser.email || '',
            points: 100, // Kullanıcı puanları API'den alınmalı
            isAdmin: false, // Admin durumu API'den alınmalı
            uid: firebaseUser.uid,
            photoURL: firebaseUser.photoURL || undefined
          };
          
          setUser(userData);
          setPoints(userData.points);
          
          // Puanlar ve işlemler API'den getirilmeli
          
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast({
            title: "Hata",
            description: "Kullanıcı bilgileri alınamadı.",
            variant: "destructive",
          });
        }
      } else {
        // Kullanıcı çıkış yaptı veya oturum açmadı
        setUser(null);
        setPoints(0);
      }
      setIsAuthLoading(false);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  // Simplified mock query for points
  const isPointsLoading = false;
  const isTransactionsLoading = false;
  const transactionsData = isStaticMode() ? mockTransactions : [];

  // Register function using Firebase or static mode
  const register = useMutation({
    mutationFn: async (credentials: { username: string; email: string; password: string }) => {
      // Handle static mode (GitHub Pages)
      if (isStaticMode()) {
        // Simulate registration in static mode
        console.log("Static mode registration:", credentials);
        
        const userData: User = {
          ...mockUser,
          username: credentials.username,
          email: credentials.email
        };
        
        return userData;
      }
      
      // Normal Firebase registration
      try {
        const firebaseUser = await registerWithEmailAndPassword(
          credentials.email,
          credentials.password,
          credentials.username
        );
        
        // Gerçek uygulamada, burası bir API çağrısı ile kullanıcıyı veritabanına kaydetmeli
        const userData: User = {
          id: 1, // Veritabanı ID'si
          username: credentials.username,
          email: credentials.email,
          points: 100, // Başlangıç puanları
          isAdmin: false,
          uid: firebaseUser.uid,
          photoURL: firebaseUser.photoURL || undefined
        };
        
        return userData;
      } catch (error: any) {
        console.error("Firebase register error:", error);
        throw new Error(
          error.code === "auth/email-already-in-use"
            ? "Bu e-posta adresi zaten kullanılıyor."
            : error.message || "Kayıt sırasında bir hata oluştu."
        );
      }
    },
    onSuccess: (data) => {
      setUser(data);
      setPoints(data.points);
      toast({
        title: "Başarılı!",
        description: "Hesabınız oluşturuldu ve giriş yapıldı.",
      });
      setLocation('/');
    },
    onError: (error: any) => {
      toast({
        title: "Hata!",
        description: error.message || "Kayıt sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  });

  // Login function using Firebase or static mode
  const login = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      // Handle static mode (GitHub Pages)
      if (isStaticMode()) {
        // Simulate login in static mode
        console.log("Static mode login:", credentials);
        
        // Just return the mock user
        return mockUser;
      }
      
      // Normal Firebase login
      try {
        const firebaseUser = await loginWithEmailAndPassword(
          credentials.email,
          credentials.password
        );
        
        // Gerçek uygulamada, bu kullanıcı bilgileri API'den alınmalı
        const userData: User = {
          id: 1, // Veritabanı ID'si
          username: firebaseUser.displayName || 'Kullanıcı',
          email: firebaseUser.email || '',
          points: 100, // API'den alınmalı
          isAdmin: false, // API'den alınmalı
          uid: firebaseUser.uid,
          photoURL: firebaseUser.photoURL || undefined
        };
        
        return userData;
      } catch (error: any) {
        console.error("Firebase login error:", error);
        throw new Error(
          error.code === "auth/invalid-credential"
            ? "Geçersiz e-posta veya şifre."
            : error.message || "Giriş sırasında bir hata oluştu."
        );
      }
    },
    onSuccess: (data) => {
      setUser(data);
      setPoints(data.points);
      toast({
        title: "Başarılı!",
        description: "Giriş yapıldı.",
      });
      setLocation('/');
    },
    onError: (error: any) => {
      toast({
        title: "Hata!",
        description: error.message || "Giriş sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  });

  // Logout function using Firebase or static mode
  const logout = useMutation({
    mutationFn: async () => {
      // Handle static mode (GitHub Pages)
      if (isStaticMode()) {
        // Simulate logout in static mode
        console.log("Static mode logout");
        return { success: true };
      }
      
      // Normal Firebase logout
      try {
        await logoutUser();
        return { success: true };
      } catch (error) {
        console.error("Firebase logout error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      setUser(null);
      setPoints(0);
      toast({
        title: "Çıkış Yapıldı",
        description: "Oturumunuz sonlandırıldı.",
      });
      setLocation('/');
    },
    onError: () => {
      toast({
        title: "Hata!",
        description: "Çıkış yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    }
  });

  // Simplified daily bonus function
  const dailyBonus = useMutation({
    mutationFn: async () => {
      // Mock implementation
      console.log("Daily bonus claimed");
      return { success: true };
    },
    onSuccess: () => {
      // Mock points update
      setPoints(prev => prev + 5);
      
      toast({
        title: "Günlük Bonus!",
        description: "5 puan kazandınız!",
      });
    },
    onError: () => {
      toast({
        title: "Hata!",
        description: "Günlük bonus alınırken bir hata oluştu.",
        variant: "destructive",
      });
    }
  });

  return (
    <AuthContext.Provider value={{
      // Auth state
      user,
      isAdmin,
      isAuthenticated,
      isAuthLoading,
      register: register.mutate,
      login: login.mutate,
      logout: logout.mutate,
      isRegistering: register.isPending,
      isLoggingIn: login.isPending,
      isLoggingOut: logout.isPending,
      
      // Points state
      points,
      transactions: transactionsData || [],
      pointsLoading: isPointsLoading || isTransactionsLoading,
      claimDailyBonus: dailyBonus.mutate,
      isClaimingBonus: dailyBonus.isPending
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Export the useAuth hook to be used throughout the application
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
