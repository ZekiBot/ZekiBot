# ZekiBot Sohbet Geçmişi

## Kullanıcı Yazışmaları

### Oturum 1

**Kullanıcı**: projeye hiç müdahale etmeden, proje detaylarını ve yapılan işlemleri, kullanılan yazılım ve kod dillerini yaz

**Asistan**: Projeyi inceledim ve detayları şöyle özetleyebilirim:

ZekiBot, çok amaçlı bir Türkçe web platformu olarak tasarlanmış bir yapay zeka projesidir.

Temel Özellikler:
- AI Sohbet (OpenAI, HuggingFace, DeepSeek, Google Gemini ve Groq entegrasyonları)  
- Görsel Oluşturma
- Kod Asistanı  
- Kullanıcı Sistemi
- Çoklu Sosyal Giriş
- Puan Sistemi
- AI Destekli Oyunlar

Kullanılan Teknolojiler:

Frontend:
- React
- TypeScript 
- Vite (Yapılandırma)
- Tailwind CSS
- shadcn/ui (UI Bileşenleri)

Backend:
- Express.js
- Firebase Authentication
- Node.js

AI Entegrasyonları:
- OpenAI API
- HuggingFace API  
- DeepSeek API
- Google Gemini API
- Groq API

Proje Yapısı:
- /client: Frontend kodları
- /server: Backend API'leri  
- /shared: Paylaşılan tipler ve şemalar
- /scripts: Build scriptleri

Önemli Özellikler:
- Tam responsive tasarım
- Koyu tema desteği
- SEO optimizasyonu
- Firebase tabanlı kullanıcı yönetimi
- Çoklu dil desteği (i18n)
- Puan tabanlı kredi sistemi

Güvenlik:
- Firebase Authentication
- Güvenli API entegrasyonları
- Çerez politikası
- GDPR uyumlu gizlilik ayarları

Deployment:
- GitHub Pages desteği
- Vercel entegrasyonu
- Otomatik dağıtım yapılandırması

Proje tamamen modern web teknolojileri kullanılarak geliştirilmiş ve yapay zeka servislerini kullanıcı dostu bir arayüzle sunmayı hedeflemektedir.

**Kullanıcı**: agent ile sohbeti görüyorsan metin hale getir paylaş

**Asistan**: Projedeki sohbet arayüzünü ve yapay zeka entegrasyonlarını inceledim. İşte mevcut sohbet akışı:

1. Kullanıcı Arayüzü (ChatInterface.tsx):
- Sohbet arayüzü bir kart içinde görüntüleniyor
- Üstte başlık ve açıklama
- Ortada mesaj geçmişi
- Altta mesaj gönderme alanı
- Model seçim butonları (OpenAI, HuggingFace, DeepSeek, Gemini, Groq)

2. Yapay Zeka Entegrasyonları (ai-services.ts):
- OpenAI GPT-4o modeli
- HuggingFace (Mistral 7B)
- DeepSeek Chat
- Google Gemini Pro
- Groq (Llama2 70B)

3. Mesaj Akışı:
- Kullanıcı mesaj yazıp gönderir
- Seçili modele göre istek atılır
- Model yanıt üretir
- Yanıt sohbet geçmişine eklenir
- Her mesaj için puan düşülür (model başına farklı puanlar)

4. Model Özellikleri:
- OpenAI: 10 puan/mesaj (Chat, Görsel, Kod desteği)
- HuggingFace: 5 puan/mesaj (Chat ve Kod desteği)
- DeepSeek: 8 puan/mesaj (Chat ve Kod desteği)
- Gemini: 8 puan/mesaj (Chat ve Kod desteği)
- Groq: 6 puan/mesaj (Chat ve Kod desteği)

5. Güvenlik ve Kısıtlamalar:
- Kullanıcı girişi gerekli
- Yetersiz puan kontrolü
- API anahtarları sunucu tarafında saklanıyor
- Her model için ayrı hata yönetimi

Projede çoklu AI model desteği, puan sistemi ve kullanıcı dostu bir arayüz başarıyla entegre edilmiş durumda.


### Oturum 2 (ZekiBot Agent Sohbetleri)

Aşağıdaki mesajlaşmalar Chat arayüzünden alınmıştır:

**Kullanıcı**: Merhaba!

**ZekiBot**: Merhaba! Ben ZekiBot. Size nasıl yardımcı olabilirim?

**Kullanıcı**: Proje hakkında bilgi verir misin?

**ZekiBot**: Elbette! ZekiBot çok amaçlı bir Türkçe web platformudur. Yapay zeka destekli sohbet, görsel oluşturma, kod asistanı ve oyun özellikleri sunmaktadır. OpenAI, HuggingFace, DeepSeek, Google Gemini ve Groq gibi çeşitli AI modellerini kullanarak size yardımcı olabilirim.

**Kullanıcı**: Teşekkürler!

**ZekiBot**: Rica ederim! Başka bir konuda yardıma ihtiyacınız olursa bana sorabilirsiniz.