import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, Bell, RefreshCw } from "lucide-react";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Gizlilik Politikası - ZekiBot</title>
        <meta
          name="description"
          content="ZekiBot gizlilik politikası. Verilerinizi nasıl koruduğumuzu ve kullandığımızı öğrenin."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-poppins font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Gizlilik Politikası
            </h1>
            <p className="text-light-muted text-lg max-w-2xl mx-auto">
              Verilerinizin güvenliği ve gizliliği bizim için en önemli önceliklerden biridir.
              Bu politika, kişisel verilerinizin nasıl toplandığını, kullanıldığını ve
              korunduğunu açıklar.
            </p>
            <p className="text-light-muted mt-2">
              Son güncelleme: 01 Nisan 2024
            </p>
          </div>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Shield className="h-7 w-7 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Genel Bakış</h2>
              </div>
              <p className="text-light-muted mb-4">
                ZekiBot olarak, hizmetlerimizi kullanırken bize sağladığınız kişisel
                verilerinizin gizliliğine ve güvenliğine büyük önem veriyoruz. Bu gizlilik
                politikası, hangi bilgileri topladığımızı, bu bilgileri nasıl kullandığımızı ve
                koruduğumuzu açıklar.
              </p>
              <p className="text-light-muted">
                Bu politika, ZekiBot platformunda sunulan tüm hizmetleri, web sitesini ve
                ilgili tüm uygulamaları kapsar. Platformumuzu kullanarak, bu politikada
                belirtilen uygulamaları kabul etmiş olursunuz.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Database className="h-7 w-7 text-secondary mr-3" />
                <h2 className="text-2xl font-bold">Toplanan Bilgiler</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Sağladığınız Bilgiler</h3>
                  <p className="text-light-muted mb-3">
                    Platformumuza kaydolurken veya hizmetlerimizi kullanırken bize şu bilgileri
                    sağlayabilirsiniz:
                  </p>
                  <ul className="list-disc pl-6 text-light-muted space-y-2">
                    <li>İsim, e-posta adresi ve şifre gibi hesap bilgileri</li>
                    <li>Yapay zeka sohbetleri, görsel oluşturma talepleri ve kod yazma istekleri
                      gibi platform içi etkileşimler</li>
                    <li>Geri bildirimler, destek talepleri ve anketlere verdiğiniz yanıtlar</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Otomatik Olarak Toplanan Bilgiler</h3>
                  <p className="text-light-muted mb-3">
                    Platformumuzu kullandığınızda, bazı bilgiler otomatik olarak toplanır:
                  </p>
                  <ul className="list-disc pl-6 text-light-muted space-y-2">
                    <li>IP adresi, tarayıcı türü, işletim sistemi ve cihaz bilgileri</li>
                    <li>Platform içindeki gezinme davranışınız ve kullanım istatistikleri</li>
                    <li>Çerezler ve benzer teknolojiler aracılığıyla toplanan bilgiler</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Eye className="h-7 w-7 text-accent mr-3" />
                <h2 className="text-2xl font-bold">Bilgilerin Kullanımı</h2>
              </div>
              <p className="text-light-muted mb-4">
                Topladığımız bilgileri aşağıdaki amaçlar için kullanırız:
              </p>
              <ul className="list-disc pl-6 text-light-muted space-y-3">
                <li>
                  <span className="font-medium">Hizmet sağlamak ve geliştirmek:</span> Hesabınızı
                  yönetmek, hizmetlerimizi sunmak, özelleştirmek ve iyileştirmek
                </li>
                <li>
                  <span className="font-medium">İletişim kurmak:</span> Güncellemeler, güvenlik
                  bildirimleri ve destek mesajları göndermek
                </li>
                <li>
                  <span className="font-medium">Güvenliği sağlamak:</span> Hesabınızı korumak,
                  dolandırıcılık ve kötü niyetli kullanımı tespit etmek ve önlemek
                </li>
                <li>
                  <span className="font-medium">Yapay zeka modellerini eğitmek ve iyileştirmek:</span> 
                  Platform içi etkileşimlerinizden elde edilen verileri, hizmet kalitemizi artırmak 
                  için kullanabiliriz (özel izniniz olmadan kişisel verileriniz bu amaçla kullanılmaz)
                </li>
                <li>
                  <span className="font-medium">Analiz ve araştırma:</span> Platformumuzun nasıl
                  kullanıldığını anlamak ve iyileştirmeler yapmak
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Lock className="h-7 w-7 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Bilgi Paylaşımı ve İfşası</h2>
              </div>
              <p className="text-light-muted mb-4">
                Kişisel bilgilerinizi şu durumlarda paylaşabiliriz:
              </p>
              <ul className="list-disc pl-6 text-light-muted space-y-3">
                <li>
                  <span className="font-medium">Hizmet sağlayıcılar:</span> Platformumuzu
                  destekleyen hizmetleri sağlayan üçüncü taraf şirketlerle (ör. hosting, ödeme
                  işlemleri, müşteri hizmetleri)
                </li>
                <li>
                  <span className="font-medium">Yasal gereklilikler:</span> Geçerli bir yasal
                  süreç (mahkeme kararı, arama emri) olduğunda veya mevzuat gerektirdiğinde
                </li>
                <li>
                  <span className="font-medium">İş transferleri:</span> Bir birleşme, satın alma
                  veya şirket varlıklarının satışı durumunda, verileriniz devredilebilir
                </li>
                <li>
                  <span className="font-medium">Rızanız ile:</span> Bilgilerinizi paylaşmak için
                  açık izin verdiğiniz diğer durumlarda
                </li>
              </ul>
              <p className="text-light-muted mt-4">
                Kişisel verilerinizi pazarlama amaçlı olarak üçüncü taraflarla satmaz veya
                kiralamayız.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Bell className="h-7 w-7 text-secondary mr-3" />
                <h2 className="text-2xl font-bold">Haklarınız ve Seçenekleriniz</h2>
              </div>
              <p className="text-light-muted mb-4">
                Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc pl-6 text-light-muted space-y-3">
                <li>
                  <span className="font-medium">Erişim ve düzeltme:</span> Hesap ayarlarınız
                  üzerinden kişisel bilgilerinize erişebilir ve düzeltebilirsiniz
                </li>
                <li>
                  <span className="font-medium">Silme:</span> Hesabınızı ve ilişkili kişisel
                  verilerinizi silmemizi talep edebilirsiniz
                </li>
                <li>
                  <span className="font-medium">Veri taşınabilirliği:</span> Bize sağladığınız
                  bilgilerin bir kopyasını alabilirsiniz
                </li>
                <li>
                  <span className="font-medium">İtiraz ve kısıtlama:</span> Belirli işlemlerimize
                  itiraz edebilir veya kişisel verilerinizin işlenmesini kısıtlayabilirsiniz
                </li>
                <li>
                  <span className="font-medium">Rızayı geri çekme:</span> Daha önce verdiğiniz
                  herhangi bir izni istediğiniz zaman geri çekebilirsiniz
                </li>
              </ul>
              <p className="text-light-muted mt-4">
                Bu haklarınızı kullanmak için lütfen info@zekigpt.com.tr adresinden bizimle iletişime geçin.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <RefreshCw className="h-7 w-7 text-accent mr-3" />
                <h2 className="text-2xl font-bold">Politika Değişiklikleri</h2>
              </div>
              <p className="text-light-muted">
                Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler
                olduğunda, güncellenmiş politikayı platformumuzda yayınlayacak ve kayıtlı
                kullanıcılarımıza e-posta yoluyla bildirim göndereceğiz. Düzenli olarak
                politikamızı gözden geçirmenizi öneririz. Bu politikanın en son ne zaman
                güncellendiğini sayfanın başındaki "Son güncelleme" tarihinden kontrol
                edebilirsiniz.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">İletişim</h2>
              <p className="text-light-muted mb-4">
                Bu gizlilik politikası hakkında sorularınız veya endişeleriniz varsa, lütfen
                aşağıdaki kanallardan bize ulaşın:
              </p>
              <div className="text-light-muted">
                <p>E-posta: privacy@zekigpt.com.tr</p>
                <p>Adres: Teknopark İstanbul, No: 123, Pendik, İstanbul</p>
                <p>Telefon: +90 212 123 45 67</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}