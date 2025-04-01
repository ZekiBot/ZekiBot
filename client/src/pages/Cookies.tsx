import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Info, Settings, Shield, RefreshCw } from "lucide-react";

export default function Cookies() {
  return (
    <>
      <Helmet>
        <title>Çerez Politikası - ZekiBot</title>
        <meta
          name="description"
          content="ZekiBot çerez politikası. Web sitemizde çerezleri nasıl kullandığımızı öğrenin."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-poppins font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Çerez Politikası
            </h1>
            <p className="text-light-muted text-lg max-w-2xl mx-auto">
              Bu çerez politikası, web sitemizde çerezleri nasıl kullandığımızı açıklar ve size çerez tercihlerinizi yönetme seçenekleri sunar.
            </p>
            <p className="text-light-muted mt-2">
              Son güncelleme: 01 Nisan 2024
            </p>
          </div>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Cookie className="h-7 w-7 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Çerezler Hakkında</h2>
              </div>
              <p className="text-light-muted mb-4">
                Çerezler, bir web sitesini ziyaret ettiğinizde cihazınıza (bilgisayar, tablet veya telefon) yerleştirilen küçük metin dosyalarıdır. Çerezler, web sitesinin bazı işlevlerini gerçekleştirmesi veya deneyiminizi iyileştirmesi için yaygın olarak kullanılır.
              </p>
              <p className="text-light-muted">
                Çerezler, sizi kişisel olarak tanımlamaz, ancak cihazınız ve tarayıcı geçmişiniz hakkında bilgi saklayabilir. Bu bilgiler, genellikle siteye bir sonraki ziyaretinizde sizi tanımak, oturum durumunuzu korumak veya site analitiği yapmak için kullanılır.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Info className="h-7 w-7 text-secondary mr-3" />
                <h2 className="text-2xl font-bold">Kullandığımız Çerez Türleri</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Temel Çerezler</h3>
                  <p className="text-light-muted mb-3">
                    Bu çerezler, web sitemizin temel işlevleri için gereklidir. Bunlar olmadan web sitemiz düzgün çalışamaz. Bu çerezler, aşağıdaki amaçlar için kullanılır:
                  </p>
                  <ul className="list-disc pl-6 text-light-muted space-y-2">
                    <li>Oturum durumunuzu korumak, böylece her sayfayı ziyaret ettiğinizde giriş yapmanız gerekmez</li>
                    <li>Güvenlik kontrollerini gerçekleştirmek</li>
                    <li>Alışveriş sepetinizi ve ödeme bilgilerinizi hatırlamak</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Performans ve Analitik Çerezleri</h3>
                  <p className="text-light-muted mb-3">
                    Bu çerezler, web sitemizin nasıl kullanıldığı hakkında bilgi toplar. Bu bilgiler, sitemizi iyileştirmemize ve kullanıcı deneyimini artırmamıza yardımcı olur. Bu çerezler:
                  </p>
                  <ul className="list-disc pl-6 text-light-muted space-y-2">
                    <li>Web sitemizdeki ziyaretçi sayısını izler</li>
                    <li>Kullanıcıların hangi sayfaları ziyaret ettiğini ve ne kadar süre kaldığını takip eder</li>
                    <li>Web sitemizde nasıl gezindiğinizi anlar</li>
                    <li>Hataları tespit etmemize ve sorunları çözmemize yardımcı olur</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">İşlevsellik Çerezleri</h3>
                  <p className="text-light-muted mb-3">
                    Bu çerezler, web sitemizde daha kişiselleştirilmiş bir deneyim sunmamıza olanak tanır. Bu çerezler:
                  </p>
                  <ul className="list-disc pl-6 text-light-muted space-y-2">
                    <li>Dil tercihlerinizi hatırlar</li>
                    <li>Tema ve görünüm ayarlarınızı kaydeder</li>
                    <li>Daha önce ziyaret ettiğiniz sayfaları ve etkileşimlerinizi hatırlar</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Hedefleme / Reklam Çerezleri</h3>
                  <p className="text-light-muted mb-3">
                    Bu çerezler, size ve ilgi alanlarınıza özel reklamlar sunmak için kullanılır. Ayrıca, reklamlarımızın etkinliğini ölçmemize yardımcı olur. Bu çerezler:
                  </p>
                  <ul className="list-disc pl-6 text-light-muted space-y-2">
                    <li>İlgi alanlarınıza göre profilinizi oluşturur</li>
                    <li>Reklam kampanyalarımızın performansını ölçer</li>
                    <li>Reklamları göreceğiniz sıklığı sınırlar</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Settings className="h-7 w-7 text-accent mr-3" />
                <h2 className="text-2xl font-bold">Çerez Tercihlerinizi Yönetme</h2>
              </div>
              <p className="text-light-muted mb-4">
                Çoğu web tarayıcısı, çerezleri kabul etmek, reddetmek ve silmek için çeşitli seçenekler sunar. Çerez tercihlerinizi yönetmek için tarayıcınızın ayarlarını düzenleyebilirsiniz. Lütfen çerezleri tamamen devre dışı bırakmanın, web sitemizin bazı özelliklerinin düzgün çalışmasını engelleyebileceğini unutmayın.
              </p>
              <p className="text-light-muted mb-4">
                Tarayıcınızda çerezleri yönetme hakkında daha fazla bilgi edinmek için tarayıcınızın yardım bölümüne bakabilirsiniz:
              </p>
              <ul className="list-disc pl-6 text-light-muted space-y-2">
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Safari
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Microsoft Edge
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Opera
                  </a>
                </li>
              </ul>
              <p className="text-light-muted mt-4">
                Ayrıca, çoğu reklam ağı, ilgi alanlarınıza dayalı reklamcılığı devre dışı bırakmanıza olanak tanır. Daha fazla bilgi için 
                <a href="#" className="text-primary hover:underline mx-1">
                  www.youronlinechoices.eu
                </a>
                veya
                <a href="#" className="text-primary hover:underline mx-1">
                  www.aboutads.info/choices/
                </a>
                adreslerini ziyaret edebilirsiniz.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Shield className="h-7 w-7 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Üçüncü Taraf Çerezleri</h2>
              </div>
              <p className="text-light-muted mb-4">
                Web sitemizde üçüncü taraf hizmetlerden gelen çerezler de kullanıyoruz. Bu hizmetler, web sitemizin performansını ve işlevselliğini artırmak için kullanılır. Kullandığımız üçüncü taraf çerezleri şunlardır:
              </p>
              <ul className="list-disc pl-6 text-light-muted space-y-3">
                <li>
                  <span className="font-medium">Google Analytics:</span> Web sitemizin trafiğini analiz etmek için kullanılır. Google'ın topladığı bilgiler ve bu bilgilerin nasıl kullanıldığı hakkında daha fazla bilgi için 
                  <a href="#" className="text-primary hover:underline mx-1">
                    Google Gizlilik Politikası
                  </a>
                  sayfasını ziyaret edebilirsiniz.
                </li>
                <li>
                  <span className="font-medium">Facebook Pixel:</span> Reklam kampanyalarımızın etkinliğini ölçmek ve hedefli reklamlar sunmak için kullanılır. Daha fazla bilgi için 
                  <a href="#" className="text-primary hover:underline mx-1">
                    Facebook Gizlilik Politikası
                  </a>
                  sayfasını ziyaret edebilirsiniz.
                </li>
                <li>
                  <span className="font-medium">Hotjar:</span> Kullanıcı deneyimini iyileştirmek için kullanıcı davranışlarını analiz etmek amacıyla kullanılır. Daha fazla bilgi için 
                  <a href="#" className="text-primary hover:underline mx-1">
                    Hotjar Gizlilik Politikası
                  </a>
                  sayfasını ziyaret edebilirsiniz.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter mb-8">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <RefreshCw className="h-7 w-7 text-secondary mr-3" />
                <h2 className="text-2xl font-bold">Politika Değişiklikleri</h2>
              </div>
              <p className="text-light-muted">
                Bu çerez politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda, güncellenmiş politikayı web sitemizde yayınlayacak ve uygun gördüğümüzde size bildirimde bulunacağız. Düzenli olarak politikamızı gözden geçirmenizi öneririz. Bu politikanın en son ne zaman güncellendiğini sayfanın başındaki "Son güncelleme" tarihinden kontrol edebilirsiniz.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-dark-surface border-dark-lighter">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">İletişim</h2>
              <p className="text-light-muted mb-4">
                Bu çerez politikası hakkında sorularınız veya endişeleriniz varsa, lütfen aşağıdaki kanallardan bize ulaşın:
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