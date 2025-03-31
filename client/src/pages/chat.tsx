import React from 'react';
import ChatInterface from '@/components/ui/ai/ChatInterface';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Link } from 'wouter';

const Chat: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <section className="py-16 container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-dark-surface text-white border-dark-border">
          <CardContent className="p-6">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 mx-auto text-primary-light mb-4" />
              <h2 className="text-2xl font-bold mb-4">Yapay Zeka Sohbeti</h2>
              <p className="text-gray-400 mb-6">
                ZekiBot'un yapay zeka sohbet özelliğini kullanmak için giriş yapmanız gerekmektedir. Giriş yaparak her türlü sorunuza yanıt alabilirsiniz.
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
          <h1 className="text-3xl font-bold mb-4">Yapay Zeka Sohbeti</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Gelişmiş yapay zeka modeliyle istediğiniz konuda sohbet edin, sorular sorun veya yardım alın.
            Her mesaj gönderimi 1 puan değerindedir.
          </p>
        </div>
        
        <ChatInterface />
        
        <div className="mt-8 bg-dark-surface rounded-xl p-6 border border-dark-border">
          <h3 className="text-lg font-medium mb-4">Sohbet İpuçları</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-primary-light">•</span>
              <span>Net ve açık sorular sormaya çalışın.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-light">•</span>
              <span>Belirli bir konuda daha detaylı bilgi için ek sorular sorabilirsiniz.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-light">•</span>
              <span>Sohbet geçmişiniz yeni oturumlarda kaydedilmez.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-light">•</span>
              <span>Daha kapsamlı cevaplar için sorunuzu detaylandırın.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Chat;
