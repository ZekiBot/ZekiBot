import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LifeBuoy, 
  BookOpen, 
  Video, 
  Lightbulb, 
  MessageSquare, 
  Mail, 
  PhoneCall,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HelpCenter() {
  const helpCategories = [
    {
      title: "Başlangıç Kılavuzu",
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      description: "ZekiBot'a yeni başlayanlar için temel bilgiler ve kullanım kılavuzu.",
      links: [
        { title: "ZekiBot'a Hoş Geldiniz", url: "#welcome" },
        { title: "Hesap Oluşturma ve Giriş", url: "#account" },
        { title: "Puan Sistemi Nasıl Çalışır", url: "#points" },
        { title: "İlk Yapay Zeka Sohbetiniz", url: "#first-chat" },
      ],
    },
    {
      title: "Video Rehberler",
      icon: <Video className="h-10 w-10 text-secondary" />,
      description: "Adım adım görsel rehberlerle ZekiBot özelliklerini keşfedin.",
      links: [
        { title: "ZekiBot Tanıtım Videosu", url: "#intro-video" },
        { title: "Görsel Oluşturma Rehberi", url: "#image-guide" },
        { title: "Kod Yazma Asistanı Kullanımı", url: "#code-guide" },
        { title: "Yapay Zeka Oyunları", url: "#games-guide" },
      ],
    },
    {
      title: "Sık Karşılaşılan Sorunlar",
      icon: <Lightbulb className="h-10 w-10 text-accent" />,
      description: "Kullanıcıların en çok karşılaştığı sorunlar ve çözümleri.",
      links: [
        { title: "Giriş Yapamıyorum", url: "#login-issues" },
        { title: "Puanlarım Eksik Görünüyor", url: "#missing-points" },
        { title: "Görsel Oluşturulamıyor", url: "#image-issues" },
        { title: "Yapay Zeka Yanıt Vermiyor", url: "#ai-not-responding" },
      ],
    },
    {
      title: "Canlı Destek",
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      description: "Gerçek zamanlı yardım için canlı destek ekibimizle iletişime geçin.",
      links: [
        { title: "Canlı Sohbet Başlat", url: "#live-chat" },
        { title: "Destek Talebi Oluştur", url: "#support-ticket" },
        { title: "Teknik Destek Talep Et", url: "#technical-support" },
        { title: "Geribildirim Gönder", url: "#feedback" },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Yardım Merkezi - ZekiBot</title>
        <meta
          name="description"
          content="ZekiBot Yardım Merkezi - Sorularınıza yanıt bulun, rehberlerimize göz atın ve destek alın."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-poppins font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Yardım Merkezi
            </h1>
            <p className="text-light-muted text-lg max-w-2xl mx-auto">
              ZekiBot kullanımıyla ilgili sorularınıza yanıt bulun, rehberlerimize göz atın ve ihtiyaç duyduğunuzda destek alın.
            </p>
          </div>

          {/* Hero Section with Quick Links */}
          <Card className="bg-gradient-to-br from-primary/20 to-dark-surface border-dark-lighter mb-12">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h2 className="text-2xl font-bold mb-3">Nasıl yardımcı olabiliriz?</h2>
                  <p className="text-light-muted mb-4">
                    Size en hızlı şekilde yardımcı olabilmemiz için aşağıdaki seçenekleri kullanabilirsiniz.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/sikca-sorulan-sorular">
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                        <LifeBuoy className="h-4 w-4 mr-2" />
                        Sıkça Sorulan Sorular
                      </Button>
                    </Link>
                    <Link href="/geri-bildirim">
                      <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Destek Talebi Oluştur
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-3 min-w-[220px]">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="text-light-muted text-sm">E-posta</p>
                      <p className="font-medium">destek@zekigpt.com.tr</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <PhoneCall className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="text-light-muted text-sm">Telefon</p>
                      <p className="font-medium">0850 123 45 67</p>
                    </div>
                  </div>
                  <p className="text-xs text-light-muted mt-1">
                    Çalışma Saatleri: Hafta içi 09:00-18:00
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {helpCategories.map((category, index) => (
              <Card key={index} className="bg-dark-surface border-dark-lighter h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-start mb-4">
                    <div className="p-3 rounded-lg bg-dark-lighter mr-4 mt-1">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                      <p className="text-light-muted mb-4">{category.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 mt-auto">
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a 
                          href={link.url} 
                          className="flex items-center text-light-muted hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-2" />
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Populer Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Popüler Yardım Makaleleri</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Günlük Bonus Nasıl Alınır",
                  views: "1.2k görüntülenme",
                  category: "Puan Sistemi",
                },
                {
                  title: "Sosyal Medya ile Giriş Yapma",
                  views: "956 görüntülenme",
                  category: "Hesap Yönetimi",
                },
                {
                  title: "Yüksek Kaliteli Görseller Oluşturma",
                  views: "875 görüntülenme",
                  category: "Görsel Oluşturma",
                },
                {
                  title: "Kod Yazma Asistanı İpuçları",
                  views: "742 görüntülenme",
                  category: "Kod Yazma",
                },
                {
                  title: "AI Sohbette Prompt Mühendisliği",
                  views: "698 görüntülenme",
                  category: "AI Sohbet",
                },
                {
                  title: "Şifremi Unuttum Süreci",
                  views: "621 görüntülenme",
                  category: "Hesap Yönetimi",
                },
              ].map((article, index) => (
                <Card 
                  key={index} 
                  className="bg-dark-surface border-dark-lighter hover:border-primary transition-all duration-300"
                >
                  <CardContent className="p-5">
                    <div className="text-xs text-primary font-semibold mb-2">
                      {article.category}
                    </div>
                    <h3 className="font-semibold mb-3 line-clamp-2">{article.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-light-muted">
                        {article.views}
                      </span>
                      <Button 
                        variant="link" 
                        className="text-primary p-0 h-auto font-medium text-sm"
                      >
                        Okumaya Devam Et
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Support */}
          <Card className="bg-dark-surface border-dark-lighter mb-12">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-3">Topluluk Desteği</h2>
                <p className="text-light-muted max-w-2xl mx-auto mb-6">
                  Diğer ZekiBot kullanıcılarıyla iletişime geçin, sorularınızı sorun ve deneyimlerinizi paylaşın. Topluluk forumlarımızda binlerce kullanıcı ve ZekiBot uzmanlarından yardım alabilirsiniz.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-primary hover:bg-primary/90">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Topluluk Forumuna Katıl
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Bilgi Tabanını Keşfet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Still Need Help */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3">Hala Yardıma İhtiyacınız Var Mı?</h2>
            <p className="text-light-muted max-w-2xl mx-auto mb-6">
              Burada ihtiyacınız olan bilgiyi bulamadıysanız, destek ekibimizle doğrudan iletişime geçebilirsiniz. Size en kısa sürede yardımcı olacağız.
            </p>
            <Button className="bg-secondary hover:bg-secondary/90">
              <Mail className="h-4 w-4 mr-2" />
              Destek Ekibiyle İletişime Geç
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}