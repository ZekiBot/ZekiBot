import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Shield, Info, Check } from "lucide-react";

export default function Copyright() {
  return (
    <>
      <Helmet>
        <title>Telif Hakkı Politikası - ZekiBot</title>
        <meta
          name="description"
          content="ZekiBot telif hakkı politikası. Platformumuzda yer alan içeriklerin telif hakları ve kullanım koşulları hakkında bilgi edinin."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-poppins font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Telif Hakkı Politikası
            </h1>
            <p className="text-light-muted text-lg max-w-2xl mx-auto">
              ZekiBot platformundaki içeriklerin telif hakları ve fikri mülkiyet haklarına ilişkin bilgiler.
            </p>
          </div>

          <div className="space-y-8">
            <Card className="bg-dark-surface border-dark-lighter">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-primary mr-2" />
                  <h2 className="text-2xl font-bold">Genel Telif Hakkı Politikası</h2>
                </div>
                <div className="space-y-4 text-light-muted">
                  <p>
                    ZekiBot platformunda yer alan tüm içerikler, aksi belirtilmedikçe, ZekiBot'a aittir ve telif hakkı yasaları ile korunmaktadır. Bu içerikler; metin, grafik, logo, ikon, resim, ses klipleri, dijital indirmeler, veri derlemeleri ve yazılımları kapsamaktadır.
                  </p>
                  <p>
                    ZekiBot platformunu ziyaret eden ve kullanan kişiler, burada yer alan içerikleri, ZekiBot'un önceden yazılı izni olmaksızın kopyalayamaz, değiştiremez, dağıtamaz, sergileyemez, çoğaltamaz, yayınlayamaz, deşifre edemez, satamaz veya bu içeriklerden türev eserler oluşturamaz.
                  </p>
                  <p>
                    Platform üzerinde görüntülenen bazı içerikler, üçüncü taraf lisansları altında kullanılıyor olabilir. Bu tür içerikler, ilgili lisans şartlarına tabidir ve bu şartlar doğrultusunda kullanılmalıdır.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-surface border-dark-lighter">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-secondary mr-2" />
                  <h2 className="text-2xl font-bold">Kullanıcı Tarafından Oluşturulan İçerik</h2>
                </div>
                <div className="space-y-4 text-light-muted">
                  <p>
                    ZekiBot, kullanıcılar tarafından oluşturulan içeriklerin telif haklarını ihlal etmemeye özen gösterir. Kullanıcılarımızın, platformumuzu kullanarak oluşturdukları içerikler (metinler, görüntüler, kodlar vb.) üzerinde telif hakları kendilerine aittir.
                  </p>
                  <p>
                    Ancak, ZekiBot'a içerik göndererek veya yükleyerek, kullanıcılar ZekiBot'a söz konusu içeriği herhangi bir coğrafi sınırlama olmaksızın, herhangi bir ortamda kullanma, çoğaltma, değiştirme, uyarlama, yayınlama, tercüme etme, dağıtma, sergileme ve bunlardan türev eserler oluşturma hakkı tanımış sayılırlar. Bu lisans, kullanıcının ZekiBot'u kullanmayı bırakması durumunda sona erer.
                  </p>
                  <p>
                    Kullanıcılar, telif hakkı kendilerine ait olmayan veya kullanım hakkına sahip olmadıkları içerikleri ZekiBot platformuna yüklememelidir. Telif hakkı ihlali içeren içerikler, ihbar üzerine platformdan kaldırılacaktır.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-surface border-dark-lighter">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Info className="h-6 w-6 text-accent mr-2" />
                  <h2 className="text-2xl font-bold">AI Tarafından Oluşturulan İçerik</h2>
                </div>
                <div className="space-y-4 text-light-muted">
                  <p>
                    ZekiBot platformunda yapay zeka (AI) tarafından oluşturulan içerikler (metinler, görüntüler, kodlar vb.) ile ilgili telif hakkı konusu, uluslararası telif hakkı yasalarında henüz tam olarak netleşmemiş olsa da, ZekiBot aşağıdaki politikayı benimsemektedir:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Kullanıcılarımız, ZekiBot'un AI özellikleriyle oluşturdukları içerikleri kişisel ve ticari olmayan amaçlarla kullanabilirler.
                    </li>
                    <li>
                      Ticari kullanım için, kullanıcıların ZekiBot ile iletişime geçmesi ve uygun lisanslama seçeneklerini görüşmesi gerekmektedir.
                    </li>
                    <li>
                      AI tarafından oluşturulan içerikler, telif hakkı koruması altında olan üçüncü taraf içeriklerinin doğrudan kopyası veya taklidi olmamalıdır.
                    </li>
                    <li>
                      ZekiBot, AI tarafından oluşturulan içeriklerin orijinalliğini veya benzersizliğini garanti etmez ve bu içeriklerin kullanımından doğabilecek telif hakkı ihlallerinden sorumlu tutulamaz.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-surface border-dark-lighter">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Check className="h-6 w-6 text-primary mr-2" />
                  <h2 className="text-2xl font-bold">Telif Hakkı İhlal Bildirimleri</h2>
                </div>
                <div className="space-y-4 text-light-muted">
                  <p>
                    ZekiBot, telif hakkı yasalarına saygı gösterir ve telif hakkı sahiplerinin haklarını korumayı amaçlar. Platformumuzda yer alan herhangi bir içeriğin telif haklarınızı ihlal ettiğini düşünüyorsanız, lütfen aşağıdaki bilgileri içeren bir bildirim gönderin:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Telif hakkı sahibi adına hareket etmeye yetkili kişinin elektronik veya fiziksel imzası</li>
                    <li>İhlal edildiği iddia edilen telif hakkı korumalı çalışmanın tanımı</li>
                    <li>İhlal ettiği iddia edilen materyalin platformumuzdaki konumu</li>
                    <li>Adresiniz, telefon numaranız ve e-posta adresiniz</li>
                    <li>Şikâyet konusu kullanımın telif hakkı sahibi, temsilcisi veya yasa tarafından yetkilendirilmediğine dair iyi niyetli bir beyan</li>
                    <li>Bildiriminizdeki bilgilerin doğru olduğuna ve telif hakkı sahibi veya telif hakkı sahibi adına hareket etmeye yetkili kişi olduğunuza dair, yalan beyanda bulunmanın cezai sorumluluğu altında, bir beyan</li>
                  </ul>
                  <p>
                    Telif hakkı ihlal bildirimleri, <strong>copyright@zekigpt.com.tr</strong> adresine gönderilebilir. Bildiriminizi aldıktan sonra, iddia edilen ihlali inceleyecek ve gerekli görüldüğü takdirde ilgili içeriği kaldıracak veya erişimi engelleyeceğiz.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 text-light-muted">
            <p>
              Son Güncelleme: 1 Nisan 2024
            </p>
            <p className="mt-2">
              Not: Bu telif hakkı politikası, önceden bildirimde bulunmaksızın değiştirilebilir. Değişiklikler yapıldığında, güncellenmiş politikayı bu sayfada yayınlayacağız.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}