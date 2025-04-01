import React from 'react';
import GameInterface from '@/components/ui/ai/GameInterface';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { GamepadIcon } from 'lucide-react';
import { Link } from 'wouter';

const Games: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <section className="py-16 container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-dark-surface text-white border-dark-border">
          <CardContent className="p-6">
            <div className="text-center">
              <GamepadIcon className="h-16 w-16 mx-auto text-secondary-light mb-4" />
              <h2 className="text-2xl font-bold mb-4">Yapay Zeka Oyunları</h2>
              <p className="text-gray-400 mb-6">
                ZekiBot'un eğlenceli yapay zeka oyunlarını oynamak için giriş yapmanız gerekmektedir. Giriş yaparak hem eğlenin hem de öğrenin.
              </p>
              <Link to="/">
                <Button className="bg-primary hover:bg-primary-dark text-white">
                  Ana Sayfaya Dön
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Yapay Zeka Oyunları</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Yapay zeka destekli eğlenceli mini oyunlarla hem öğrenin hem de keyifli vakit geçirin.
            Her oyun başlatma 2 puan değerindedir.
          </p>
        </div>
        
        <GameInterface />
        
        <div className="mt-8 bg-dark-surface rounded-xl p-6 border border-dark-border">
          <h3 className="text-lg font-medium mb-4">Oyun Kuralları</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-secondary-light">•</span>
              <span>Oyun süresi 60 saniyedir.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-light">•</span>
              <span>Her doğru harf 10 puan değerindedir.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-light">•</span>
              <span>Yanlış tahminlerde süre 5 saniye azalır.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-light">•</span>
              <span>Oyun sonunda kalan süre puanınıza eklenir.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary-light">•</span>
              <span>Her 10 puan için 1 ZekiBot puanı kazanırsınız.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Games;
