import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  LifeBuoy, 
  Bug, 
  Lightbulb, 
  CheckCircle, 
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export default function Feedback() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [feedbackType, setFeedbackType] = useState("general");
  const [feedbackCategory, setFeedbackCategory] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [contactEmail, setContactEmail] = useState(user?.email || "");
  const [severity, setSeverity] = useState("low");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackText) {
      toast({
        title: "Hata",
        description: "Lütfen geri bildirim metni girin.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simüle edilmiş asenkron işlem
    setTimeout(() => {
      toast({
        title: "Başarılı!",
        description: "Geri bildiriminiz başarıyla gönderildi. Teşekkür ederiz!",
      });
      
      // Form alanlarını sıfırla
      setFeedbackText("");
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Geri Bildirim - ZekiBot</title>
        <meta
          name="description"
          content="ZekiBot hakkında geri bildirim gönderin. Görüşleriniz, önerileriniz ve bildirimleriniz bizim için değerlidir."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-poppins font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Geri Bildirim
            </h1>
            <p className="text-light-muted text-lg max-w-2xl mx-auto">
              Görüşleriniz, önerileriniz ve bildirimleriniz ZekiBot'u geliştirmemize yardımcı oluyor. Lütfen düşüncelerinizi bizimle paylaşın.
            </p>
          </div>

          <Tabs defaultValue="feedback" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 bg-dark-lighter">
              <TabsTrigger value="feedback" className="data-[state=active]:bg-primary">
                <MessageSquare className="h-4 w-4 mr-2" />
                Geri Bildirim
              </TabsTrigger>
              <TabsTrigger value="bug" className="data-[state=active]:bg-accent">
                <Bug className="h-4 w-4 mr-2" />
                Hata Bildirimi
              </TabsTrigger>
              <TabsTrigger value="idea" className="data-[state=active]:bg-secondary">
                <Lightbulb className="h-4 w-4 mr-2" />
                Özellik Önerisi
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="feedback" className="mt-4">
              <Card className="bg-dark-surface border-dark-lighter">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="feedback-type">Geri Bildirim Türü</Label>
                      </div>
                      <Select 
                        value={feedbackType} 
                        onValueChange={setFeedbackType}
                      >
                        <SelectTrigger className="bg-dark-lighter border-dark-lighter focus:ring-primary">
                          <SelectValue placeholder="Geri bildirim türünü seçin" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-lighter border-dark-lighter">
                          <SelectItem value="general">Genel Geri Bildirim</SelectItem>
                          <SelectItem value="positive">Olumlu Geri Bildirim</SelectItem>
                          <SelectItem value="negative">Olumsuz Geri Bildirim</SelectItem>
                          <SelectItem value="support">Destek Talebi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="feedback-category">Kategori</Label>
                      </div>
                      <Select 
                        value={feedbackCategory} 
                        onValueChange={setFeedbackCategory}
                      >
                        <SelectTrigger className="bg-dark-lighter border-dark-lighter focus:ring-primary">
                          <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-lighter border-dark-lighter">
                          <SelectItem value="interface">Kullanıcı Arayüzü</SelectItem>
                          <SelectItem value="ai-chat">Yapay Zeka Sohbet</SelectItem>
                          <SelectItem value="image-generation">Görsel Oluşturma</SelectItem>
                          <SelectItem value="code-assistant">Kod Yazma Asistanı</SelectItem>
                          <SelectItem value="games">Yapay Zeka Oyunları</SelectItem>
                          <SelectItem value="points">Puan Sistemi</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="feedback-text">Geri Bildiriminiz</Label>
                      </div>
                      <Textarea
                        id="feedback-text"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Görüşlerinizi, önerilerinizi veya sorularınızı buraya yazabilirsiniz..."
                        className="min-h-[150px] bg-dark-lighter border-dark-lighter focus:border-primary"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="contact-email">İletişim E-postası (İsteğe Bağlı)</Label>
                      </div>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="Size geri dönüş yapabilmemiz için e-posta adresiniz"
                        className="bg-dark-lighter border-dark-lighter focus:border-primary"
                      />
                      <p className="text-xs text-light-muted mt-1">
                        E-posta adresiniz paylaşılmayacak ve sadece bu geri bildirimle ilgili iletişim için kullanılacaktır.
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        type="submit" 
                        className="min-w-[200px] bg-primary hover:bg-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            Gönderiliyor...
                          </>
                        ) : (
                          <>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Geri Bildirim Gönder
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bug" className="mt-4">
              <Card className="bg-dark-surface border-dark-lighter">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="bug-category">Hata Kategorisi</Label>
                      </div>
                      <Select 
                        value={feedbackCategory} 
                        onValueChange={setFeedbackCategory}
                      >
                        <SelectTrigger className="bg-dark-lighter border-dark-lighter focus:ring-accent">
                          <SelectValue placeholder="Hata kategorisini seçin" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-lighter border-dark-lighter">
                          <SelectItem value="ui-bug">Kullanıcı Arayüzü Hatası</SelectItem>
                          <SelectItem value="functional-bug">Fonksiyonel Hata</SelectItem>
                          <SelectItem value="performance-bug">Performans Sorunu</SelectItem>
                          <SelectItem value="security-bug">Güvenlik Sorunu</SelectItem>
                          <SelectItem value="ai-bug">Yapay Zeka Hatası</SelectItem>
                          <SelectItem value="payment-bug">Ödeme/Puan Hatası</SelectItem>
                          <SelectItem value="other-bug">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="bug-severity">Hata Ciddiyeti</Label>
                      </div>
                      <Select 
                        value={severity} 
                        onValueChange={setSeverity}
                      >
                        <SelectTrigger className="bg-dark-lighter border-dark-lighter focus:ring-accent">
                          <SelectValue placeholder="Hata ciddiyetini seçin" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-lighter border-dark-lighter">
                          <SelectItem value="critical">Kritik (Kullanılamaz Durum)</SelectItem>
                          <SelectItem value="high">Yüksek (Önemli İşlev Kaybı)</SelectItem>
                          <SelectItem value="medium">Orta (Kısmi İşlev Kaybı)</SelectItem>
                          <SelectItem value="low">Düşük (Küçük Sorun)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="bug-text">Hata Açıklaması</Label>
                      </div>
                      <Textarea
                        id="bug-text"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Hatayı nasıl tetiklediğinizi, beklenen davranışı ve gerçekleşen davranışı detaylı olarak açıklayın..."
                        className="min-h-[150px] bg-dark-lighter border-dark-lighter focus:border-accent"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="contact-email-bug">İletişim E-postası (İsteğe Bağlı)</Label>
                      </div>
                      <Input
                        id="contact-email-bug"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="Size geri dönüş yapabilmemiz için e-posta adresiniz"
                        className="bg-dark-lighter border-dark-lighter focus:border-accent"
                      />
                      <p className="text-xs text-light-muted mt-1">
                        E-posta adresiniz paylaşılmayacak ve sadece bu hata bildirimiyle ilgili iletişim için kullanılacaktır.
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        type="submit" 
                        className="min-w-[200px] bg-accent hover:bg-accent/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            Gönderiliyor...
                          </>
                        ) : (
                          <>
                            <Bug className="h-4 w-4 mr-2" />
                            Hata Bildir
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="idea" className="mt-4">
              <Card className="bg-dark-surface border-dark-lighter">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="idea-category">Öneri Kategorisi</Label>
                      </div>
                      <Select 
                        value={feedbackCategory} 
                        onValueChange={setFeedbackCategory}
                      >
                        <SelectTrigger className="bg-dark-lighter border-dark-lighter focus:ring-secondary">
                          <SelectValue placeholder="Öneri kategorisini seçin" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-lighter border-dark-lighter">
                          <SelectItem value="new-feature">Yeni Özellik</SelectItem>
                          <SelectItem value="ui-improvement">Arayüz İyileştirmesi</SelectItem>
                          <SelectItem value="ai-improvement">Yapay Zeka İyileştirmesi</SelectItem>
                          <SelectItem value="ux-improvement">Kullanım Deneyimi İyileştirmesi</SelectItem>
                          <SelectItem value="integration">Yeni Entegrasyon</SelectItem>
                          <SelectItem value="other-idea">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="idea-text">Öneriniz</Label>
                      </div>
                      <Textarea
                        id="idea-text"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Önerinizi detaylı olarak açıklayın. Bu özellik hangi problemi çözecek, nasıl çalışmalı?"
                        className="min-h-[150px] bg-dark-lighter border-dark-lighter focus:border-secondary"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="contact-email-idea">İletişim E-postası (İsteğe Bağlı)</Label>
                      </div>
                      <Input
                        id="contact-email-idea"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="Size geri dönüş yapabilmemiz için e-posta adresiniz"
                        className="bg-dark-lighter border-dark-lighter focus:border-secondary"
                      />
                      <p className="text-xs text-light-muted mt-1">
                        E-posta adresiniz paylaşılmayacak ve sadece bu öneriyle ilgili iletişim için kullanılacaktır.
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        type="submit" 
                        className="min-w-[200px] bg-secondary hover:bg-secondary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            Gönderiliyor...
                          </>
                        ) : (
                          <>
                            <Lightbulb className="h-4 w-4 mr-2" />
                            Öneri Gönder
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-dark-surface border-dark-lighter h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-dark-lighter mr-4">
                    <ThumbsUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Neden Geri Bildirim Vermelisiniz?</h3>
                  </div>
                </div>
                <ul className="space-y-3 text-light-muted">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Platformun gelişimine katkıda bulunursunuz</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>İhtiyaçlarınıza daha iyi yanıt veren özellikler geliştirilir</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Kullanım deneyiminizi iyileştiren değişiklikleri görürsünüz</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Karşılaştığınız sorunlar daha hızlı çözülür</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-dark-surface border-dark-lighter h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-dark-lighter mr-4">
                    <LifeBuoy className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Alternatif İletişim Kanalları</h3>
                  </div>
                </div>
                <ul className="space-y-3 text-light-muted">
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Acil Teknik Destek</p>
                      <p className="text-sm">destek@zekigpt.com.tr</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Güvenlik Bildirimleri</p>
                      <p className="text-sm">guvenlik@zekigpt.com.tr</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">İş Birlikleri</p>
                      <p className="text-sm">isbirligi@zekigpt.com.tr</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Basın İlişkileri</p>
                      <p className="text-sm">basin@zekigpt.com.tr</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-light-muted mb-4 text-sm">
              Geri bildiriminizi bize ilettiğiniz için teşekkür ederiz. ZekiBot'u geliştirmek için yorumlarınızı dikkate alıyoruz.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Beğendim
              </Button>
              <Button variant="outline" className="text-accent border-accent hover:bg-accent/10">
                <ThumbsDown className="h-4 w-4 mr-2" />
                Beğenmedim
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}