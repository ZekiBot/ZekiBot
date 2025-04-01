import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { X, Loader2, Facebook, Twitter, Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

// Firebase imports
import { 
  loginWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  signInWithGithub,
  signInWithApple
} from '@/lib/firebase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
  onLoginSuccess?: (user: { username: string }) => void;
}

const LoginModal = ({ isOpen, onClose, onRegisterClick, onLoginSuccess }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Login function for demonstration
  const login = async (credentials: { email: string; password: string }) => {
    setIsLoggingIn(true);
    setErrorMessage("");
    
    try {
      // Bu kısım gerçek Firebase bağlantısı yapılabilir
      // await loginWithEmailAndPassword(credentials.email, credentials.password);
      
      // Simülasyon (gerçek uygulamada kaldırılacak)
      console.log("Login with:", credentials);
      setTimeout(() => {
        // Header'da User gösterimi için veri gönderimi
        const mockUser = {
          username: credentials.email.split('@')[0] // E-posta adresinin @ öncesini kullanıcı adı yap
        };
        
        // Giriş başarılı callback'i çağır
        if (onLoginSuccess) {
          onLoginSuccess(mockUser);
        }
        
        setIsLoggingIn(false);
        onClose();
      }, 1500);
    } catch (error: any) {
      setIsLoggingIn(false);
      setErrorMessage(
        error.code === "auth/invalid-credential" 
          ? "Geçersiz e-posta veya şifre."
          : error.message || "Giriş sırasında bir hata oluştu."
      );
    }
  };
  
  // Social login functions
  const handleGoogleLogin = async () => {
    try {
      console.log("Google login");
      
      // Simülasyon (gerçek uygulamada kaldırılacak)
      setTimeout(() => {
        // Google ile giriş başarılı olduğunda
        const mockUser = {
          username: "google_kullanici" // Google kullanıcı adı
        };
        
        // Giriş başarılı callback'i çağır
        if (onLoginSuccess) {
          onLoginSuccess(mockUser);
        }
        
        onClose();
      }, 1000);
      
      // await signInWithGoogle();
      // onClose();
    } catch (error: any) {
      setErrorMessage(error.message || "Google ile giriş yapılamadı.");
    }
  };
  
  const handleFacebookLogin = async () => {
    try {
      console.log("Facebook login");
      
      // Simülasyon (gerçek uygulamada kaldırılacak)
      setTimeout(() => {
        // Facebook ile giriş başarılı olduğunda
        const mockUser = {
          username: "facebook_kullanici" // Facebook kullanıcı adı
        };
        
        // Giriş başarılı callback'i çağır
        if (onLoginSuccess) {
          onLoginSuccess(mockUser);
        }
        
        onClose();
      }, 1000);
      
      // await signInWithFacebook();
      // onClose();
    } catch (error: any) {
      setErrorMessage(error.message || "Facebook ile giriş yapılamadı.");
    }
  };
  
  const handleTwitterLogin = async () => {
    try {
      console.log("Twitter login");
      
      // Simülasyon (gerçek uygulamada kaldırılacak)
      setTimeout(() => {
        // Twitter ile giriş başarılı olduğunda
        const mockUser = {
          username: "twitter_kullanici" // Twitter kullanıcı adı
        };
        
        // Giriş başarılı callback'i çağır
        if (onLoginSuccess) {
          onLoginSuccess(mockUser);
        }
        
        onClose();
      }, 1000);
      
      // await signInWithTwitter();
      // onClose();
    } catch (error: any) {
      setErrorMessage(error.message || "Twitter ile giriş yapılamadı.");
    }
  };
  
  const handleGithubLogin = async () => {
    try {
      console.log("Github login");
      
      // Simülasyon (gerçek uygulamada kaldırılacak)
      setTimeout(() => {
        // Github ile giriş başarılı olduğunda
        const mockUser = {
          username: "github_kullanici" // Github kullanıcı adı
        };
        
        // Giriş başarılı callback'i çağır
        if (onLoginSuccess) {
          onLoginSuccess(mockUser);
        }
        
        onClose();
      }, 1000);
      
      // await signInWithGithub();
      // onClose();
    } catch (error: any) {
      setErrorMessage(error.message || "Github ile giriş yapılamadı.");
    }
  };
  
  const handleAppleLogin = async () => {
    try {
      console.log("Apple login");
      
      // Simülasyon (gerçek uygulamada kaldırılacak)
      setTimeout(() => {
        // Apple ile giriş başarılı olduğunda
        const mockUser = {
          username: "apple_kullanici" // Apple kullanıcı adı
        };
        
        // Giriş başarılı callback'i çağır
        if (onLoginSuccess) {
          onLoginSuccess(mockUser);
        }
        
        onClose();
      }, 1000);
      
      // await signInWithApple();
      // onClose();
    } catch (error: any) {
      setErrorMessage(error.message || "Apple ile giriş yapılamadı.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-surface rounded-xl shadow-2xl max-w-md w-full p-6 mx-4 border border-dark-lighter">
        <div className="flex justify-between items-center mb-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-poppins font-bold text-light">Giriş Yap</DialogTitle>
          </DialogHeader>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-light-muted hover:text-light">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="flex items-center justify-center bg-white text-black py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mr-2 h-5 w-5" /> Google
            </Button>
            <Button 
              className="flex items-center justify-center bg-[#4267B2] text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={handleFacebookLogin}
            >
              <Facebook className="mr-2 h-4 w-4" /> Facebook
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Button 
              className="flex items-center justify-center bg-[#1DA1F2] text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={handleTwitterLogin}
            >
              <Twitter className="mr-2 h-4 w-4" />
            </Button>
            <Button 
              className="flex items-center justify-center bg-[#24292e] text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={handleGithubLogin}
            >
              <Github className="mr-2 h-4 w-4" />
            </Button>
            <Button 
              className="flex items-center justify-center bg-black text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={handleAppleLogin}
            >
              <FaApple className="mr-2 h-4 w-4" />
            </Button>
          </div>
          
          {errorMessage && (
            <div className="bg-red-500/10 text-red-500 p-3 rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          <div className="flex items-center my-4">
            <Separator className="flex-grow" />
            <span className="mx-4 text-light-muted text-sm">veya e-posta ile giriş yap</span>
            <Separator className="flex-grow" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-light-muted text-sm">E-posta Adresi</Label>
                <Input
                  type="email"
                  id="email"
                  className="w-full bg-dark-lighter border border-dark-lighter focus:border-primary rounded-lg px-4 py-3 text-light"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-light-muted text-sm">Şifre</Label>
                <Input
                  type="password"
                  id="password"
                  className="w-full bg-dark-lighter border border-dark-lighter focus:border-primary rounded-lg px-4 py-3 text-light"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <Label htmlFor="remember" className="ml-2 text-sm text-light-muted">Beni hatırla</Label>
                </div>
                <a href="#" className="text-sm text-primary hover:text-opacity-90">Şifremi unuttum</a>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-lg"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Giriş Yapılıyor...
                  </>
                ) : (
                  "Giriş Yap"
                )}
              </Button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-light-muted text-sm">
              Hesabınız yok mu?{" "}
              <Button
                variant="link"
                className="text-primary hover:text-opacity-90 p-0"
                onClick={onRegisterClick}
              >
                Kayıt Ol
              </Button>
            </p>
          </div>

          <div className="text-xs text-light-muted text-center mt-4">
            Giriş yaparak{" "}
            <a href="#" className="text-primary hover:underline">
              Kullanım Şartları
            </a>{" "}
            ve{" "}
            <a href="#" className="text-primary hover:underline">
              Gizlilik Politikası
            </a>
            'nı kabul etmiş olursunuz.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
