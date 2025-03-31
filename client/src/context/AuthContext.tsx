import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

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

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [points, setPoints] = useState<number>(0); 
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const isAdmin = user?.isAdmin || false;
  const isAuthenticated = !!user;

  // Auth status query
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

  // Query for user points
  const { data: pointsData, isLoading: isPointsLoading } = useQuery<{points: number}>({
    queryKey: ['/api/user/points'],
    enabled: isAuthenticated,
    initialData: {points: 0}
  });

  // Query for transactions history
  const { data: transactionsData, isLoading: isTransactionsLoading } = useQuery<any[]>({
    queryKey: ['/api/user/transactions'],
    enabled: isAuthenticated,
    initialData: []
  });

  // Effect to update points from API
  useEffect(() => {
    if (pointsData) {
      setPoints(pointsData.points);
    }
  }, [pointsData]);

  // Register mutation
  const register = useMutation({
    mutationFn: async (credentials: { username: string; email: string; password: string }) => {
      const res = await apiRequest('POST', '/api/auth/register', credentials);
      return res.json();
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

  // Login mutation
  const login = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await apiRequest('POST', '/api/auth/login', credentials);
      return res.json();
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

  // Logout mutation
  const logout = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/auth/logout');
      return res.json();
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

  // Daily bonus mutation
  const dailyBonus = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/user/daily-bonus');
      return res.json();
    },
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/user/points'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/transactions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/status'] });
      
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

// Custom hook for accessing the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
