import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Bu demo amaçlı bir form gönderimi simülasyonudur
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      toast({
        title: "Mesajınız gönderildi!",
        description: "En kısa sürede size geri dönüş yapacağız.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>İletişim - ZekiBot</title>
        <meta
          name="description"
          content="ZekiBot ile iletişime geçin. Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-poppins font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              İletişim
            </h1>
            <p className="text-light-muted text-lg max-w-2xl mx-auto">
              Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçebilirsiniz. Size en kısa sürede dönüş yapacağız.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <Card className="bg-dark-surface border-dark-lighter h-full">
                <CardContent className="p-6 space-y-8">
                  <div className="text-xl font-bold mb-6 pt-2">İletişim Bilgileri</div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">E-posta</h3>
                      <p className="text-light-muted text-sm">info@zekigpt.com.tr</p>
                      <p className="text-light-muted text-sm">destek@zekigpt.com.tr</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Telefon</h3>
                      <p className="text-light-muted text-sm">+90 212 123 45 67</p>
                      <p className="text-light-muted text-sm">+90 212 123 45 68</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Adres</h3>
                      <p className="text-light-muted text-sm">
                        Teknopark İstanbul<br />
                        Sanayi Mah. Teknopark Bulvarı<br />
                        No: 123, Pendik<br />
                        İstanbul, Türkiye
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Çalışma Saatleri</h3>
                      <p className="text-light-muted text-sm">
                        Pazartesi - Cuma: 09:00 - 18:00<br />
                        Cumartesi: 10:00 - 14:00<br />
                        Pazar: Kapalı
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="text-lg font-medium mb-3">Bizi Takip Edin</div>
                    <div className="flex space-x-4">
                      <a 
                        href="#" 
                        className="h-10 w-10 rounded-full bg-dark-lighter flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <i className="fab fa-twitter text-light-muted"></i>
                      </a>
                      <a 
                        href="#" 
                        className="h-10 w-10 rounded-full bg-dark-lighter flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <i className="fab fa-facebook-f text-light-muted"></i>
                      </a>
                      <a 
                        href="#" 
                        className="h-10 w-10 rounded-full bg-dark-lighter flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <i className="fab fa-instagram text-light-muted"></i>
                      </a>
                      <a 
                        href="#" 
                        className="h-10 w-10 rounded-full bg-dark-lighter flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <i className="fab fa-linkedin-in text-light-muted"></i>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="bg-dark-surface border-dark-lighter">
                <CardContent className="p-6 md:p-8">
                  <div className="text-xl font-bold mb-6">Bize Mesaj Gönderin</div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Adınız Soyadınız</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Adınız Soyadınız"
                          className="bg-dark-lighter border-dark-lighter focus:border-primary"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta Adresiniz</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="E-posta adresiniz"
                          className="bg-dark-lighter border-dark-lighter focus:border-primary"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Konu</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Mesajınızın konusu"
                        className="bg-dark-lighter border-dark-lighter focus:border-primary"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Mesajınız</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Mesajınızı buraya yazın..."
                        className="min-h-[150px] bg-dark-lighter border-dark-lighter focus:border-primary"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-light border-opacity-50 border-t-transparent rounded-full" />
                          Gönderiliyor...
                        </>
                      ) : submitSuccess ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Gönderildi!
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Mesajı Gönder
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-surface border-dark-lighter mt-8">
                <CardContent className="p-6 md:p-8">
                  <div className="text-xl font-bold mb-6">Sık Sorulan Sorular</div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">ZekiBot'u nasıl kullanabilirim?</h3>
                      <p className="text-light-muted text-sm">
                        ZekiBot'u kullanmak için hesap oluşturmanız yeterlidir. Kayıt olduktan sonra, 
                        yapay zeka sohbet, görsel oluşturma, kod yazma gibi özelliklere erişebilirsiniz.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Puan sistemini nasıl kullanabilirim?</h3>
                      <p className="text-light-muted text-sm">
                        ZekiBot'ta yapay zeka özelliklerini kullanmak için puanlara ihtiyacınız vardır. 
                        Puanları günlük giriş bonuslarıyla kazanabilir veya satın alabilirsiniz.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Teknik destek için nasıl iletişime geçebilirim?</h3>
                      <p className="text-light-muted text-sm">
                        Teknik destek için destek@zekigpt.com.tr adresine e-posta gönderebilir veya yukarıdaki 
                        iletişim formu aracılığıyla bize ulaşabilirsiniz.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}