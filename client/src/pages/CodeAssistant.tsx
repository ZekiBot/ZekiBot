import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePoints } from "@/context/PointsContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateCode, getCodeHistory } from "@/lib/openai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Alert,
  AlertTitle,
  AlertDescription 
} from "@/components/ui/alert";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Helmet } from "react-helmet";
import { Code, Loader2, Terminal, Info, Clipboard, CheckCircle2 } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";
import { useToast } from "@/hooks/use-toast";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "golang", label: "Go" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "rust", label: "Rust" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
];

const CodeAssistant = () => {
  const { isAuthenticated } = useAuth();
  const { points } = usePoints();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // Fetch code history
  const { data: codeHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['/api/code/history'],
    queryFn: getCodeHistory,
    enabled: isAuthenticated
  });

  // Handle code generation
  const { mutate: createCode, isPending: isGenerating } = useMutation({
    mutationFn: (data: { prompt: string, language: string }) => 
      generateCode(data.prompt, data.language),
    onSuccess: () => {
      setPrompt("");
      queryClient.invalidateQueries({ queryKey: ['/api/code/history'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/points'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/status'] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !language) return;
    
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    
    if (points < 8) {
      return;
    }
    
    createCode({ prompt, language });
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Kopyalandı!",
      description: "Kod panoya kopyalandı.",
    });
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Kod Yazma Asistanı - ZekiBot</title>
        <meta
          name="description"
          content="ZekiBot yapay zeka destekli kod yazma ve hata ayıklama asistanı."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-dark-surface border-dark-lighter mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-poppins">
              <Code className="h-6 w-6 text-primary" />
              Kod Yazma Asistanı
            </CardTitle>
            <CardDescription>
              Yapay zeka desteği ile kod yazma ve hata ayıklama. Her kod oluşturma 8 puan harcar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <Label htmlFor="prompt">Ne tür bir kod yazılmasını istiyorsunuz?</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Örneğin: 'İki sayıyı toplayan bir JavaScript fonksiyonu yaz' veya 'SQL ile kullanıcı tablosundan veri çekme sorgusu oluştur'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="h-32 mt-2 bg-dark-lighter border-dark-lighter focus:border-primary text-light"
                    disabled={isGenerating || !isAuthenticated || points < 8}
                  />
                </div>
                <div>
                  <Label htmlFor="language">Programlama Dili</Label>
                  <Select
                    value={language}
                    onValueChange={setLanguage}
                    disabled={isGenerating || !isAuthenticated || points < 8}
                  >
                    <SelectTrigger id="language" className="mt-2 bg-dark-lighter border-dark-lighter text-light">
                      <SelectValue placeholder="Dil seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-lighter border-dark-lighter">
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-4 bg-primary hover:bg-primary/90"
                    disabled={isGenerating || !prompt.trim() || !isAuthenticated || points < 8}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Oluşturuluyor...
                      </>
                    ) : (
                      <>
                        <Terminal className="h-4 w-4 mr-2" />
                        Kod Oluştur
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {isAuthenticated && points < 8 && (
                <Alert className="bg-red-900/20 border-red-900">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Yetersiz puan</AlertTitle>
                  <AlertDescription>
                    Kod oluşturmak için en az 8 puana ihtiyacınız var. Şu anki puanınız: {points}.
                  </AlertDescription>
                </Alert>
              )}

              <div className="text-sm text-light-muted">
                {isAuthenticated && (
                  <span>Şu anki puanınız: <span className="text-accent">{points}</span> | Her kod oluşturma: <span className="text-red-400">-8 puan</span></span>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {!isAuthenticated ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-center p-6 bg-dark-surface rounded-lg max-w-md">
              <Code className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Kod yazma asistanını kullanmak için giriş yapın</h3>
              <p className="text-light-muted mb-4">
                ZekiBot'un yapay zeka kod yazma asistanını kullanmak için ücretsiz hesap oluşturun veya giriş yapın.
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
          <Card className="bg-dark-surface border-dark-lighter">
            <CardContent className="p-6">
              <div className="h-8 bg-dark-lighter animate-pulse rounded-md w-48 mb-4"></div>
              <div className="h-40 bg-dark-lighter animate-pulse rounded-md mb-2"></div>
            </CardContent>
          </Card>
        ) : codeHistory && codeHistory.length > 0 ? (
          <div>
            <h2 className="text-xl font-poppins font-semibold mb-4">Kod Geçmişiniz</h2>
            <Tabs defaultValue="latest">
              <TabsList className="bg-dark-surface border-dark-lighter mb-4">
                <TabsTrigger value="latest">Son Oluşturulan</TabsTrigger>
                <TabsTrigger value="all">Tüm Kodlar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="latest">
                <Card className="bg-dark-surface border-dark-lighter">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {codeHistory[0].prompt}
                    </CardTitle>
                    <CardDescription>
                      Dil: {LANGUAGES.find(l => l.value === codeHistory[0].language)?.label || codeHistory[0].language}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <pre className="bg-dark-lighter rounded-md p-4 overflow-x-auto">
                        <code>{codeHistory[0].code}</code>
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 bg-dark-surface hover:bg-primary/20"
                        onClick={() => copyToClipboard(codeHistory[0].code, codeHistory[0].id)}
                      >
                        {copiedId === codeHistory[0].id ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clipboard className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {codeHistory.map((code: any) => (
                    <Card key={code.id} className="bg-dark-surface border-dark-lighter">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">
                          {code.prompt}
                        </CardTitle>
                        <CardDescription>
                          Dil: {LANGUAGES.find(l => l.value === code.language)?.label || code.language}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <pre className="bg-dark-lighter rounded-md p-4 overflow-x-auto">
                            <code>{code.code}</code>
                          </pre>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-2 right-2 bg-dark-surface hover:bg-primary/20"
                            onClick={() => copyToClipboard(code.code, code.id)}
                          >
                            {copiedId === code.id ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <Clipboard className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center p-6 bg-dark-surface rounded-lg">
            <Code className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Henüz kod oluşturmadınız</h3>
            <p className="text-light-muted">
              Yukarıdaki form ile ilk kodunuzu oluşturmaya başlayın.
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

export default CodeAssistant;
