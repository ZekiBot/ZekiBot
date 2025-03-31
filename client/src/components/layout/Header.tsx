import { useState } from "react";
import { Link } from "wouter";
// import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings, History, Code, Image, MessageSquare, Gamepad2, List } from "lucide-react";

// Mock auth data for development - remove in production
const mockAuth = {
  isAuthenticated: true,
  user: { username: "Test", isAdmin: true },
  logout: () => console.log("Logout clicked"),
  isAdmin: true,
  points: 100
};

const Header = () => {
  // Temporary development mock - remove in production
  const { isAuthenticated, user, logout, isAdmin, points } = mockAuth;
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="bg-dark-surface border-b border-dark-lighter">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-accent mr-2">
                <i className="fas fa-robot text-3xl"></i>
              </div>
              <Link href="/">
                <h1 className="font-poppins font-bold text-2xl md:text-3xl bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text cursor-pointer">
                  ZekiBot
                </h1>
              </Link>
            </div>

            {/* Navigation for desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/">
                <span className="text-light hover:text-accent transition-colors font-medium cursor-pointer">
                  Ana Sayfa
                </span>
              </Link>
              <Link href="/#features">
                <span className="text-light hover:text-accent transition-colors font-medium cursor-pointer">
                  Özellikler
                </span>
              </Link>
              <Link href="/sohbet">
                <span className="text-light hover:text-accent transition-colors font-medium cursor-pointer">
                  Sohbet
                </span>
              </Link>
              <Link href="/gorsel-olustur">
                <span className="text-light hover:text-accent transition-colors font-medium cursor-pointer">
                  Görsel Oluştur
                </span>
              </Link>
            </nav>

            {/* User and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <div className="hidden md:flex items-center text-accent bg-dark-lighter rounded-full px-3 py-1">
                  <i className="fas fa-coins mr-1"></i>
                  <span className="font-medium">{points}</span> Puan
                </div>
              )}

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white">
                        {user?.username?.charAt(0).toUpperCase()}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <Link href="/profil">
                        <span>Profilim</span>
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        <Link href="/admin">
                          <span>Yönetici Paneli</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-red-500"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Çıkış Yap</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  className="bg-primary hover:bg-opacity-90 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                  onClick={handleLoginClick}
                >
                  Giriş Yap
                </Button>
              )}

              <button
                className="md:hidden text-light hover:text-accent focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <List className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-dark-surface border-t border-dark-lighter px-4 py-2">
            <nav className="flex flex-col space-y-3 py-2">
              <Link href="/">
                <span
                  className="text-light hover:text-accent transition-colors font-medium py-2 cursor-pointer block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ana Sayfa
                </span>
              </Link>
              <Link href="/#features">
                <span
                  className="text-light hover:text-accent transition-colors font-medium py-2 cursor-pointer block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Özellikler
                </span>
              </Link>
              <Link href="/sohbet">
                <span
                  className="text-light hover:text-accent transition-colors font-medium py-2 cursor-pointer block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Sohbet
                </span>
              </Link>
              <Link href="/gorsel-olustur">
                <span
                  className="text-light hover:text-accent transition-colors font-medium py-2 cursor-pointer block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Image className="w-4 h-4 inline mr-2" />
                  Görsel Oluştur
                </span>
              </Link>
              <Link href="/oyunlar">
                <span
                  className="text-light hover:text-accent transition-colors font-medium py-2 cursor-pointer block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Gamepad2 className="w-4 h-4 inline mr-2" />
                  Oyunlar
                </span>
              </Link>
              <Link href="/kod-yazma">
                <span
                  className="text-light hover:text-accent transition-colors font-medium py-2 cursor-pointer block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Code className="w-4 h-4 inline mr-2" />
                  Kod Yazma
                </span>
              </Link>
              {isAuthenticated && (
                <>
                  <Link href="/profil">
                    <span
                      className="text-light hover:text-accent transition-colors font-medium py-2 cursor-pointer block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 inline mr-2" />
                      Profilim
                    </span>
                  </Link>
                  <div className="flex items-center text-accent py-2">
                    <i className="fas fa-coins mr-1"></i>
                    <span>{points}</span> Puan
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

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

export default Header;
