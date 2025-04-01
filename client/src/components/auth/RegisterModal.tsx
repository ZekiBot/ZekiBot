import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { X, Loader2, Facebook, Twitter, Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const RegisterModal = ({ isOpen, onClose, onLoginClick }: RegisterModalProps) => {
  const { register, isRegistering } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordError, setPasswordError] = useState("");

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
      <DialogContent className="bg-dark-surface rounded-xl shadow-2xl max-w-md w-full p-6 mx-4 border border-dark-lighter">
        <div className="flex justify-between items-center mb-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-poppins font-bold text-light">Kayıt Ol</DialogTitle>
          </DialogHeader>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-light-muted hover:text-light">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="flex items-center justify-center bg-white text-black py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={() => console.log("Google signup")}
            >
              <FcGoogle className="mr-2 h-5 w-5" /> Google
            </Button>
            <Button 
              className="flex items-center justify-center bg-[#4267B2] text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={() => console.log("Facebook signup")}
            >
              <Facebook className="mr-2 h-4 w-4" /> Facebook
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Button 
              className="flex items-center justify-center bg-[#1DA1F2] text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={() => console.log("Twitter signup")}
            >
              <Twitter className="mr-2 h-4 w-4" />
            </Button>
            <Button 
              className="flex items-center justify-center bg-[#24292e] text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={() => console.log("GitHub signup")}
            >
              <Github className="mr-2 h-4 w-4" />
            </Button>
            <Button 
              className="flex items-center justify-center bg-black text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              onClick={() => console.log("Apple signup")}
            >
              <FaApple className="mr-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center my-4">
            <Separator className="flex-grow" />
            <span className="mx-4 text-light-muted text-sm">veya e-posta ile kayıt ol</span>
            <Separator className="flex-grow" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-light-muted text-sm">Kullanıcı Adı</Label>
                <Input
                  type="text"
                  id="username"
                  className="w-full bg-dark-lighter border border-dark-lighter focus:border-primary rounded-lg px-4 py-3 text-light"
                  placeholder="kullaniciadi"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-email" className="text-light-muted text-sm">E-posta Adresi</Label>
                <Input
                  type="email"
                  id="register-email"
                  className="w-full bg-dark-lighter border border-dark-lighter focus:border-primary rounded-lg px-4 py-3 text-light"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-password" className="text-light-muted text-sm">Şifre</Label>
                <Input
                  type="password"
                  id="register-password"
                  className="w-full bg-dark-lighter border border-dark-lighter focus:border-primary rounded-lg px-4 py-3 text-light"
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
                <Label htmlFor="confirm-password" className="text-light-muted text-sm">Şifre Tekrar</Label>
                <Input
                  type="password"
                  id="confirm-password"
                  className={`w-full bg-dark-lighter border ${passwordError ? 'border-red-500' : 'border-dark-lighter'} focus:border-primary rounded-lg px-4 py-3 text-light`}
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
                  className="rounded text-primary focus:ring-primary"
                  required
                />
                <Label htmlFor="terms" className="ml-2 text-sm text-light-muted">
                  <span className="text-light-muted">
                    <a href="#" className="text-primary hover:underline">Kullanım Şartları</a> ve{" "}
                    <a href="#" className="text-primary hover:underline">Gizlilik Politikası</a>
                    'nı kabul ediyorum
                  </span>
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-lg"
                disabled={isRegistering || !termsAccepted}
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Kayıt Olunuyor...
                  </>
                ) : (
                  "Kayıt Ol"
                )}
              </Button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-light-muted text-sm">
              Zaten hesabınız var mı?{" "}
              <Button
                variant="link"
                className="text-primary hover:text-opacity-90 p-0"
                onClick={onLoginClick}
              >
                Giriş Yap
              </Button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
