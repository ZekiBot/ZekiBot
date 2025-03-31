import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';

type PointsContextType = {
  points: number;
  transactions: any[];
  isLoading: boolean;
  claimDailyBonus: () => void;
  isClaimingBonus: boolean;
  updatePoints: (newPoints: number) => void;
};

export const PointsContext = createContext<PointsContextType | null>(null);

export function PointsProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [points, setPoints] = useState<number>(0);
  
  // Use the useAuth hook to access auth context
  const { user, isAuthenticated, isAuthLoading } = useAuth();

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

  // Effect to update points from user data or API
  useEffect(() => {
    if (user) {
      setPoints(user.points);
    }
    if (pointsData) {
      setPoints(pointsData.points);
    }
  }, [user, pointsData]);

  // Function to update points (used by other components)
  const updatePoints = (newPoints: number) => {
    setPoints(newPoints);
  };

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
    <PointsContext.Provider value={{
      points,
      transactions: transactionsData || [],
      isLoading: isPointsLoading || isTransactionsLoading || isAuthLoading,
      claimDailyBonus: dailyBonus.mutate,
      isClaimingBonus: dailyBonus.isPending,
      updatePoints
    }}>
      {children}
    </PointsContext.Provider>
  );
}

// Export the usePoints hook 
export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === null) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};
