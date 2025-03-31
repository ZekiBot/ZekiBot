import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatInterface from '@/components/ui/ai/ChatInterface';
import ImageGenerator from '@/components/ui/ai/ImageGenerator';
import GameInterface from '@/components/ui/ai/GameInterface';
import CodeAssistant from '@/components/ui/ai/CodeAssistant';

const AITools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <section className="py-16 bg-gradient-to-b from-dark-bg to-dark-bg/95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">ZekiBot Araçları</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            ZekiBot'un çeşitli yapay zeka araçlarını keşfedin ve ihtiyaçlarınıza göre kullanın.
          </p>
        </div>

        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-dark-surface flex gap-2 p-1">
              <TabsTrigger 
                value="chat" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'chat' ? 'bg-primary text-white' : 'bg-dark-surface hover:bg-dark-bg text-gray-300 hover:text-white'}`}
              >
                Sohbet
              </TabsTrigger>
              <TabsTrigger 
                value="image" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'image' ? 'bg-primary text-white' : 'bg-dark-surface hover:bg-dark-bg text-gray-300 hover:text-white'}`}
              >
                Görsel Oluşturma
              </TabsTrigger>
              <TabsTrigger 
                value="game" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'game' ? 'bg-primary text-white' : 'bg-dark-surface hover:bg-dark-bg text-gray-300 hover:text-white'}`}
              >
                Oyunlar
              </TabsTrigger>
              <TabsTrigger 
                value="code" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'code' ? 'bg-primary text-white' : 'bg-dark-surface hover:bg-dark-bg text-gray-300 hover:text-white'}`}
              >
                Kod Yazımı
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chat" className="focus-visible:outline-none">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="image" className="focus-visible:outline-none">
            <ImageGenerator />
          </TabsContent>

          <TabsContent value="game" className="focus-visible:outline-none">
            <GameInterface />
          </TabsContent>

          <TabsContent value="code" className="focus-visible:outline-none">
            <CodeAssistant />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AITools;
