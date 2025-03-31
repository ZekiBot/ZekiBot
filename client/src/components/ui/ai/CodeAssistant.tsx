import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePoints } from '@/context/PointsContext';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/context/AuthContext';
import { Clipboard } from 'lucide-react';

interface Language {
  id: string;
  name: string;
}

const programmingLanguages: Language[] = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'php', name: 'PHP' },
  { id: 'java', name: 'Java' },
  { id: 'csharp', name: 'C#' },
  { id: 'cpp', name: 'C++' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'ruby', name: 'Ruby' }
];

const CodeAssistant: React.FC = () => {
  const [language, setLanguage] = useState('javascript');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const { spendPoints } = usePoints();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleGenerateCode = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen bir görev açıklaması girin.",
        variant: "destructive"
      });
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: "Giriş Yapın",
        description: "Bu özelliği kullanabilmek için giriş yapmalısınız.",
        variant: "destructive"
      });
      return;
    }

    // Cost per code generation
    const pointCost = 3;
    
    // Check if user has enough points
    const success = await spendPoints(pointCost, "Code assistant");
    if (!success) {
      toast({
        title: "Yetersiz Puan",
        description: "Kod oluşturmak için yeterli puanınız yok.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setGeneratedCode(null);

    try {
      // Send request to the backend
      const response = await apiRequest('POST', '/api/ai/code', { 
        language, 
        prompt
      });
      
      const data = await response.json();
      setGeneratedCode(data.code);
    } catch (error) {
      console.error('Error generating code:', error);
      toast({
        title: "Hata",
        description: "Kod oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      toast({
        title: "Kopyalandı",
        description: "Kod panoya kopyalandı.",
      });
    }
  };

  return (
    <div className="bg-dark-surface rounded-xl overflow-hidden border border-dark-border shadow-lg">
      <div className="border-b border-dark-border p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Kod Yardımcısı</h3>
        <button className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <label htmlFor="language-select" className="block text-sm font-medium text-gray-300 mb-1">Programlama Dili</label>
          <Select 
            value={language} 
            onValueChange={setLanguage}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent">
              <SelectValue placeholder="Dil seçin" />
            </SelectTrigger>
            <SelectContent>
              {programmingLanguages.map((lang) => (
                <SelectItem key={lang.id} value={lang.id}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="code-task" className="block text-sm font-medium text-gray-300 mb-1">Ne yapmak istiyorsunuz?</label>
          <Textarea
            id="code-task"
            rows={3}
            placeholder="Örn: 'Bir sayı dizisindeki en büyük değeri bulan JavaScript kodu yazabilir misiniz?'"
            className="w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <Button
          className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 px-4 rounded-lg transition font-medium"
          onClick={handleGenerateCode}
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? 'Kod Oluşturuluyor...' : 'Kod Oluştur (3 Puan)'}
        </Button>
        
        {isLoading ? (
          <div className="mt-6 p-4 bg-dark-bg rounded-lg border border-dark-border text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-light mb-2"></div>
            <p className="text-gray-400 text-sm">Kod oluşturuluyor, lütfen bekleyin...</p>
          </div>
        ) : generatedCode ? (
          <div className="mt-6 p-4 bg-dark-bg rounded-lg border border-dark-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                {programmingLanguages.find(lang => lang.id === language)?.name || language}
              </span>
              <button 
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                onClick={copyToClipboard}
              >
                <Clipboard className="h-4 w-4" />
                <span>Kopyala</span>
              </button>
            </div>
            <pre className="text-green-400 text-sm overflow-x-auto p-2 bg-dark-bg/80 rounded">
              <code>{generatedCode}</code>
            </pre>
          </div>
        ) : (
          <div className="mt-6 p-4 bg-dark-bg rounded-lg border border-dark-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Kod çıktısı burada görünecek</span>
            </div>
            <div className="min-h-[100px] flex items-center justify-center text-gray-500">
              <p className="text-center text-sm">Kod oluşturmak için yukarıdaki alanları doldurun ve "Kod Oluştur" düğmesine tıklayın.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeAssistant;
