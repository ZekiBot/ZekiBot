import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-gray-100">
      <Header 
        toggleMobileMenu={toggleMobileMenu} 
        openLoginModal={openLoginModal} 
        openRegisterModal={openRegisterModal} 
      />
      
      {isMobileMenuOpen && <MobileMenu closeMobileMenu={() => setIsMobileMenuOpen(false)} />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
      
      {isLoginModalOpen && (
        <LoginModal 
          onClose={closeModals} 
          switchToRegister={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }} 
        />
      )}
      
      {isRegisterModalOpen && (
        <RegisterModal 
          onClose={closeModals} 
          switchToLogin={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }} 
        />
      )}
    </div>
  );
};

export default Layout;
