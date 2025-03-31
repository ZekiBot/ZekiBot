import { useState } from "react";
import { Link } from "wouter";
import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";
// import { useAuth } from "@/hooks/useAuth";
import { SendHorizontal } from "lucide-react";

const HeroSection = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  // Mock for development - remove in production
  const isAuthenticated = false;

  const handleFreeStart = () => {
    if (isAuthenticated) {
      return;
    }
    setIsRegisterModalOpen(true);
  };

  return (
    <>
      <section className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-b from-dark to-dark-surface">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  Yapay Zeka
                </span>{" "}
                ile Yeni Bir Dünya Keşfedin
              </h1>
              <p className="text-light-muted text-lg mb-8 max-w-lg mx-auto md:mx-0">
                ZekiBot ile sohbet edin, görsel oluşturun, oyun oynayın ve kod
                yazın. Herkes için kolay kullanımlı yapay zeka platformu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="#features">
                  <span className="bg-primary hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-lg text-center transition-colors inline-block cursor-pointer">
                    Keşfet
                  </span>
                </Link>
                <button
                  onClick={handleFreeStart}
                  className="bg-transparent border border-primary text-primary hover:bg-primary hover:bg-opacity-10 font-medium px-6 py-3 rounded-lg text-center transition-colors"
                >
                  Ücretsiz Başla
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-dark-surface rounded-2xl shadow-xl overflow-hidden border border-dark-lighter">
                <div className="p-4 bg-dark-lighter flex items-center border-b border-dark-lighter">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-light-muted text-sm">
                    ZekiBot Chat
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {/* Chat bubbles */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                      <i className="fas fa-robot text-sm"></i>
                    </div>
                    <div className="bg-dark-lighter rounded-lg p-3 text-light max-w-[80%]">
                      <p>Merhaba! Ben ZekiBot. Size nasıl yardımcı olabilirim?</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-primary bg-opacity-20 rounded-lg p-3 text-light max-w-[80%]">
                      <p>
                        Merhaba ZekiBot, bana bir resim oluşturabilir misin?
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-dark">
                      <i className="fas fa-user text-sm"></i>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                      <i className="fas fa-robot text-sm"></i>
                    </div>
                    <div className="bg-dark-lighter rounded-lg p-3 text-light max-w-[80%]">
                      <p>
                        Tabii! Ne tür bir resim oluşturmamı istersiniz? Örneğin
                        "dağların üzerinde gün batımı" gibi bir şey
                        yazabilirsiniz.
                      </p>
                    </div>
                  </div>

                  {/* Input area */}
                  <div className="mt-6 relative">
                    <input
                      type="text"
                      className="w-full bg-dark-lighter border border-dark-lighter focus:border-primary rounded-lg px-4 py-3 pr-12 text-light"
                      placeholder="Mesajınızı yazın..."
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary-dark">
                      <SendHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary bg-opacity-20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary bg-opacity-20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onRegisterClick={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onLoginClick={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </>
  );
};

export default HeroSection;
