import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/ui/dashboard/FeatureCard';
import { MessageSquare, Image, Play, Code, Box, Settings } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 bg-gradient-to-b from-dark-bg to-dark-bg/95 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="block">Yapay Zeka ile</span>
                <span className="bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent">Her Şey Mümkün</span>
              </h1>
              
              <p className="text-lg text-gray-300 mb-8">
                ZekiBot ile sohbet edin, görsel oluşturun, oyun oynayın ve kod yazın. Ücretsiz yapay zeka modellerinin gücüyle desteklenen kullanıcı dostu platform.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/ai-tools">
                  <Button className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition font-medium flex items-center gap-2">
                    <span>Keşfedin</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </Link>
                
                <Link href="/pricing">
                  <Button variant="outline" className="px-6 py-3 border border-gray-500 text-white hover:border-primary-light hover:text-primary-light rounded-lg transition font-medium">
                    Daha Fazla Bilgi
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  <img className="h-10 w-10 rounded-full border-2 border-dark-bg" src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="Kullanıcı" />
                  <img className="h-10 w-10 rounded-full border-2 border-dark-bg" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="Kullanıcı" />
                  <img className="h-10 w-10 rounded-full border-2 border-dark-bg" src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="Kullanıcı" />
                </div>
                <div className="text-sm text-gray-400">
                  <span className="font-medium text-white">1,000+</span> kullanıcı tarafından tercih ediliyor
                </div>
              </div>
            </div>
            
            <div className="relative order-1 md:order-2">
              <div className="bg-gradient-to-br from-primary-dark/30 via-primary/20 to-accent/30 rounded-2xl p-1.5">
                <div className="relative bg-dark-surface rounded-xl overflow-hidden shadow-xl">
                  <div className="px-6 py-3 border-b border-dark-border flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-gray-400">ZekiBot Sohbet</div>
                    <div className="w-16"></div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 bg-primary-light rounded-full flex items-center justify-center text-white font-bold">Z</div>
                      <div className="bg-dark-bg rounded-lg rounded-tl-none p-3 max-w-xs">
                        <p className="text-white">Merhaba! Ben ZekiBot. Size nasıl yardımcı olabilirim?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start justify-end gap-3">
                      <div className="bg-primary-dark/30 rounded-lg rounded-tr-none p-3 max-w-xs">
                        <p className="text-white">Merhaba! Bana Türkiye'nin başkenti hakkında bilgi verebilir misin?</p>
                      </div>
                      <div className="h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">K</div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 bg-primary-light rounded-full flex items-center justify-center text-white font-bold">Z</div>
                      <div className="bg-dark-bg rounded-lg rounded-tl-none p-3 max-w-sm">
                        <p className="text-white">Ankara, Türkiye'nin başkentidir. 13 Ekim 1923'te başkent ilan edilmiştir. Türkiye'nin ikinci büyük şehridir ve İç Anadolu Bölgesi'nde yer alır. Önemli tarihi ve kültürel merkezlerden biridir.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-dark-border">
                    <div className="relative">
                      <input type="text" placeholder="Mesajınızı yazın..." className="w-full bg-dark-bg border border-dark-border rounded-full py-2.5 pl-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent" />
                      <button className="absolute right-1.5 top-1.5 bg-primary hover:bg-primary-dark text-white rounded-full h-8 w-8 flex items-center justify-center transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-accent-dark/30 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -left-10 h-32 w-32 bg-primary-dark/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">ZekiBot'un Özellikleri</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              ZekiBot'un yapay zeka destekli araçlarıyla neler yapabileceğinizi keşfedin. Sohbet edin, görseller oluşturun, oyun oynayın ve kod yazın.
            </p>
          </div>

          {/* 3-Grid System for Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Yapay Zeka Sohbeti"
              description="Gelişmiş yapay zeka modeliyle dil öğreniminden günlük bilgilere kadar her konuda sohbet edin ve yardım alın."
              icon={<MessageSquare className="h-6 w-6" />}
              linkText="Sohbete Başla"
              linkUrl="/chat"
              color="primary"
            />

            <FeatureCard
              title="Görsel Oluşturma"
              description="Metinden görsel oluşturma teknolojisi ile hayal ettiğiniz görselleri saniyeler içinde oluşturun."
              icon={<Image className="h-6 w-6" />}
              linkText="Görsel Oluştur"
              linkUrl="/image-generator"
              color="accent"
            />

            <FeatureCard
              title="Oyunlar"
              description="Yapay zeka destekli eğlenceli mini oyunlarla hem öğrenin hem de keyifli vakit geçirin."
              icon={<Play className="h-6 w-6" />}
              linkText="Oyunları Keşfet"
              linkUrl="/games"
              color="secondary"
            />

            <FeatureCard
              title="Kod Yazımı"
              description="Yapay zeka destekli kod yazma ve hata ayıklama araçlarıyla programlama dünyasını keşfedin."
              icon={<Code className="h-6 w-6" />}
              linkText="Kodlamaya Başla"
              linkUrl="/code-assistant"
              color="primary"
            />

            <FeatureCard
              title="Farklı Modeller"
              description="Çeşitli yapay zeka modelleri arasından ihtiyacınıza en uygun olanı seçerek kullanın."
              icon={<Box className="h-6 w-6" />}
              linkText="Modelleri İncele"
              linkUrl="/ai-tools"
              color="accent"
            />

            <FeatureCard
              title="Yönetim Paneli"
              description="WordPress benzeri kolay yönetim paneli ile içeriğinizi düzenleyin ve güncelleyin."
              icon={<Settings className="h-6 w-6" />}
              linkText="Panele Git"
              linkUrl="/admin"
              color="secondary"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
