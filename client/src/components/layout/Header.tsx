import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { usePoints } from '@/context/PointsContext';
import PointsDisplay from '../ui/dashboard/PointsDisplay';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  toggleMobileMenu: () => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu, openLoginModal, openRegisterModal }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { points } = usePoints();
  const [location] = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-dark-surface border-b border-dark-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent">ZekiBot</span>
            </a>
          </Link>
          
          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex ml-8 gap-6">
            <Link href="/">
              <a className={`py-2 ${location === "/" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}>
                Ana Sayfa
              </a>
            </Link>
            <Link href="/ai-tools">
              <a className={`py-2 ${location === "/ai-tools" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}>
                Özellikler
              </a>
            </Link>
            <Link href="/pricing">
              <a className={`py-2 ${location === "/pricing" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}>
                Fiyatlandırma
              </a>
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/chat">
                  <a className={`py-2 ${location === "/chat" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}>
                    Sohbet
                  </a>
                </Link>
                <Link href="/image-generator">
                  <a className={`py-2 ${location === "/image-generator" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}>
                    Görsel
                  </a>
                </Link>
                <Link href="/games">
                  <a className={`py-2 ${location === "/games" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}>
                    Oyunlar
                  </a>
                </Link>
                <Link href="/code-assistant">
                  <a className={`py-2 ${location === "/code-assistant" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}>
                    Kod
                  </a>
                </Link>
                {user?.isAdmin && (
                  <Link href="/admin">
                    <a className={`py-2 ${location === "/admin" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}>
                      Admin
                    </a>
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:block">
                <PointsDisplay points={points} />
              </div>
              <Button
                variant="outline"
                className="px-4 py-1.5 text-sm border-primary-light text-primary-light hover:bg-primary-dark/20"
                onClick={handleLogout}
              >
                Çıkış Yap
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="px-4 py-1.5 text-sm border-primary-light text-primary-light hover:bg-primary-dark/20"
                onClick={openLoginModal}
              >
                Giriş Yap
              </Button>
              <Button
                variant="default"
                className="px-4 py-1.5 text-sm bg-primary-light hover:bg-primary-dark text-white"
                onClick={openRegisterModal}
              >
                Kayıt Ol
              </Button>
            </>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden ml-2 text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
