import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePoints } from "@/context/PointsContext";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import { Gamepad, Check, Zap, BrainCircuit, Gift, Trophy, AlertTriangle } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Simple Word Puzzle Game
const WordPuzzle = ({ onStart }: { onStart: () => void }) => {
  return (
    <Card className="bg-dark-surface border-dark-lighter h-full flex flex-col hover:border-accent transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>Kelime Bulmaca</CardTitle>
          <Badge className="bg-accent text-black">10 Puan</Badge>
        </div>
        <CardDescription>Karışık harflerden anlamlı kelimeler oluşturun.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="bg-dark-lighter rounded-md p-4 text-center mb-4">
          <div className="mb-4">
            <span className="inline-block mx-1 p-2 bg-primary/20 rounded-md">E</span>
            <span className="inline-block mx-1 p-2 bg-primary/20 rounded-md">K</span>
            <span className="inline-block mx-1 p-2 bg-primary/20 rounded-md">Z</span>
            <span className="inline-block mx-1 p-2 bg-primary/20 rounded-md">İ</span>
          </div>
          <p className="text-sm text-light-muted">Bu harflerden kaç kelime bulabilirsin?</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-accent text-dark hover:bg-accent/90" onClick={onStart}>
          <Zap className="mr-2 h-4 w-4" /> Oyna
        </Button>
      </CardFooter>
    </Card>
  );
};

// Memory Game
const MemoryGame = ({ onStart }: { onStart: () => void }) => {
  return (
    <Card className="bg-dark-surface border-dark-lighter h-full flex flex-col hover:border-accent transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>Hafıza Oyunu</CardTitle>
          <Badge className="bg-accent text-black">15 Puan</Badge>
        </div>
        <CardDescription>Kart eşleştirme oyunu ile hafızanızı test edin.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-square bg-dark-lighter rounded-md"></div>
          ))}
        </div>
        <p className="text-sm text-light-muted text-center">Eşleşen kartları bulabilecek misin?</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-accent text-dark hover:bg-accent/90" onClick={onStart}>
          <Zap className="mr-2 h-4 w-4" /> Oyna
        </Button>
      </CardFooter>
    </Card>
  );
};

// Intelligence Questions Game
const IntelligenceQuestions = ({ onStart }: { onStart: () => void }) => {
  return (
    <Card className="bg-dark-surface border-dark-lighter h-full flex flex-col hover:border-accent transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>Zeka Soruları</CardTitle>
          <Badge className="bg-accent text-black">20 Puan</Badge>
        </div>
        <CardDescription>Mantık ve zeka soruları ile kendinizi zorlayın.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="bg-dark-lighter rounded-md p-4">
          <p className="mb-4">Örnek Soru:</p>
          <p className="mb-4 font-medium">Bir saatin saati ve dakikayı gösteren kolları hangi saatlerde üst üste gelir?</p>
          <ul className="space-y-2">
            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary" /> 12:00</li>
            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary" /> 6:30</li>
            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-primary" /> ...</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-accent text-dark hover:bg-accent/90" onClick={onStart}>
          <BrainCircuit className="mr-2 h-4 w-4" /> Oyna
        </Button>
      </CardFooter>
    </Card>
  );
};

// Daily Bonus Game
const DailyBonus = () => {
  const { points } = usePoints();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [claimed, setClaimed] = useState(false);

  const { mutate: claimBonus, isPending } = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/user/daily-bonus');
      return res.json();
    },
    onSuccess: () => {
      setClaimed(true);
      queryClient.invalidateQueries({ queryKey: ['/api/user/points'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/status'] });
      toast({
        title: "Günlük Bonus Alındı!",
        description: "Hesabınıza 5 puan eklendi.",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Bonus alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive"
      });
    }
  });

  return (
    <Card className="bg-dark-surface border-dark-lighter h-full flex flex-col hover:border-accent transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>Günlük Bonus</CardTitle>
          <Badge className="bg-green-500 text-black">+5 Puan</Badge>
        </div>
        <CardDescription>Her gün giriş yaparak bonus puanlar kazanın.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col items-center justify-center h-full">
          <Gift className="h-16 w-16 text-accent mb-4" />
          <p className="text-center mb-4">Her gün giriş yaparak 5 puan kazanın. Günlük bonusunuzu almayı unutmayın!</p>
          <p className="text-sm text-light-muted text-center">Şu anki puanınız: <span className="text-accent">{points}</span></p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 text-white" 
          onClick={() => claimBonus()}
          disabled={isPending || claimed}
        >
          {claimed ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Bonus Alındı
            </>
          ) : (
            <>
              <Gift className="mr-2 h-4 w-4" /> Bonusu Al
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Games = () => {
  const { isAuthenticated } = useAuth();
  const { points } = usePoints();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { toast } = useToast();

  const handleStartGame = (requiredPoints: number, gameName: string) => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    if (points < requiredPoints) {
      toast({
        title: "Yetersiz Puan",
        description: `${gameName} oynamak için en az ${requiredPoints} puan gerekiyor. Şu anki puanınız: ${points}`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Oyun Yakında",
      description: `${gameName} şu anda geliştiriliyor. Çok yakında burada olacak!`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Yapay Zeka Oyunları - ZekiBot</title>
        <meta
          name="description"
          content="ZekiBot yapay zeka destekli eğlenceli oyunlar ile hem eğlenin hem öğrenin."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-poppins font-bold flex items-center">
              <Gamepad className="mr-2 h-7 w-7 text-accent" />
              Yapay Zeka Oyunları
            </h1>
            <p className="text-light-muted mt-2">
              Eğlenceli mini oyunlar ile yapay zekanın yeteneklerini keşfedin
            </p>
          </div>
          {isAuthenticated && (
            <div className="mt-4 md:mt-0 flex items-center text-accent bg-dark-lighter rounded-full px-4 py-2">
              <Trophy className="mr-2 h-5 w-5" />
              <span className="font-medium">{points}</span> Puan
            </div>
          )}
        </div>

        {!isAuthenticated ? (
          <div className="flex items-center justify-center p-8 bg-dark-surface rounded-lg my-8">
            <div className="text-center p-6 max-w-md">
              <Gamepad className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Oyun oynamak için giriş yapın</h3>
              <p className="text-light-muted mb-4">
                ZekiBot'un yapay zeka oyunlarını oynamak için ücretsiz hesap oluşturun veya giriş yapın.
              </p>
              <Button 
                onClick={() => setIsLoginModalOpen(true)} 
                className="bg-accent text-dark hover:bg-accent/90"
              >
                Giriş Yap / Kayıt Ol
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            <WordPuzzle onStart={() => handleStartGame(10, "Kelime Bulmaca")} />
            <MemoryGame onStart={() => handleStartGame(15, "Hafıza Oyunu")} />
            <IntelligenceQuestions onStart={() => handleStartGame(20, "Zeka Soruları")} />
          </div>
        )}

        {isAuthenticated && (
          <div className="mt-8 mb-4">
            <h2 className="text-xl font-poppins font-semibold mb-4">Bonuslar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DailyBonus />
              
              <Card className="bg-dark-surface border-dark-lighter h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Arkadaş Daveti</CardTitle>
                    <Badge className="bg-green-500 text-black">+20 Puan</Badge>
                  </div>
                  <CardDescription>Arkadaşlarınızı davet ederek puan kazanın.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <AlertTriangle className="h-12 w-12 text-accent mx-auto mb-4" />
                  <p className="text-light-muted mb-2">Yakında aktif olacak!</p>
                </CardContent>
              </Card>
            </div>
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

export default Games;
