import React from 'react';
import ImageGenerator from '@/components/ui/ai/ImageGenerator';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';
import { Link } from 'wouter';

const ImageGeneratorPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <section className="py-16 container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-dark-surface text-white border-dark-border">
          <CardContent className="p-6">
            <div className="text-center">
              <ImageIcon className="h-16 w-16 mx-auto text-accent-light mb-4" />
              <h2 className="text-2xl font-bold mb-4">Görsel Oluşturma</h2>
              <p className="text-gray-400 mb-6">
                ZekiBot'un görsel oluşturma özelliğini kullanmak için giriş yapmanız gerekmektedir. Giriş yaparak hayal ettiğiniz görselleri oluşturabilirsiniz.
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
          <h1 className="text-3xl font-bold mb-4">Görsel Oluşturma</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Metinden görsel oluşturma teknolojisi ile hayal ettiğiniz görselleri saniyeler içinde oluşturun.
            Her görsel oluşturma 5 puan değerindedir.
          </p>
        </div>
        
        <ImageGenerator />
        
        <div className="mt-8 bg-dark-surface rounded-xl p-6 border border-dark-border">
          <h3 className="text-lg font-medium mb-4">Görsel Oluşturma İpuçları</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-accent-light">•</span>
              <span>Detaylı açıklamalar daha iyi sonuçlar verir.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-light">•</span>
              <span>Renk, ışık, perspektif gibi detayları belirtebilirsiniz.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-light">•</span>
              <span>Farklı stiller deneyerek daha yaratıcı sonuçlar elde edebilirsiniz.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-light">•</span>
              <span>Görsel oluşturma zaman alabilir, lütfen sabırla bekleyin.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ImageGeneratorPage;
