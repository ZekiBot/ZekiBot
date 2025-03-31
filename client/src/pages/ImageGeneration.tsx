import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateImage, getImageHistory, getAvailableModels, AIModel } from "@/lib/openai";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Helmet } from "react-helmet";
import { Image as ImageIcon, Loader2, Sparkles, Info, Cpu, CheckCircle2 } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";

const ImageGeneration = () => {
  // Temporary mock data for development
  const isAuthenticated = true;
  const points = 100;
  const [prompt, setPrompt] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("openai");
  const queryClient = useQueryClient();

  // Fetch AI models
  const { data: models } = useQuery({
    queryKey: ['/api/ai-models'],
    queryFn: getAvailableModels
  });

  // Fetch image history
  const { data: imageHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['/api/image/history'],
    queryFn: getImageHistory,
    enabled: isAuthenticated
  });

  // Handle image generation
  const { mutate: createImageMutation, isPending: isGenerating } = useMutation({
    mutationFn: (data: { prompt: string, modelType: string }) => 
      generateImage(data.prompt, data.modelType),
    onSuccess: () => {
      setPrompt("");
      queryClient.invalidateQueries({ queryKey: ['/api/image/history'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/points'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/status'] });
    }
  });
  
  // Wrapper function to generate image
  const createImage = (prompt: string) => {
    createImageMutation({ prompt, modelType: selectedModel });
  };
  
  // Get current model point cost
  const getCurrentModelCost = () => {
    if (!models) return 10;
    const model = models.find((m: AIModel) => m.id === selectedModel);
    return model?.pointCost || 10;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    
    const modelCost = getCurrentModelCost();
    
    if (points < modelCost) {
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
              {isAuthenticated && models && (
                <div className="mb-3">
                  <div className="text-sm text-light-muted mb-1">Model Seçimi:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {models.filter((model: AIModel) => model.supportsImage).map((model: AIModel) => (
                      <TooltipProvider key={model.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={selectedModel === model.id ? "default" : "outline"}
                              className={`flex items-center justify-between ${
                                selectedModel === model.id 
                                  ? "bg-secondary hover:bg-secondary/90" 
                                  : "bg-dark-lighter hover:bg-dark-lighter/90"
                              } text-sm h-auto py-2`}
                              onClick={() => setSelectedModel(model.id)}
                              disabled={!model.supportsImage}
                            >
                              <div className="flex items-center">
                                <Cpu className="h-4 w-4 mr-2" />
                                <span>{model.name}</span>
                              </div>
                              <div className="flex items-center gap-1 ml-2">
                                <span className="text-xs">{model.pointCost}p</span>
                                {selectedModel === model.id && (
                                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                                )}
                              </div>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[250px] p-3">
                            <p>{model.description}</p>
                            <p className="text-xs mt-1 font-medium text-accent">{model.pointCost} puan / görsel</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Textarea
                  placeholder="Görselin açıklamasını yazın... (Örn: 'Deniz kenarında gün batımı')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-32 bg-dark-lighter border-dark-lighter focus:border-secondary text-light"
                  disabled={isGenerating || !isAuthenticated || points < getCurrentModelCost()}
                />
              </div>

              {isAuthenticated && points < getCurrentModelCost() && (
                <Alert className="bg-red-900/20 border-red-900">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Yetersiz puan</AlertTitle>
                  <AlertDescription>
                    Görsel oluşturmak için en az {getCurrentModelCost()} puana ihtiyacınız var. Şu anki puanınız: {points}.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-light-muted">
                  {isAuthenticated && (
                    <span>
                      Şu anki puanınız: <span className="text-accent">{points}</span> | 
                      Her görsel: <span className="text-red-400">-{getCurrentModelCost()} puan</span> |
                      Model: <span className="text-secondary">{models?.find((m: AIModel) => m.id === selectedModel)?.name || "OpenAI"}</span>
                    </span>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="bg-secondary hover:bg-secondary/90"
                  disabled={isGenerating || !prompt.trim() || !isAuthenticated || points < getCurrentModelCost()}
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
                    <div className="mt-2">
                      <p className="text-sm text-light-muted truncate">{image.prompt}</p>
                      {image.modelType && (
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <Cpu className="h-3 w-3 mr-1" />
                          <span>
                            {models?.find((m: AIModel) => m.id === image.modelType)?.name || image.modelType}
                          </span>
                        </div>
                      )}
                    </div>
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
