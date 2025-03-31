import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePoints } from '@/context/PointsContext';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/context/AuthContext';

interface StyleButton {
  id: string;
  name: string;
}

const styles: StyleButton[] = [
  { id: 'realistic', name: 'Gerçekçi' },
  { id: 'digital-art', name: 'Dijital Art' },
  { id: 'cartoon', name: 'Karikatür' },
  { id: 'abstract', name: 'Soyut' }
];

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { spendPoints } = usePoints();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen bir görsel açıklaması girin.",
        variant: "destructive"
      });
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: "Giriş Yapın",
        description: "Bu özelliği kullanabilmek için giriş yapmalısınız.",
        variant: "destructive"
      });
      return;
    }

    // Cost per image generation
    const pointCost = 5;
    
    // Check if user has enough points
    const success = await spendPoints(pointCost, "Image generation");
    if (!success) {
      toast({
        title: "Yetersiz Puan",
        description: "Görsel oluşturmak için yeterli puanınız yok.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      // Send request to the backend
      const response = await apiRequest('POST', '/api/ai/image', { 
        prompt, 
        style: selectedStyle 
      });
      
      const data = await response.json();
      setGeneratedImage(data.url);
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Hata",
        description: "Görsel oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-dark-surface rounded-xl overflow-hidden border border-dark-border shadow-lg">
      <div className="border-b border-dark-border p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Görsel Oluşturma</h3>
        <button className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <label htmlFor="image-prompt" className="block text-sm font-medium text-gray-300 mb-1">Görsel Açıklaması</label>
          <Input
            id="image-prompt"
            placeholder="Görseli tanımlayın (örn. 'Mavi deniz ve güneşli bir sahil')"
            className="w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-light focus:border-transparent"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <label className="block text-sm font-medium text-gray-300">Stil Seçimi</label>
            <span className="text-xs text-gray-400">{styles.find(s => s.id === selectedStyle)?.name}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {styles.map((style) => (
              <button
                key={style.id}
                className={`p-2 bg-dark-bg border ${selectedStyle === style.id ? 'border-accent-light' : 'border-dark-border'} rounded-lg text-center text-xs transition`}
                onClick={() => handleStyleSelect(style.id)}
                disabled={isGenerating}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>
        
        <Button
          className="w-full bg-accent hover:bg-accent-dark text-white py-2.5 px-4 rounded-lg transition font-medium"
          onClick={handleGenerateImage}
          disabled={isGenerating || !prompt.trim()}
        >
          {isGenerating ? 'Oluşturuluyor...' : 'Görsel Oluştur (5 Puan)'}
        </Button>
        
        <div className="mt-6 p-4 bg-dark-bg rounded-lg flex items-center justify-center min-h-[200px]">
          {isGenerating ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-light mb-2"></div>
              <p className="text-gray-400 text-sm">Görsel oluşturuluyor, lütfen bekleyin...</p>
            </div>
          ) : generatedImage ? (
            <div className="w-full">
              <img 
                src={generatedImage} 
                alt={prompt} 
                className="rounded-lg max-w-full max-h-64 mx-auto"
              />
              <div className="mt-4 flex justify-center gap-2">
                <Button 
                  variant="outline" 
                  className="text-sm py-1"
                  onClick={() => window.open(generatedImage, '_blank')}
                >
                  Tam Boyutta Görüntüle
                </Button>
                <Button 
                  variant="outline" 
                  className="text-sm py-1"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = generatedImage;
                    link.download = `zekibot-image-${Date.now()}.png`;
                    link.click();
                  }}
                >
                  İndir
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-400 text-sm">Görsel oluşturmak için yukarıdaki alana bir açıklama girin ve "Görsel Oluştur" düğmesine tıklayın.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
