import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

// Mock User Data - Remove this in production
const MOCK_USER = {
  id: 1,
  username: "testuser",
  email: "test@example.com",
  points: 100,
  isAdmin: true
};

// Define types
export type User = {
  id: number;
  username: string;
  email: string;
  points: number;
  isAdmin: boolean;
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

  // For development, set a mock user - Remove in production
  useEffect(() => {
    // Comment this out when API is ready
    setUser(MOCK_USER);
    setPoints(MOCK_USER.points);
  }, []);

  // Auth status query - comment this in when API is ready
  /*
  const { data: authData, isLoading: isAuthLoading } = useQuery<User | null>({
    queryKey: ['/api/auth/status'],
    retry: false,
    initialData: null
  });

  // Update user from auth status
  useEffect(() => {
    if (authData) {
      setUser(authData as User);
      setPoints(authData.points);
    }
  }, [authData]);
  */
  const isAuthLoading = false; // Mock for now

  // Simplified mock query for points
  const isPointsLoading = false;
  const isTransactionsLoading = false;
  const transactionsData: any[] = [];

  // Simplified register function
  const register = useMutation({
    mutationFn: async (credentials: { username: string; email: string; password: string }) => {
      // Mock implementation
      console.log("Register called with:", credentials);
      return MOCK_USER;
    },
    onSuccess: (data) => {
      setUser(data);
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

  // Simplified login function
  const login = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      // Mock implementation
      console.log("Login called with:", credentials);
      return MOCK_USER;
    },
    onSuccess: (data) => {
      setUser(data);
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

  // Simplified logout function
  const logout = useMutation({
    mutationFn: async () => {
      // Mock implementation
      console.log("Logout called");
      return { success: true };
    },
    onSuccess: () => {
      setUser(null);
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
