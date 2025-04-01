# ZekiBot - Çok Amaçlı Web Platformu

ZekiBot, çeşitli yapay zeka modelleriyle desteklenen çok amaçlı bir Türkçe web platformudur. Sohbet, görsel oluşturma, kodlama yardımcısı ve daha fazla özellik içerir.

## Özellikler

- 🤖 **AI Sohbet**: OpenAI, HuggingFace, DeepSeek, Google Gemini ve Groq modelleriyle sohbet edebilme
- 🖼️ **Görsel Oluşturma**: Metinle görsel oluşturma özelliği
- 💻 **Kod Asistanı**: Farklı dillerde kod yazımına yardımcı AI destekli asistan
- 👤 **Kullanıcı Sistemi**: Firebase tabanlı kimlik doğrulama sistemi
- 🌐 **Çoklu Sosyal Giriş**: Google, Facebook, Twitter, Github ve Apple ile giriş
- 💯 **Puan Sistemi**: AI özellikleri için puan tabanlı sistem
- 🎮 **Oyunlar**: Farklı AI destekli oyunlar
- 📱 **Tam Responsive**: Tüm cihazlarda sorunsuz çalışma
- 🌙 **Koyu Tema**: Şık ve göz dostu tasarım

## Teknoloji Yığını

- Frontend: React + TypeScript
- Yapılandırma: Vite
- Stil: Tailwind CSS + shadcn/ui
- Backend: Express.js
- Kimlik Doğrulama: Firebase Authentication
- AI Modelleri: OpenAI, HuggingFace, DeepSeek, Gemini, Groq

## Kurulum

### Gereksinimler

- Node.js 20.x veya üzeri
- npm veya yarn

### Kurulum Adımları

1. Repo'yu klonlayın:
   ```bash
   git clone https://github.com/kullaniciadi/zekibot.git
   cd zekibot
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. `.env` dosyası oluşturun:
   ```
   VITE_FIREBASE_API_KEY=your_firebase_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   OPENAI_API_KEY=your_openai_key
   HUGGINGFACE_API_KEY=your_huggingface_key
   DEEPSEEK_API_KEY=your_deepseek_key
   GEMINI_API_KEY=your_gemini_key
   GROQ_API_KEY=your_groq_key
   ```

4. Uygulamayı geliştirme modunda başlatın:
   ```bash
   npm run dev
   ```

## GitHub Pages ile Dağıtım

Bu proje GitHub Pages üzerinde statik bir site olarak da dağıtılabilir. Bu durumda backend özellikler devre dışı kalır ve sadece statik demo versiyonu çalışır.

1. GitHub Pages için bir repo oluşturun
2. Bu projeyi repo'ya push edin
3. GitHub repo ayarlarından Pages özelliğini aktifleştirin ve `gh-pages` branch'ini kaynak olarak seçin
4. GitHub Actions workflow'u otomatik olarak sitenizi oluşturup yayınlayacaktır

## Önemli Dosyalar

- `.github/workflows/deploy.yml`: GitHub Pages dağıtım yapılandırması
- `client/src/lib/staticData.ts`: GitHub Pages statik modu için örnek veriler
- `client/src/lib/openai.ts`: API entegrasyonları ve statik mod desteği
- `client/src/context/AuthContext.tsx`: Kimlik doğrulama sistemi

## Katkıda Bulunma

Katkıda bulunmak isterseniz:

1. Bir fork oluşturun
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request açın

## Lisans

MIT Lisansı ile dağıtılmaktadır.