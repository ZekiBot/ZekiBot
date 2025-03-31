import { useState, useRef, useEffect } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import { usePoints } from "@/context/PointsContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendChatMessage, getChatHistory, getAvailableModels, AIModel } from "@/lib/openai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare, Send, Loader2, Info, CheckCircle2, Cpu } from "lucide-react";
import { Helmet } from "react-helmet";
import { 
  Alert,
  AlertTitle,
  AlertDescription 
} from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LoginModal from "@/components/auth/LoginModal";

const AiChat = () => {
  // Mock data for development - remove in production
  const user = { id: 1, username: "Test" };
  const isAuthenticated = true;
  const points = 100;
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("openai");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  
  // Fetch available AI models
  const { data: models, isLoading: isLoadingModels } = useQuery({
    queryKey: ['/api/ai-models'],
    queryFn: getAvailableModels
  });

  // Fetch chat history
  const { data: chatHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['/api/chat/history'],
    queryFn: getChatHistory,
    enabled: isAuthenticated
  });

  // Handle sending messages
  const { mutate: sendMessageMutation, isPending: isSending } = useMutation({
    mutationFn: (data: {message: string, modelType: string}) => 
      sendChatMessage(data.message, data.modelType),
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ['/api/chat/history'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/points'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/status'] });
    }
  });
  
  // Wrapper function to send messages
  const sendMessage = (message: string, modelType: string) => {
    sendMessageMutation({message, modelType});
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Get current model point cost
  const getCurrentModelCost = () => {
    if (!models) return 5;
    const model = models.find((m: AIModel) => m.id === selectedModel);
    return model?.pointCost || 5;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    
    const modelCost = getCurrentModelCost();
    
    if (points < modelCost) {
      return;
    }
    
    sendMessage(message, selectedModel);
  };

  return (
    <>
      <Helmet>
        <title>Yapay Zeka Sohbet - ZekiBot</title>
        <meta
          name="description"
          content="ZekiBot yapay zeka sohbet ile sorularınıza anında yanıt alın."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-dark-surface border-dark-lighter">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-poppins">
              <MessageSquare className="h-6 w-6 text-primary" />
              Yapay Zeka Sohbet
            </CardTitle>
            <CardDescription>
              Gelişmiş yapay zeka modelimiz ile sohbet edin. Her mesaj 5 puan harcar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col h-[60vh]">
              <div className="flex-grow overflow-y-auto mb-4 p-2">
                {!isAuthenticated ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center p-6 bg-dark-lighter rounded-lg max-w-md">
                      <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Sohbete başlamak için giriş yapın</h3>
                      <p className="text-light-muted mb-4">
                        ZekiBot'un yapay zeka sohbet özelliğini kullanmak için ücretsiz hesap oluşturun veya giriş yapın.
                      </p>
                      <Button 
                        onClick={() => setIsLoginModalOpen(true)} 
                        className="bg-primary hover:bg-primary/90"
                      >
                        Giriş Yap / Kayıt Ol
                      </Button>
                    </div>
                  </div>
                ) : isLoadingHistory ? (
                  <div className="space-y-4 p-2">
                    <div className="flex gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                ) : chatHistory && chatHistory.length > 0 ? (
                  <div className="space-y-4">
                    {chatHistory.map((chat: any) => (
                      <div key={chat.id} className="space-y-2">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-dark">
                            <i className="fas fa-user text-sm"></i>
                          </div>
                          <div className="bg-primary bg-opacity-20 rounded-lg p-3 text-light max-w-[80%]">
                            <p>{chat.message}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                            <i className="fas fa-robot text-sm"></i>
                          </div>
                          <div className="bg-dark-lighter rounded-lg p-3 text-light max-w-[80%]">
                            {chat.modelType && (
                              <div className="text-xs text-gray-400 mb-1 flex items-center">
                                <Cpu className="h-3 w-3 mr-1" />
                                {models?.find((m: AIModel) => m.id === chat.modelType)?.name || chat.modelType}
                              </div>
                            )}
                            <p>{chat.response}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center max-w-md">
                      <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Henüz mesaj yok</h3>
                      <p className="text-light-muted">
                        ZekiBot'a bir şeyler sorun. Yapay zeka modelimiz size hızlıca yanıt verecektir.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {isAuthenticated && points < 5 && (
                <Alert className="mb-4 bg-red-900/20 border-red-900">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Yetersiz puan</AlertTitle>
                  <AlertDescription>
                    Sohbet etmek için en az 5 puana ihtiyacınız var. Şu anki puanınız: {points}.
                  </AlertDescription>
                </Alert>
              )}

              {isAuthenticated && models && (
                <div className="mb-3">
                  <div className="text-sm text-light-muted mb-1">Model Seçimi:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {models.filter((model: AIModel) => model.supportsChat).map((model: AIModel) => (
                      <TooltipProvider key={model.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={selectedModel === model.id ? "default" : "outline"}
                              className={`flex items-center justify-between ${
                                selectedModel === model.id 
                                  ? "bg-primary hover:bg-primary/90" 
                                  : "bg-dark-lighter hover:bg-dark-lighter/90"
                              } text-sm h-auto py-2`}
                              onClick={() => setSelectedModel(model.id)}
                              disabled={!model.supportsChat}
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
                            <p className="text-xs mt-1 font-medium text-accent">{model.pointCost} puan / mesaj</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Mesajınızı yazın..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow bg-dark-lighter border-dark-lighter focus:border-primary text-light"
                  disabled={isSending || !isAuthenticated || points < getCurrentModelCost()}
                />
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90"
                  disabled={isSending || !message.trim() || !isAuthenticated || points < getCurrentModelCost()}
                >
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>

              {isAuthenticated && (
                <div className="mt-2 text-right text-sm text-light-muted">
                  <span>
                    Şu anki puanınız: <span className="text-accent">{points}</span> | 
                    Her mesaj: <span className="text-red-400">-{getCurrentModelCost()} puan</span> | 
                    Model: <span className="text-primary">{models?.find((m: AIModel) => m.id === selectedModel)?.name || "OpenAI"}</span>
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onRegisterClick={() => {}}
      />
    </>
  );
};

export default AiChat;
