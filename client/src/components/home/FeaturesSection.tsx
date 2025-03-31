import { Link } from "wouter";
import { MessageSquare, Image, Gamepad, Code, Shield, Coins } from "lucide-react";

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
          <div className="bg-dark-surface rounded-xl p-6 border border-dark-lighter hover:border-primary transition-colors duration-300">
            <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="text-primary text-2xl" />
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
                <i className="fas fa-check text-accent mt-1 mr-2"></i>
                <span className="text-light-muted">
                  Metin tabanlı interaktif sohbet
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-accent mt-1 mr-2"></i>
                <span className="text-light-muted">
                  Detaylı ve kapsamlı yanıtlar
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-accent mt-1 mr-2"></i>
                <span className="text-light-muted">
                  Birden çok konuda destek
                </span>
              </li>
            </ul>
            <Link href="/sohbet">
              <span className="inline-flex items-center text-primary hover:underline cursor-pointer">
                Hemen Dene <i className="fas fa-arrow-right ml-1"></i>
              </span>
            </Link>
          </div>

          {/* Feature 2: Visual Creation */}
          <div className="bg-dark-surface rounded-xl p-6 border border-dark-lighter hover:border-secondary transition-colors duration-300">
            <div className="w-14 h-14 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Image className="text-secondary text-2xl" />
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
                alt="AI Generated Mountain"
                className="rounded-lg w-full h-24 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1679483391596-e1958b212f29?q=80&w=200&auto=format&fit=crop"
                alt="AI Generated Abstract"
                className="rounded-lg w-full h-24 object-cover"
              />
            </div>
            <Link href="/gorsel-olusturma">
              <span className="inline-flex items-center text-secondary hover:underline cursor-pointer">
                Görsel Oluştur <i className="fas fa-arrow-right ml-1"></i>
              </span>
            </Link>
          </div>

          {/* Feature 3: AI Games */}
          <div className="bg-dark-surface rounded-xl p-6 border border-dark-lighter hover:border-accent transition-colors duration-300">
            <div className="w-14 h-14 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Gamepad className="text-accent text-2xl" />
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
            <Link href="/oyunlar">
              <span className="inline-flex items-center text-accent hover:underline cursor-pointer">
                Oyunlara Göz At <i className="fas fa-arrow-right ml-1"></i>
              </span>
            </Link>
          </div>

          {/* Feature 4: Code Writing */}
          <div className="bg-dark-surface rounded-xl p-6 border border-dark-lighter hover:border-primary transition-colors duration-300">
            <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Code className="text-primary text-2xl" />
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
            <Link href="/kod-yazma">
              <span className="inline-flex items-center text-primary hover:underline cursor-pointer">
                Kodlamaya Başla <i className="fas fa-arrow-right ml-1"></i>
              </span>
            </Link>
          </div>

          {/* Feature 5: User-friendly Interface */}
          <div className="bg-dark-surface rounded-xl p-6 border border-dark-lighter hover:border-secondary transition-colors duration-300">
            <div className="w-14 h-14 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Shield className="text-secondary text-2xl" />
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
                <i className="fas fa-mouse-pointer text-light-muted text-xl mb-2"></i>
                <span className="text-light-muted text-sm">Kolay Kullanım</span>
              </div>
              <div className="flex flex-col items-center">
                <i className="fas fa-mobile-alt text-light-muted text-xl mb-2"></i>
                <span className="text-light-muted text-sm">Mobil Uyumlu</span>
              </div>
              <div className="flex flex-col items-center">
                <i className="fas fa-universal-access text-light-muted text-xl mb-2"></i>
                <span className="text-light-muted text-sm">Erişilebilir</span>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center text-secondary hover:underline"
            >
              Daha Fazla Bilgi <i className="fas fa-arrow-right ml-1"></i>
            </a>
          </div>

          {/* Feature 6: Points System */}
          <div className="bg-dark-surface rounded-xl p-6 border border-dark-lighter hover:border-accent transition-colors duration-300">
            <div className="w-14 h-14 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Coins className="text-accent text-2xl" />
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
            <a
              href="#"
              className="inline-flex items-center text-accent hover:underline"
            >
              Puan Kazan <i className="fas fa-arrow-right ml-1"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
