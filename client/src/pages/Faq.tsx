import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Search, MessageSquare, Image, Code, Coins, User, Lock, Globe, Zap, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Faq() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems = [
    {
      category: "Genel",
      icon: <HelpCircle className="h-5 w-5 text-primary" />,
      questions: [
        {
          question: "ZekiBot nedir?",
          answer:
            "ZekiBot, çeşitli yapay zeka özellikleri sunan çok amaçlı bir web platformudur. Platformumuz, yapay zeka sohbet, görsel oluşturma, kod yazma ve yapay zeka oyunları gibi özellikler içerir. Özellikle yaşlılar, çocuklar ve internet kullanımına yeni başlayanlar düşünülerek tasarlanmış kullanıcı dostu bir arayüz sunar.",
        },
        {
          question: "ZekiBot'u kimler kullanabilir?",
          answer:
            "ZekiBot, her yaştan ve teknik bilgi seviyesinden kullanıcılar için tasarlanmıştır. Özellikle yapay zeka teknolojilerine erişmek isteyen ancak teknik bilgisi sınırlı olan kişiler için idealdir. 13 yaş ve üzeri herkes platformumuzu kullanabilir.",
        },
        {
          question: "ZekiBot'u kullanmak için ücret ödemem gerekiyor mu?",
          answer:
            "ZekiBot, puan tabanlı bir sisteme sahiptir. Temel özelliklere ücretsiz erişebilirsiniz ve günlük giriş yaparak ücretsiz puanlar kazanabilirsiniz. Daha fazla puan satın alarak daha fazla özellik kullanabilirsiniz. Ayrıntılı fiyatlandırma bilgisi için web sitemizdeki 'Fiyatlandırma' sayfasını ziyaret edebilirsiniz.",
        },
      ],
    },
    {
      category: "Hesap ve Kullanım",
      icon: <User className="h-5 w-5 text-secondary" />,
      questions: [
        {
          question: "ZekiBot'a nasıl kayıt olabilirim?",
          answer:
            "Ana sayfamızdaki 'Kaydol' butonuna tıklayarak hesap oluşturabilirsiniz. Kayıt işlemi için e-posta adresiniz, bir kullanıcı adı ve şifre belirlemeniz yeterlidir. Ayrıca Google, Facebook veya Apple hesaplarınızla da hızlı kayıt olabilirsiniz.",
        },
        {
          question: "Şifremi unuttum, ne yapabilirim?",
          answer:
            "Giriş sayfasındaki 'Şifremi Unuttum' bağlantısına tıklayarak şifre sıfırlama işlemi başlatabilirsiniz. Kayıtlı e-posta adresinize şifre sıfırlama bağlantısı gönderilecektir. Bu bağlantıyı kullanarak yeni bir şifre belirleyebilirsiniz.",
        },
        {
          question: "Hesabımı nasıl silebilirim?",
          answer:
            "Hesabınızı silmek için, profil sayfanızdaki 'Hesap Ayarları' bölümüne gidin. Sayfanın en altında 'Hesabı Sil' seçeneğini bulabilirsiniz. Hesabınızı silmeden önce, tüm verilerinizin ve içeriklerinizin kalıcı olarak silineceğini unutmayın.",
        },
      ],
    },
    {
      category: "Yapay Zeka Sohbet",
      icon: <MessageSquare className="h-5 w-5 text-accent" />,
      questions: [
        {
          question: "Yapay zeka ile nasıl sohbet edebilirim?",
          answer:
            "Platformumuzda 'Sohbet' sayfasına giderek yapay zeka ile hemen sohbet etmeye başlayabilirsiniz. Metin kutusuna sorularınızı veya konuşmak istediğiniz konuları yazabilirsiniz. Yapay zeka, sorularınıza gerçek zamanlı olarak yanıt verecektir.",
        },
        {
          question: "Yapay zeka sohbetinde hangi konularda yardım alabilirim?",
          answer:
            "Yapay zeka sohbeti, genel sorular, bilgi araştırma, yaratıcı yazma, dil çevirisi, matematiksel hesaplamalar, eğitim konuları, seyahat tavsiyeleri, tarifler ve daha birçok konuda yardımcı olabilir. Ancak, yapay zekanın tıbbi, hukuki veya finansal konularda profesyonel tavsiye yerine geçmediğini unutmayın.",
        },
        {
          question: "Sohbet geçmişim kaydediliyor mu?",
          answer:
            "Evet, hesabınızla giriş yaptığınızda sohbet geçmişiniz kaydedilir ve daha sonra erişebilirsiniz. Bu, önceki konuşmalarınıza devam etmenizi veya onları referans olarak kullanmanızı sağlar. İsterseniz, sohbet geçmişini profil ayarlarınızdan temizleyebilirsiniz.",
        },
      ],
    },
    {
      category: "Görsel Oluşturma",
      icon: <Image className="h-5 w-5 text-primary" />,
      questions: [
        {
          question: "Yapay zeka ile nasıl görsel oluşturabilirim?",
          answer:
            "'Görsel Oluşturma' sayfasında, istediğiniz görseli açıklayan bir metin girerek yapay zeka tarafından görsel oluşturulmasını sağlayabilirsiniz. Ne kadar detaylı açıklama yaparsanız, istediğiniz sonuca o kadar yakın bir görsel elde edersiniz.",
        },
        {
          question: "Oluşturulan görselleri indirebilir miyim?",
          answer:
            "Evet, yapay zeka tarafından oluşturulan tüm görselleri indirebilirsiniz. Her görselin altında bir indirme butonu bulunmaktadır. İndirilen görseller kişisel ve ticari olmayan amaçlarla kullanılabilir.",
        },
        {
          question: "Oluşturulan görsellerin telif hakkı kime aittir?",
          answer:
            "ZekiBot platformunda oluşturulan görseller, kişisel kullanım için ücretsizdir. Ticari kullanım için lütfen kullanım şartlarımızı gözden geçirin veya bizimle iletişime geçin. Oluşturulan görseller, telif hakkı koruması altında olan içerikleri içermemeli veya taklit etmemelidir.",
        },
      ],
    },
    {
      category: "Kod Yazma",
      icon: <Code className="h-5 w-5 text-secondary" />,
      questions: [
        {
          question: "Kod yazma özelliği nasıl çalışır?",
          answer:
            "'Kod Yazma' sayfasında, ihtiyacınız olan kodu açıklayan bir istek girerek yapay zekanın kod oluşturmasını sağlayabilirsiniz. Hangi programlama dilinde kod istediğinizi belirtebilir ve spesifik gereksinimleri detaylandırabilirsiniz.",
        },
        {
          question: "Hangi programlama dillerinde kod oluşturabilirim?",
          answer:
            "Yapay zeka, JavaScript, Python, Java, C++, PHP, Ruby, Swift, Go, TypeScript ve daha birçok popüler programlama dilinde kod oluşturabilir. Ayrıca HTML, CSS, SQL gibi markup ve sorgu dilleri de desteklenmektedir.",
        },
        {
          question: "Oluşturulan kodlar hatasız mıdır?",
          answer:
            "Yapay zeka, doğru ve çalışan kod oluşturmaya çalışır, ancak her zaman hatasız kod garantisi veremeyiz. Kodların kendi ortamınızda test edilmesi ve gerektiğinde düzeltilmesi önerilir. Ayrıca, kod oluşturma sürecinde hatalar veya iyileştirmeler hakkında geri bildirim sağlayabilirsiniz.",
        },
      ],
    },
    {
      category: "Puan Sistemi",
      icon: <Coins className="h-5 w-5 text-accent" />,
      questions: [
        {
          question: "Puan sistemi nasıl çalışır?",
          answer:
            "ZekiBot'ta yapay zeka özelliklerini kullanmak için puanlara ihtiyacınız vardır. Her özellik kullanımı belirli bir puan miktarı gerektirir. Puanları günlük giriş bonuslarıyla kazanabilir veya satın alabilirsiniz.",
        },
        {
          question: "Ücretsiz puanları nasıl kazanabilirim?",
          answer:
            "Her gün platforma giriş yaparak günlük bonus puanlar kazanabilirsiniz. Ayrıca, arkadaşlarınızı platforma davet ederek, anketleri yanıtlayarak veya özel promosyonlara katılarak da bonus puanlar kazanabilirsiniz.",
        },
        {
          question: "Puanlar ne kadar süre geçerlidir?",
          answer:
            "Ücretsiz kazanılan puanlar 30 gün boyunca geçerlidir. Satın alınan puanlar ise satın alma tarihinden itibaren 12 ay boyunca geçerlidir. Süresi dolan puanlar otomatik olarak hesabınızdan silinir.",
        },
      ],
    },
    {
      category: "Gizlilik ve Güvenlik",
      icon: <Lock className="h-5 w-5 text-primary" />,
      questions: [
        {
          question: "Verilerim nasıl korunuyor?",
          answer:
            "Kullanıcı verileriniz, endüstri standardı güvenlik protokolleri ve şifreleme teknikleri kullanılarak korunmaktadır. Gizlilik politikamız, hangi bilgileri topladığımızı, nasıl kullandığımızı ve nasıl koruduğumuzu detaylı olarak açıklar.",
        },
        {
          question: "Çocuklar için platformunuz güvenli mi?",
          answer:
            "Evet, platformumuz çocuklar için güvenli bir ortam sağlamak üzere tasarlanmıştır. İçerik filtreleme sistemlerimiz, uygunsuz içerikleri engellemek için çalışır. 13 yaşından küçük çocuklar için ebeveyn gözetimi öneriyoruz ve ebeveyn kontrol özellikleri sunuyoruz.",
        },
        {
          question: "Yapay zeka sohbetlerim ve oluşturduğum içerikler başkalarıyla paylaşılıyor mu?",
          answer:
            "Hayır, sohbetleriniz ve oluşturduğunuz içerikler özeldir ve hesabınızla ilişkilendirilir. Bu içerikler, sizin açıkça izin verdiğiniz durumlar dışında başkalarıyla paylaşılmaz. Ancak, yapay zeka modellerinin iyileştirilmesi için anonimleştirilmiş veriler kullanılabilir.",
        },
      ],
    },
    {
      category: "Teknik Destek",
      icon: <Globe className="h-5 w-5 text-secondary" />,
      questions: [
        {
          question: "Teknik bir sorun yaşıyorum, nasıl yardım alabilirim?",
          answer:
            "Teknik sorunlar için destek@zekigpt.com.tr adresine e-posta gönderebilir veya platformdaki 'Yardım' bölümünden destek talebi oluşturabilirsiniz. Ekibimiz en kısa sürede size yardımcı olacaktır.",
        },
        {
          question: "Platform hangi tarayıcılarda çalışır?",
          answer:
            "ZekiBot, Google Chrome, Mozilla Firefox, Safari, Microsoft Edge ve Opera gibi modern web tarayıcılarının güncel sürümlerinde sorunsuz çalışacak şekilde tasarlanmıştır. En iyi deneyim için tarayıcınızı güncel tutmanızı öneririz.",
        },
        {
          question: "Mobil uygulama var mı?",
          answer:
            "Şu anda ZekiBot'un resmi bir mobil uygulaması bulunmamaktadır, ancak web sitemiz mobil cihazlar için tamamen optimize edilmiştir. Mobil web tarayıcınız üzerinden platforma erişebilir ve tüm özellikleri kullanabilirsiniz. Mobil uygulama geliştirme çalışmalarımız devam etmektedir.",
        },
      ],
    },
    {
      category: "Özellikler ve İyileştirmeler",
      icon: <Zap className="h-5 w-5 text-accent" />,
      questions: [
        {
          question: "Yeni özellikler ne zaman ekleniyor?",
          answer:
            "Platformumuza düzenli olarak yeni özellikler ekliyoruz. Güncellemeler hakkında bilgilendirilmek için, platformumuzdaki 'Duyurular' bölümünü takip edebilir veya e-posta bildirimlerini açabilirsiniz.",
        },
        {
          question: "Bir özellik önerim var, nasıl iletebilirim?",
          answer:
            "Önerileriniz bizim için çok değerli! Özellik önerilerinizi iletmek için 'Geri Bildirim' sayfasını kullanabilir veya feedback@zekigpt.com.tr adresine e-posta gönderebilirsiniz. Tüm öneriler ekibimiz tarafından değerlendirilecektir.",
        },
        {
          question: "Bir hata buldum, nasıl bildirebilirim?",
          answer:
            "Platformda bulduğunuz hataları bildirmek için 'Geri Bildirim' sayfasını kullanabilir veya bugs@zekigpt.com.tr adresine e-posta gönderebilirsiniz. Hatayı mümkün olduğunca detaylı açıklamanız, sorunu daha hızlı çözmemize yardımcı olacaktır.",
        },
      ],
    },
  ];

  const filteredFaq = faqItems.map((category) => {
    const filteredQuestions = category.questions.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...category,
      questions: filteredQuestions,
    };
  }).filter((category) => category.questions.length > 0);

  return (
    <>
      <Helmet>
        <title>Sıkça Sorulan Sorular - ZekiBot</title>
        <meta
          name="description"
          content="ZekiBot hakkında sıkça sorulan sorular ve cevaplar. Platformumuzun özellikleri, kullanımı ve daha fazlası hakkında bilgi edinin."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-poppins font-bold mb-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Sıkça Sorulan Sorular
            </h1>
            <p className="text-light-muted text-lg max-w-2xl mx-auto mb-8">
              ZekiBot hakkında en çok sorulan soruları ve cevaplarını burada bulabilirsiniz. Hala sorunuz varsa, lütfen bizimle iletişime geçin.
            </p>

            <div className="flex max-w-md mx-auto relative">
              <Input
                type="text"
                placeholder="Soru veya anahtar kelime ara..."
                className="pr-10 bg-dark-lighter border-dark-lighter focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-light-muted" />
            </div>
          </div>

          {filteredFaq.length > 0 ? (
            <div className="space-y-8">
              {filteredFaq.map((category, idx) => (
                <div key={idx}>
                  <div className="flex items-center mb-4">
                    {category.icon}
                    <h2 className="text-2xl font-bold ml-2">{category.category}</h2>
                  </div>

                  <Card className="bg-dark-surface border-dark-lighter">
                    <CardContent className="p-6">
                      <Accordion type="single" collapsible className="space-y-2">
                        {category.questions.map((item, index) => (
                          <AccordionItem
                            key={index}
                            value={`${category.category}-${index}`}
                            className="border-b border-dark-lighter last:border-b-0"
                          >
                            <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-light-muted py-3">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <HelpCircle className="h-12 w-12 mx-auto text-light-muted mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sonuç bulunamadı</h3>
              <p className="text-light-muted mb-6">
                Aramanızla eşleşen bir soru bulunamadı. Lütfen farklı anahtar kelimelerle tekrar deneyin veya doğrudan bize sorun.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                İletişime Geç
              </Button>
            </div>
          )}

          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">Hala sorunuz mu var?</h3>
            <p className="text-light-muted mb-6">
              Burada cevabını bulamadığınız sorular için bizimle doğrudan iletişime geçebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <MessageSquare className="h-4 w-4 mr-2" />
                Destek Talebi Oluştur
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Mail className="h-4 w-4 mr-2" />
                E-posta Gönder
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}