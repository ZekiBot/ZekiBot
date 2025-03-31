import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePoints } from '@/context/PointsContext';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'Merhaba! Ben ZekiBot. Size nasıl yardımcı olabilirim?', isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { spendPoints } = usePoints();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    if (!isAuthenticated) {
      toast({
        title: "Giriş Yapın",
        description: "Bu özelliği kullanabilmek için giriş yapmalısınız.",
        variant: "destructive"
      });
      return;
    }

    // Cost per message
    const pointCost = 1;
    
    // Check if user has enough points
    const success = await spendPoints(pointCost, "Chat message");
    if (!success) {
      toast({
        title: "Yetersiz Puan",
        description: "Bu özelliği kullanmak için yeterli puanınız yok.",
        variant: "destructive"
      });
      return;
    }

    // Add user message to the chat
    const userMessage = { id: Date.now().toString(), content: inputValue, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send request to the backend
      const response = await apiRequest('POST', '/api/ai/chat', { message: inputValue });
      const data = await response.json();

      // Add AI response to the chat
      setMessages(prevMessages => [
        ...prevMessages,
        { id: (Date.now() + 1).toString(), content: data.message, isUser: false }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Hata",
        description: "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-dark-surface rounded-xl overflow-hidden border border-dark-border shadow-lg">
      <div className="border-b border-dark-border p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Yapay Zeka Sohbeti</h3>
        <button className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="p-4 bg-dark-bg min-h-[300px] max-h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start ${message.isUser ? 'justify-end' : ''} gap-3`}>
              {!message.isUser && (
                <div className="h-8 w-8 bg-primary-light rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  Z
                </div>
              )}
              
              <div className={`${message.isUser ? 'bg-primary-dark/30 rounded-tr-none' : 'bg-dark-surface rounded-tl-none'} rounded-lg p-3 max-w-xs md:max-w-sm`}>
                <p className="text-white whitespace-pre-wrap">{message.content}</p>
              </div>
              
              {message.isUser && (
                <div className="h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  K
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 bg-primary-light rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                Z
              </div>
              <div className="bg-dark-surface rounded-lg rounded-tl-none p-3">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-dark-border">
        <div className="relative">
          <Input
            type="text"
            placeholder="Mesajınızı yazın..."
            className="w-full bg-dark-bg border border-dark-border rounded-full py-2.5 pl-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            className="absolute right-1.5 top-1.5 bg-primary hover:bg-primary-dark text-white rounded-full h-8 w-8 flex items-center justify-center transition"
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
