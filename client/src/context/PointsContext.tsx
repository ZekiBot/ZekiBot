import { useAuth } from '../hooks/useAuth';

// Önceki PointsContext'teki işlevsellik artık AuthContext'e taşındı
// Bu hook eski PointsContext metodlarını AuthContext üzerinden erişilebilir hale getiriyor
// Böylece projenin diğer kısımlarında değişiklik yapmak zorunda kalmayacağız

export function usePoints() {
  const auth = useAuth();
  
  return {
    points: auth.points,
    transactions: auth.transactions,
    isLoading: auth.pointsLoading,
    claimDailyBonus: auth.claimDailyBonus,
    isClaimingBonus: auth.isClaimingBonus,
    updatePoints: (newPoints: number) => {
      // Bu sadece bir geçiş hook'u - implementasyonu bulunmuyor
      console.log('updatePoints artık doğrudan desteklenmiyor. Puan güncellemeleri API üzerinden olmalı.');
    }
  };
}

// PointsProvider'ı, dairesel bağımlılığı önlemek için kaldırdık
// Tüm işlevsellik doğrudan AuthContext üzerinden sağlanıyor
