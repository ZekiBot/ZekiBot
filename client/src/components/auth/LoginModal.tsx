import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { X, Loader2 } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

const LoginModal = ({ isOpen, onClose, onRegisterClick }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoggingIn } = useAuth();

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
            <Button className="flex items-center justify-center bg-[#DB4437] text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors">
              <i className="fab fa-google mr-2"></i> Google
            </Button>
            <Button className="flex items-center justify-center bg-[#4267B2] text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors">
              <i className="fab fa-facebook-f mr-2"></i> Facebook
            </Button>
          </div>

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
