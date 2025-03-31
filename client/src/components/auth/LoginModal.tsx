import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUserSchema, LoginUser } from '@shared/schema';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface LoginModalProps {
  onClose: () => void;
  switchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, switchToRegister }) => {
  const { login, socialLogin } = useAuth();
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginUser) => {
    try {
      await login(data.email, data.password);
      toast({
        title: "Giriş başarılı",
        description: "Hoş geldiniz!",
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Giriş başarısız",
        description: "E-posta veya şifre hatalı.",
        variant: "destructive"
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    socialLogin(provider);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-dark-surface rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>

        <div className="space-y-4 mb-6">
          <Button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
            onClick={() => handleSocialLogin('google')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google ile Giriş Yap
          </Button>

          <Button
            type="button"
            className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
            onClick={() => handleSocialLogin('facebook')}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="white" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.989 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook ile Giriş Yap
          </Button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-dark-surface text-gray-400">veya e-posta ile giriş yap</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-posta Adresi</Label>
            <Input
              id="email"
              type="email"
              className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Şifre</Label>
            <Input
              id="password"
              type="password"
              className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember-me" />
              <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">Beni hatırla</Label>
            </div>

            <a href="#" className="text-sm text-primary-light hover:text-primary-light/80">Şifremi unuttum</a>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Hesabınız yok mu?{' '}
          <button
            onClick={switchToRegister}
            className="text-primary-light hover:text-primary-light/80 font-medium"
          >
            Kayıt olun
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
