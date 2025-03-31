import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePoints } from "@/context/PointsContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateImage, getImageHistory } from "@/lib/openai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Alert,
  AlertTitle,
  AlertDescription 
} from "@/components/ui/alert";
import { Helmet } from "react-helmet";
import { Image as ImageIcon, Loader2, Sparkles, Info } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";

const ImageGeneration = () => {
  const { isAuthenticated } = useAuth();
  const { points } = usePoints();
  const [prompt, setPrompt] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch image history
  const { data: imageHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['/api/image/history'],
    queryFn: getImageHistory,
    enabled: isAuthenticated
  });

  // Handle image generation
  const { mutate: createImage, isPending: isGenerating } = useMutation({
    mutationFn: generateImage,
    onSuccess: () => {
      setPrompt("");
      queryClient.invalidateQueries({ queryKey: ['/api/image/history'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/points'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/status'] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    
    if (points < 10) {
      return;
    }
    
    createImage(prompt);
  };

  return (
    <>
      <Helmet>
        <title>Görsel Oluşturma - ZekiBot</title>
        <meta
          name="description"
          content="ZekiBot yapay zeka ile metin tanımlarınıza dayalı görseller oluşturun."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-dark-surface border-dark-lighter mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-poppins">
              <ImageIcon className="h-6 w-6 text-secondary" />
              Görsel Oluşturma
            </CardTitle>
            <CardDescription>
              Metinden görsel oluşturmak için yapay zeka kullanın. Her görsel 10 puan harcar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Textarea
                  placeholder="Görselin açıklamasını yazın... (Örn: 'Deniz kenarında gün batımı')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-32 bg-dark-lighter border-dark-lighter focus:border-secondary text-light"
                  disabled={isGenerating || !isAuthenticated || points < 10}
                />
              </div>

              {isAuthenticated && points < 10 && (
                <Alert className="bg-red-900/20 border-red-900">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Yetersiz puan</AlertTitle>
                  <AlertDescription>
                    Görsel oluşturmak için en az 10 puana ihtiyacınız var. Şu anki puanınız: {points}.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-light-muted">
                  {isAuthenticated && (
                    <span>Şu anki puanınız: <span className="text-accent">{points}</span> | Her görsel: <span className="text-red-400">-10 puan</span></span>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="bg-secondary hover:bg-secondary/90"
                  disabled={isGenerating || !prompt.trim() || !isAuthenticated || points < 10}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Görsel Oluştur
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {!isAuthenticated ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-center p-6 bg-dark-surface rounded-lg max-w-md">
              <ImageIcon className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Görsel oluşturmak için giriş yapın</h3>
              <p className="text-light-muted mb-4">
                ZekiBot'un yapay zeka görsel oluşturma özelliğini kullanmak için ücretsiz hesap oluşturun veya giriş yapın.
              </p>
              <Button 
                onClick={() => setIsLoginModalOpen(true)} 
                className="bg-secondary hover:bg-secondary/90"
              >
                Giriş Yap / Kayıt Ol
              </Button>
            </div>
          </div>
        ) : isLoadingHistory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="bg-dark-surface border-dark-lighter">
                <CardContent className="p-3">
                  <div className="aspect-square bg-dark-lighter animate-pulse rounded-md"></div>
                  <div className="mt-2 h-4 bg-dark-lighter animate-pulse rounded-md"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : imageHistory && imageHistory.length > 0 ? (
          <div>
            <h2 className="text-xl font-poppins font-semibold mb-4">Oluşturduğunuz Görseller</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {imageHistory.map((image: any) => (
                <Card key={image.id} className="bg-dark-surface border-dark-lighter hover:border-secondary transition-duration-300">
                  <CardContent className="p-3">
                    <div className="aspect-square rounded-md overflow-hidden mb-2">
                      <img 
                        src={image.imageUrl} 
                        alt={image.prompt} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-light-muted truncate">{image.prompt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center p-6 bg-dark-surface rounded-lg">
            <ImageIcon className="h-12 w-12 text-secondary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Henüz görsel oluşturmadınız</h3>
            <p className="text-light-muted">
              Yukarıdaki form ile ilk görselinizi oluşturmaya başlayın.
            </p>
          </div>
        )}
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onRegisterClick={() => {}}
      />
    </>
  );
};

export default ImageGeneration;
