import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { apiRequest } from '@/lib/queryClient';

interface PointsContextType {
  points: number;
  loading: boolean;
  updatePoints: () => Promise<void>;
  spendPoints: (amount: number, description: string) => Promise<boolean>;
  addPoints: (amount: number, description: string) => Promise<boolean>;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [points, setPoints] = useState<number>(user?.points || 0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setPoints(user.points);
    } else {
      setPoints(0);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      updatePoints();
    }
  }, [isAuthenticated]);

  const updatePoints = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/users/points', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setPoints(data.points);
      }
    } catch (error) {
      console.error('Failed to fetch points:', error);
    } finally {
      setLoading(false);
    }
  };

  const spendPoints = async (amount: number, description: string): Promise<boolean> => {
    if (!isAuthenticated || points < amount) return false;

    setLoading(true);
    try {
      const response = await apiRequest('POST', '/api/users/points/spend', {
        amount,
        description
      });
      
      if (response.ok) {
        const data = await response.json();
        setPoints(data.points);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to spend points:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addPoints = async (amount: number, description: string): Promise<boolean> => {
    if (!isAuthenticated) return false;

    setLoading(true);
    try {
      const response = await apiRequest('POST', '/api/users/points/add', {
        amount,
        description
      });
      
      if (response.ok) {
        const data = await response.json();
        setPoints(data.points);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to add points:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PointsContext.Provider
      value={{
        points,
        loading,
        updatePoints,
        spendPoints,
        addPoints
      }}
    >
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};
