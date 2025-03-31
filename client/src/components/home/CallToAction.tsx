import { useState } from "react";
import RegisterModal from "@/components/auth/RegisterModal";
import LoginModal from "@/components/auth/LoginModal";
// import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";

const CallToAction = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // Mock for development - remove in production
  const isAuthenticated = false;

  const handleStart = () => {
    if (isAuthenticated) {
      return;
    }
    setIsRegisterModalOpen(true);
  };

  return (
    <>
      <section className="py-16 bg-dark relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary bg-opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary bg-opacity-10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
                Yapay Zeka Yolculuğunuza{" "}
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  Bugün Başlayın
                </span>
              </h2>
              <p className="text-light-muted text-lg mb-8">
                ZekiBot ile yapay zeka teknolojisinin faydalarını keşfedin ve
                günlük hayatınızı kolaylaştırın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleStart}
                  className="bg-primary hover:bg-opacity-90 text-white font-medium px-8 py-4 rounded-lg text-lg transition-colors"
                >
                  Ücretsiz Başla
                </button>
                <Link href="#features">
                  <span className="bg-transparent border border-primary text-primary hover:bg-primary hover:bg-opacity-10 font-medium px-8 py-4 rounded-lg text-lg transition-colors inline-block cursor-pointer">
                    Daha Fazla Bilgi
                  </span>
                </Link>
              </div>
              <p className="text-light-muted text-sm mt-6">
                Kayıt olmak tamamen ücretsiz. Kredi kartı gerekmez.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onLoginClick={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onRegisterClick={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
    </>
  );
};

export default CallToAction;
