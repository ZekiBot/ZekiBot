import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Award, BookOpen, Users, Globe, Star } from "lucide-react";

export default function About() {
  return (
    <>
      <Helmet>
        <title>Hakkımızda - ZekiBot</title>
        <meta name="description" content="ZekiBot hakkında bilgi edinin. Vizyonumuz, misyonumuz ve değerlerimiz." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-poppins font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Hakkımızda
            </h1>
            <p className="text-light-muted text-lg max-w-2xl mx-auto">
              ZekiBot, yapay zeka teknolojilerini herkes için erişilebilir kılma misyonuyla kurulmuş bir platformdur.
            </p>
          </div>

          <Card className="bg-dark-surface border-dark-lighter mb-10">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Info className="h-7 w-7 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Biz Kimiz?</h2>
              </div>
              <p className="text-light-muted mb-6">
                ZekiBot, 2024 yılında yapay zeka teknolojilerinin herkes tarafından, yaşı ve teknik bilgisi ne olursa olsun kolayca kullanılabilmesi amacıyla kurulmuştur. Ekibimiz, kullanıcı deneyimini ön planda tutan ve teknolojinin gücünü herkes için erişilebilir kılmayı hedefleyen uzmanlardan oluşmaktadır.
              </p>
              <p className="text-light-muted">
                Platformumuz, sohbet, görsel oluşturma, kod yazma ve oyun gibi çeşitli yapay zeka özellikleri sunarken, kullanıcı dostu bir arayüz ile herkesin bu teknolojilerden faydalanabilmesini sağlamaktadır. Özellikle yaşlılar, çocuklar ve internet kullanımına yeni başlayanlar için tasarlanmış kullanım kolaylığı sunan bir deneyim sunuyoruz.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Card className="bg-dark-surface border-dark-lighter">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">Misyonumuz</h3>
                </div>
                <p className="text-light-muted">
                  Yapay zeka teknolojilerini herkes için erişilebilir kılmak ve kullanıcı dostu bir deneyimle teknolojinin gücünü insanların günlük hayatlarına entegre etmek. Özellikle dijital teknolojilerle ilgili endişe duyan veya teknik bilgisi sınırlı olan kitleler için basit, anlaşılır ve güvenli bir platform sunmak.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-dark-surface border-dark-lighter">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Star className="h-6 w-6 text-secondary mr-2" />
                  <h3 className="text-xl font-semibold">Vizyonumuz</h3>
                </div>
                <p className="text-light-muted">
                  Yapay zeka alanında Türkiye'nin lider platformu olarak, teknolojinin demokratikleşmesine öncülük etmek ve her yaştan, her eğitim seviyesinden insanın yapay zeka teknolojilerine kolayca erişebilmesini sağlamak. İnsanların hayatlarını kolaylaştıran, verimliliklerini artıran ve yeni fırsatlar yaratan bir ekosistem oluşturmak.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-dark-surface border-dark-lighter mb-10">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <BookOpen className="h-7 w-7 text-accent mr-3" />
                <h2 className="text-2xl font-bold">Değerlerimiz</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-b md:border-b-0 md:border-r border-dark-lighter pb-4 md:pb-0 md:pr-6">
                  <h4 className="font-semibold text-lg mb-2">Kullanıcı Odaklılık</h4>
                  <p className="text-light-muted">
                    Her kararımızda ve tasarımımızda kullanıcı deneyimini ön planda tutuyoruz. Platformumuzun her özelliği, kullanıcılarımızın ihtiyaçlarını ve beklentilerini karşılamak üzere tasarlanmıştır.
                  </p>
                </div>
                <div className="pt-4 md:pt-0 md:pl-6">
                  <h4 className="font-semibold text-lg mb-2">Erişilebilirlik</h4>
                  <p className="text-light-muted">
                    Teknolojinin herkese açık olması gerektiğine inanıyoruz. Platformumuz, yaş, eğitim düzeyi veya teknik bilgi seviyesi ne olursa olsun herkesin kolayca kullanabileceği şekilde tasarlanmıştır.
                  </p>
                </div>
                <div className="border-t border-dark-lighter pt-4 md:pt-6">
                  <h4 className="font-semibold text-lg mb-2">Güvenlik ve Gizlilik</h4>
                  <p className="text-light-muted">
                    Kullanıcılarımızın güvenliği ve verilerinin gizliliği bizim için en önemli önceliklerden biridir. Tüm platformumuz, en yüksek güvenlik standartlarına uygun olarak tasarlanmıştır.
                  </p>
                </div>
                <div className="border-t border-dark-lighter pt-4 md:pt-6">
                  <h4 className="font-semibold text-lg mb-2">Yenilikçilik</h4>
                  <p className="text-light-muted">
                    Sürekli olarak yeniliklerin peşinde koşuyor ve en son teknolojileri kullanıcılarımıza sunuyoruz. Değişen dünyaya ayak uydurmak ve kullanıcılarımıza en iyi deneyimi sunmak için sürekli gelişim halindeyiz.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-10">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Users className="h-7 w-7 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Ekibimiz</h2>
              </div>
              <p className="text-light-muted mb-6">
                ZekiBot, yapay zeka, yazılım geliştirme, kullanıcı deneyimi tasarımı ve veri bilimi alanlarında uzman bir ekip tarafından geliştirilmektedir. Her biri kendi alanında deneyimli olan ekip üyelerimiz, kullanıcılarımıza en iyi deneyimi sunmak için büyük bir tutku ve özveri ile çalışmaktadır.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-dark-lighter rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-3xl font-bold text-primary">AY</div>
                  </div>
                  <h4 className="font-semibold">Ahmet Yılmaz</h4>
                  <p className="text-light-muted text-sm">Kurucu & CEO</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-dark-lighter rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-3xl font-bold text-secondary">MK</div>
                  </div>
                  <h4 className="font-semibold">Mehmet Kaya</h4>
                  <p className="text-light-muted text-sm">Baş Teknoloji Sorumlusu</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-dark-lighter rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-3xl font-bold text-accent">ZT</div>
                  </div>
                  <h4 className="font-semibold">Zeynep Taş</h4>
                  <p className="text-light-muted text-sm">Kullanıcı Deneyimi Direktörü</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Globe className="h-7 w-7 text-secondary mr-3" />
                <h2 className="text-2xl font-bold">İletişim</h2>
              </div>
              <p className="text-light-muted mb-6">
                Bizimle ilgili her türlü soru, öneri veya geri bildiriminiz için aşağıdaki iletişim kanallarından bize ulaşabilirsiniz. Ekibimiz en kısa sürede size yanıt verecektir.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">İletişim Bilgileri</h4>
                  <ul className="space-y-2 text-light-muted">
                    <li>E-posta: info@zekigpt.com.tr</li>
                    <li>Telefon: +90 212 123 45 67</li>
                    <li>Adres: Teknopark İstanbul, No: 123, Pendik, İstanbul</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Sosyal Medya</h4>
                  <ul className="space-y-2 text-light-muted">
                    <li>Twitter: @zekibot</li>
                    <li>Instagram: @zekibotai</li>
                    <li>LinkedIn: ZekiBot AI</li>
                    <li>YouTube: ZekiBot Yapay Zeka</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}