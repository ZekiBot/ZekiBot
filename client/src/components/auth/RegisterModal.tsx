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

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const RegisterModal = ({ isOpen, onClose, onLoginClick }: RegisterModalProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Mock register function for demonstration
  const register = (credentials: { username: string; email: string; password: string }) => {
    setIsRegistering(true);
    console.log("Register with:", credentials);
    // Simulating API call
    setTimeout(() => {
      setIsRegistering(false);
      onClose();
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError("Şifreler eşleşmiyor");
      return;
    }
    
    if (!termsAccepted) {
      return;
    }
    
    register({ username, email, password });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-surface rounded-xl shadow-2xl max-w-sm sm:max-w-md w-full p-4 sm:p-5 mx-2 border border-dark-lighter">
        <div className="flex justify-between items-center mb-4">
          <DialogHeader className="p-0">
            <DialogTitle className="text-xl sm:text-2xl font-poppins font-bold text-light">Kayıt Ol</DialogTitle>
          </DialogHeader>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-light-muted hover:text-light h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Button 
              className="flex items-center justify-center bg-white text-black py-2 px-3 rounded-lg hover:bg-opacity-90 transition-colors text-sm"
              onClick={() => console.log("Google signup")}
            >
              <FcGoogle className="mr-1 h-4 w-4" /> Google
            </Button>
            <Button 
              className="flex items-center justify-center bg-[#4267B2] text-white py-2 px-3 rounded-lg hover:bg-opacity-90 transition-colors text-sm"
              onClick={() => console.log("Facebook signup")}
            >
              <Facebook className="mr-1 h-4 w-4" /> Facebook
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <Button 
              className="flex items-center justify-center bg-[#1DA1F2] text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={() => console.log("Twitter signup")}
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button 
              className="flex items-center justify-center bg-[#24292e] text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={() => console.log("GitHub signup")}
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button 
              className="flex items-center justify-center bg-black text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={() => console.log("Apple signup")}
            >
              <FaApple className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center mb-2">
            <Separator className="flex-grow" />
            <span className="mx-2 text-light-muted text-xs">veya e-posta ile kayıt ol</span>
            <Separator className="flex-grow" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="username" className="text-light-muted text-xs">Kullanıcı Adı</Label>
              <Input
                type="text"
                id="username"
                className="w-full bg-dark-lighter border border-dark-lighter focus:border-primary rounded-lg px-3 py-2 text-light text-sm h-9"
                placeholder="kullaniciadi"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="register-email" className="text-light-muted text-xs">E-posta Adresi</Label>
              <Input
                type="email"
                id="register-email"
                className="w-full bg-dark-lighter border border-dark-lighter focus:border-primary rounded-lg px-3 py-2 text-light text-sm h-9"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="register-password" className="text-light-muted text-xs">Şifre</Label>
              <Input
                type="password"
                id="register-password"
                className="w-full bg-dark-lighter border border-dark-lighter focus:border-primary rounded-lg px-3 py-2 text-light text-sm h-9"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="text-light-muted text-xs">Şifre Tekrar</Label>
              <Input
                type="password"
                id="confirm-password"
                className={`w-full bg-dark-lighter border ${passwordError ? 'border-red-500' : 'border-dark-lighter'} focus:border-primary rounded-lg px-3 py-2 text-light text-sm h-9`}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError("");
                }}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>
            <div className="flex items-center">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                className="rounded text-primary focus:ring-primary h-3 w-3"
                required
              />
              <Label htmlFor="terms" className="ml-1 text-xs text-light-muted">
                <span className="text-light-muted">
                  <a href="#" className="text-primary hover:underline">Kullanım Şartları</a> ve{" "}
                  <a href="#" className="text-primary hover:underline">Gizlilik Politikası</a>
                  'nı kabul ediyorum
                </span>
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-2 rounded-lg text-sm h-9"
              disabled={isRegistering || !termsAccepted}
            >
              {isRegistering ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Kayıt Olunuyor...
                </>
              ) : (
                "Kayıt Ol"
              )}
            </Button>
          
            <div className="text-center pt-1">
              <p className="text-light-muted text-xs">
                Zaten hesabınız var mı?{" "}
                <Button
                  variant="link"
                  className="text-primary hover:text-opacity-90 p-0 h-auto text-xs"
                  onClick={onLoginClick}
                >
                  Giriş Yap
                </Button>
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
