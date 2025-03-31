import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';

interface MobileMenuProps {
  closeMobileMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ closeMobileMenu }) => {
  const { isAuthenticated, user } = useAuth();
  const [location] = useLocation();

  return (
    <div className="md:hidden bg-dark-surface border-t border-dark-border px-4 py-2 absolute w-full z-40">
      <nav className="flex flex-col space-y-2">
        <Link href="/">
          <a 
            className={`py-2 ${location === "/" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}
            onClick={closeMobileMenu}
          >
            Ana Sayfa
          </a>
        </Link>
        <Link href="/ai-tools">
          <a 
            className={`py-2 ${location === "/ai-tools" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}
            onClick={closeMobileMenu}
          >
            Özellikler
          </a>
        </Link>
        <Link href="/pricing">
          <a 
            className={`py-2 ${location === "/pricing" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}
            onClick={closeMobileMenu}
          >
            Fiyatlandırma
          </a>
        </Link>
        {isAuthenticated && (
          <>
            <Link href="/chat">
              <a 
                className={`py-2 ${location === "/chat" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}
                onClick={closeMobileMenu}
              >
                Sohbet
              </a>
            </Link>
            <Link href="/image-generator">
              <a 
                className={`py-2 ${location === "/image-generator" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}
                onClick={closeMobileMenu}
              >
                Görsel Oluşturma
              </a>
            </Link>
            <Link href="/games">
              <a 
                className={`py-2 ${location === "/games" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}
                onClick={closeMobileMenu}
              >
                Oyunlar
              </a>
            </Link>
            <Link href="/code-assistant">
              <a 
                className={`py-2 ${location === "/code-assistant" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}
                onClick={closeMobileMenu}
              >
                Kod Yazımı
              </a>
            </Link>
            {user?.isAdmin && (
              <Link href="/admin">
                <a 
                  className={`py-2 ${location === "/admin" ? "text-white" : "text-gray-300"} hover:text-primary-light transition`}
                  onClick={closeMobileMenu}
                >
                  Admin Paneli
                </a>
              </Link>
            )}
          </>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
