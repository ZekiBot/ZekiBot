import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ShieldCheck, AlertTriangle, UserCheck, Zap, RefreshCw } from "lucide-react";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Kullanım Şartları - ZekiBot</title>
        <meta
          name="description"
          content="ZekiBot kullanım şartları ve koşulları. Platformumuzu kullanırken uymanız gereken kurallar."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-poppins font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Kullanım Şartları
            </h1>
            <p className="text-light-muted text-lg max-w-2xl mx-auto">
              Bu kullanım şartları, ZekiBot platformunu kullanırken uymanız gereken koşulları
              belirler. Lütfen platformu kullanmadan önce bu şartları dikkatlice okuyun.
            </p>
            <p className="text-light-muted mt-2">
              Son güncelleme: 01 Nisan 2024
            </p>
          </div>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <FileText className="h-7 w-7 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Genel Hükümler</h2>
              </div>
              <p className="text-light-muted mb-4">
                Bu kullanım şartları, ZekiBot platformunu ("platform") kullanımınızı düzenleyen
                yasal bir sözleşmedir. "Biz", "bizim" veya "ZekiBot" terimleri ZekiBot'u; "siz"
                veya "kullanıcı" terimleri ise platformu kullanan kişileri ifade eder.
              </p>
              <p className="text-light-muted mb-4">
                Platformumuza erişerek veya platformumuzu kullanarak, bu kullanım şartlarını
                okuduğunuzu, anladığınızı ve kabul ettiğinizi onaylamış olursunuz. Eğer bu
                şartları kabul etmiyorsanız, lütfen platformumuzu kullanmayın.
              </p>
              <p className="text-light-muted">
                18 yaşın altındaysanız, platformu kullanmak için ebeveyn veya yasal vasinizin
                iznini almanız gerekir. 13 yaşından küçükseniz, platformumuzu kullanamazsınız.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <UserCheck className="h-7 w-7 text-secondary mr-3" />
                <h2 className="text-2xl font-bold">Hesaplar ve Kullanıcı Bilgileri</h2>
              </div>
              <div className="space-y-4">
                <p className="text-light-muted">
                  ZekiBot'un bazı özelliklerini kullanabilmek için bir hesap oluşturmanız
                  gerekebilir. Hesap oluşturduğunuzda şunları kabul etmiş olursunuz:
                </p>
                <ul className="list-disc pl-6 text-light-muted space-y-2">
                  <li>Doğru, güncel ve eksiksiz bilgi sağlayacağınızı</li>
                  <li>Bu bilgileri gerektiğinde güncelleyeceğinizi</li>
                  <li>Hesap bilgilerinizin gizliliğini koruyacağınızı</li>
                  <li>Hesabınızda gerçekleşen tüm etkinliklerden sorumlu olduğunuzu</li>
                </ul>
                <p className="text-light-muted">
                  Hesabınızın yetkisiz kullanımından şüpheleniyorsanız, derhal bizimle iletişime
                  geçmelisiniz. Hesabınızın güvenliğiyle ilgili ihlallerden kaynaklanabilecek
                  kayıplardan sorumlu olmayabiliriz.
                </p>
                <p className="text-light-muted">
                  Takdir yetkimize bağlı olarak, herhangi bir sebeple hesabınızı askıya alabilir
                  veya sonlandırabiliriz. Bu durumda platformumuzu kullanma yetkiniz de sona erer.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Zap className="h-7 w-7 text-accent mr-3" />
                <h2 className="text-2xl font-bold">Puan Sistemi ve Ödeme Koşulları</h2>
              </div>
              <div className="space-y-4">
                <p className="text-light-muted">
                  ZekiBot, kullanıcıların platform özelliklerine erişmek için kullandıkları bir
                  puan sistemine sahiptir. Puanlar aşağıdaki şekillerde kazanılabilir veya
                  edinilebilir:
                </p>
                <ul className="list-disc pl-6 text-light-muted space-y-2">
                  <li>Ücretsiz günlük giriş bonusları</li>
                  <li>İçerik üretimi ve platforma katkı sağlama</li>
                  <li>Satın alma yoluyla</li>
                </ul>
                <p className="text-light-muted">
                  Puan satın almaya ilişkin aşağıdaki koşullar geçerlidir:
                </p>
                <ul className="list-disc pl-6 text-light-muted space-y-2">
                  <li>Tüm ödemeler Türk Lirası (TL) cinsinden yapılır</li>
                  <li>Satın alınan puanlar iade edilemez</li>
                  <li>
                    Puanlar kişiseldir ve başka kullanıcılara transfer edilemez veya satılamaz
                  </li>
                  <li>
                    Puanların geçerlilik süresi, satın alındıktan sonra 12 aydır, bu süre sonunda
                    kullanılmayan puanlar geçerliliğini yitirebilir
                  </li>
                </ul>
                <p className="text-light-muted">
                  Fiyatlandırma ve puan politikalarımızı önceden bildirmeksizin değiştirme hakkını
                  saklı tutarız. Ancak bu tür değişiklikler, halihazırda satın alınmış puanları
                  etkilemez.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <ShieldCheck className="h-7 w-7 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Kabul Edilebilir Kullanım ve Kısıtlamalar</h2>
              </div>
              <p className="text-light-muted mb-4">
                ZekiBot'u kullanırken, aşağıdaki kurallara uymanız gerekir:
              </p>
              <h3 className="text-xl font-semibold mb-3">Kabul Edilebilir Kullanım</h3>
              <ul className="list-disc pl-6 text-light-muted space-y-2 mb-4">
                <li>Platformu kişisel ve ticari amaçlarla kullanabilirsiniz</li>
                <li>Yapay zeka araçlarını yaratıcı ve verimli amaçlar için kullanabilirsiniz</li>
                <li>
                  Geliştirdiğiniz veya oluşturduğunuz içerikleri, kendi projelerinizde ticari
                  olmayan amaçlarla kullanabilirsiniz
                </li>
                <li>
                  Platform hakkında yapıcı geri bildirimde bulunabilir ve iyileştirme önerileri
                  sunabilirsiniz
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Kısıtlanan Kullanımlar</h3>
              <p className="text-light-muted mb-3">
                Aşağıdaki eylemleri gerçekleştirmemeniz gerekir:
              </p>
              <ul className="list-disc pl-6 text-light-muted space-y-2">
                <li>
                  Yasadışı, tehditkar, taciz edici, müstehcen, iftira niteliğinde içerik
                  oluşturmak veya paylaşmak
                </li>
                <li>Platformu zararlı yazılım yaymak için kullanmak</li>
                <li>Platformun normal işleyişini engellemek veya bozmak</li>
                <li>İzinsiz veri toplamak veya veri madenciliği yapmak</li>
                <li>Başkalarının fikri mülkiyet haklarını ihlal etmek</li>
                <li>Platformu kötüye kullanarak aşırı kaynak tüketimi yaratmak</li>
                <li>Yanlış bilgi yaymak veya zararlı içerik üretmek</li>
                <li>
                  Yapay zeka özelliklerini kitle imha silahları, yasa dışı uyuşturucu veya insan
                  haklarını ihlal eden amaçlar için kullanmak
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-7 w-7 text-secondary mr-3" />
                <h2 className="text-2xl font-bold">Sorumluluk Reddi ve Sınırlamalar</h2>
              </div>
              <div className="space-y-4">
                <p className="text-light-muted">
                  ZekiBot platformu "olduğu gibi" ve "mevcut haliyle" sunulmaktadır. Platformun
                  kullanımıyla ilgili tüm risk size aittir. Yürürlükteki yasaların izin verdiği
                  azami ölçüde:
                </p>
                <ul className="list-disc pl-6 text-light-muted space-y-2">
                  <li>
                    Platformun kesintisiz, hatasız veya güvenli olacağına dair hiçbir garanti
                    vermiyoruz
                  </li>
                  <li>
                    Yapay zeka tarafından üretilen içeriğin doğruluğu, kalitesi veya uygunluğu
                    konusunda hiçbir garanti vermiyoruz
                  </li>
                  <li>
                    Platformun kullanımından kaynaklanan veya bununla bağlantılı hiçbir dolaylı,
                    tesadüfi, özel veya sonuç olarak ortaya çıkan zararlardan sorumlu değiliz
                  </li>
                  <li>
                    Toplam sorumluluğumuz, son 12 ay içinde platforma ödediğiniz tutarı aşamaz
                  </li>
                </ul>
                <p className="text-light-muted">
                  Bazı yargı bölgeleri belirli garantilerin reddedilmesine veya sorumlulukların
                  sınırlandırılmasına izin vermez, bu nedenle yukarıdaki sınırlamalar sizin için
                  geçerli olmayabilir.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <RefreshCw className="h-7 w-7 text-accent mr-3" />
                <h2 className="text-2xl font-bold">Değişiklikler ve Fesih</h2>
              </div>
              <div className="space-y-4">
                <p className="text-light-muted">
                  Bu kullanım şartlarını herhangi bir zamanda değiştirme hakkını saklı tutarız.
                  Değişiklikler, platformumuzda yayınlandıktan sonra geçerli olacaktır. Önemli
                  değişiklikler için, kayıtlı kullanıcılarımıza e-posta yoluyla bildirimde
                  bulunacağız.
                </p>
                <p className="text-light-muted">
                  Değişikliklerden sonra platformu kullanmaya devam etmeniz, güncellenmiş şartları
                  kabul ettiğiniz anlamına gelir. Eğer yeni şartları kabul etmiyorsanız,
                  platformu kullanmayı bırakmalısınız.
                </p>
                <p className="text-light-muted">
                  Bu kullanım şartlarının herhangi bir hükmünün ihlali, hesabınızın askıya
                  alınmasına veya sonlandırılmasına neden olabilir.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">İletişim</h2>
              <p className="text-light-muted mb-4">
                Bu kullanım şartları hakkında sorularınız veya endişeleriniz varsa, lütfen
                aşağıdaki kanallardan bize ulaşın:
              </p>
              <div className="text-light-muted">
                <p>E-posta: legal@zekigpt.com.tr</p>
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