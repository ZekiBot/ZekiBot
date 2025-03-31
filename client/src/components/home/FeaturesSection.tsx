import { Link } from "wouter";
import { 
  MessageSquare, 
  Image, 
  Gamepad, 
  Code, 
  Shield, 
  Coins,
  MoveRight,
  Smartphone,
  Accessibility,
  MousePointer,
  CheckCircle,
  Layout,
  UserCheck
} from "lucide-react";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            ZekiBot'un{" "}
            <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Özellikleri
            </span>
          </h2>
          <p className="text-light-muted max-w-2xl mx-auto">
            Yapay zeka destekli araçlarımızla yaratıcılığınızı keşfedin ve
            verimliliğinizi artırın.
          </p>
        </div>

        {/* Features Grid - 3-column layout as requested */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: AI Chat */}
          <Link href="/sohbet">
            <div className="bg-dark-surface rounded-xl p-6 border border-dark-lighter hover:border-primary transition-colors duration-300 cursor-pointer">
            <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="text-primary h-8 w-8" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">
              Yapay Zeka Sohbet
            </h3>
            <p className="text-light-muted mb-4">
              Gelişmiş yapay zeka modellerimizle sohbet edin, sorular sorun ve
              anında yanıtlar alın.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-accent mt-1 mr-2" />
                <span className="text-light-muted">
                  Metin tabanlı interaktif sohbet
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-accent mt-1 mr-2" />
                <span className="text-light-muted">
                  Detaylı ve kapsamlı yanıtlar
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-accent mt-1 mr-2" />
                <span className="text-light-muted">
                  Birden çok konuda destek
                </span>
              </li>
            </ul>
            <span className="inline-flex items-center text-primary mt-4 hover:underline cursor-pointer">
              Hemen Dene <MoveRight className="h-4 w-4 ml-1 inline" />
            </span>
          </div>
          </Link>

          {/* Feature 2: Visual Creation */}
          <Link href="/gorsel-olusturma">
          <div className="bg-dark-surface rounded-xl p-6 border border-dark-lighter hover:border-secondary transition-colors duration-300 cursor-pointer">
            <div className="w-14 h-14 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Image className="text-secondary h-8 w-8" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">
              Görsel Oluşturma
            </h3>
            <p className="text-light-muted mb-4">
              Metinlerinizden harika görseller oluşturun, yaratıcı fikirlerinizi
              gerçeğe dönüştürün.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <img
                src="https://images.unsplash.com/photo-1633536726481-516ad237def1?q=80&w=200&auto=format&fit=crop"
                alt="Dağ Manzarası"
                className="rounded-lg w-full h-24 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1679483391596-e1958b212f29?q=80&w=200&auto=format&fit=crop"
                alt="Soyut Sanat"
                className="rounded-lg w-full h-24 object-cover"
              />
            </div>
            <span className="inline-flex items-center text-secondary mt-4 hover:underline cursor-pointer">
              Görsel Oluştur <MoveRight className="h-4 w-4 ml-1 inline" />
            </span>
          </div>
          </Link>

          {/* Feature 3: AI Games */}
          <Link href="/oyunlar">
          <div className="bg-dark-surface rounded-xl p-6 border border-dark-lighter hover:border-accent transition-colors duration-300 cursor-pointer">
            <div className="w-14 h-14 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Gamepad className="text-accent h-8 w-8" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">
              Yapay Zeka Oyunları
            </h3>
            <p className="text-light-muted mb-4">
              Eğlenceli mini oyunlar ile hem keyifli vakit geçirin hem de yapay
              zekanın yeteneklerini test edin.
            </p>
            <div className="bg-dark-lighter rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-light">Kelime Bulmaca</span>
                <span className="text-accent">10 Puan</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-light">Hafıza Oyunu</span>
                <span className="text-accent">15 Puan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-light">Zeka Soruları</span>
                <span className="text-accent">20 Puan</span>
              </div>
            </div>
            <span className="inline-flex items-center text-accent mt-4 hover:underline cursor-pointer">
              Oyunlara Göz At <MoveRight className="h-4 w-4 ml-1 inline" />
            </span>
          </div>
          </Link>

          {/* Feature 4: Code Writing */}
          <Link href="/kod-yazma">
          <div className="bg-dark-surface rounded-xl p-6 border border-dark-lighter hover:border-primary transition-colors duration-300 cursor-pointer">
            <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Code className="text-primary h-8 w-8" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">
              Kod Yazma
            </h3>
            <p className="text-light-muted mb-4">
              Yapay zeka destekli kod yazma ve hata ayıklama araçlarıyla
              programlama deneyiminizi geliştirin.
            </p>
            <div className="bg-dark-lighter rounded-lg p-3 mb-6 overflow-x-auto">
              <pre className="text-light-muted text-sm">
                <code>
                  <span className="text-primary">function</span>{" "}
                  <span className="text-secondary">selamVer</span>() {"{"}
                  <br />
                  {"  "}
                  <span className="text-accent">console</span>.log(
                  <span className="text-green-400">"Merhaba Dünya!"</span>);
                  <br />
                  {"  "}
                  <span className="text-accent">return</span>{" "}
                  <span className="text-green-400">"ZekiBot ile kodlama"</span>;
                  <br />
                  {"}"}
                </code>
              </pre>
            </div>
            <span className="inline-flex items-center text-primary mt-4 hover:underline cursor-pointer">
              Kodlamaya Başla <MoveRight className="h-4 w-4 ml-1 inline" />
            </span>
          </div>
          </Link>

          {/* Feature 5: User-friendly Interface */}
          <Link href="#">
          <div className="bg-dark-surface rounded-xl p-6 border border-dark-lighter hover:border-secondary transition-colors duration-300 cursor-pointer">
            <div className="w-14 h-14 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Layout className="text-secondary h-8 w-8" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">
              Kullanıcı Dostu Arayüz
            </h3>
            <p className="text-light-muted mb-4">
              Her yaştan ve her seviyeden kullanıcı için tasarlanmış kolay
              kullanılabilir arayüz.
            </p>
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col items-center">
                <div className="bg-secondary bg-opacity-10 p-2 rounded-full mb-2">
                  <MousePointer className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-light-muted text-sm">Kolay Kullanım</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-secondary bg-opacity-10 p-2 rounded-full mb-2">
                  <Smartphone className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-light-muted text-sm">Mobil Uyumlu</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-secondary bg-opacity-10 p-2 rounded-full mb-2">
                  <Accessibility className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-light-muted text-sm">Erişilebilir</span>
              </div>
            </div>
            <span className="inline-flex items-center text-secondary mt-4 hover:underline cursor-pointer">
              Daha Fazla Bilgi <MoveRight className="h-4 w-4 ml-1 inline" />
            </span>
          </div>
          </Link>

          {/* Feature 6: Points System */}
          <Link href="#">
          <div className="bg-dark-surface rounded-xl p-6 border border-dark-lighter hover:border-accent transition-colors duration-300 cursor-pointer">
            <div className="w-14 h-14 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Coins className="text-accent h-8 w-8" />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">
              Puan Sistemi
            </h3>
            <p className="text-light-muted mb-4">
              Puanlar kazanın ve bu puanlarla premium özelliklere erişim
              sağlayın.
            </p>
            <div className="bg-dark-lighter rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-light">Günlük Giriş</span>
                <span className="text-accent">+5 Puan</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-light">Resim Oluşturma</span>
                <span className="text-red-400">-10 Puan</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-light">Arkadaş Davet Et</span>
                <span className="text-accent">+20 Puan</span>
              </div>
            </div>
            <span className="inline-flex items-center text-accent mt-4 hover:underline cursor-pointer">
              Puan Kazan <MoveRight className="h-4 w-4 ml-1 inline" />
            </span>
          </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
