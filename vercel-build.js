/*
  Bu dosya Vercel üzerinde build sürecini yönetmek için kullanılır.
  Sadece frontend kısmını derlemek için özelleştirilmiştir.
*/

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Vercel build başlatılıyor...');

// Ortam değişkenlerini kontrol et
const isVercel = process.env.VERCEL === '1';
const isProduction = process.env.NODE_ENV === 'production';

if (isVercel) {
  console.log('✅ Vercel ortamı tespit edildi.');
  
  // Statik mod için .env dosyası oluştur
  const envContent = 
`VITE_STATIC_MODE=true
${process.env.VITE_FIREBASE_API_KEY ? `VITE_FIREBASE_API_KEY=${process.env.VITE_FIREBASE_API_KEY}` : ''}
${process.env.VITE_FIREBASE_AUTH_DOMAIN ? `VITE_FIREBASE_AUTH_DOMAIN=${process.env.VITE_FIREBASE_AUTH_DOMAIN}` : ''}
${process.env.VITE_FIREBASE_PROJECT_ID ? `VITE_FIREBASE_PROJECT_ID=${process.env.VITE_FIREBASE_PROJECT_ID}` : ''}
${process.env.VITE_FIREBASE_STORAGE_BUCKET ? `VITE_FIREBASE_STORAGE_BUCKET=${process.env.VITE_FIREBASE_STORAGE_BUCKET}` : ''}
${process.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? `VITE_FIREBASE_MESSAGING_SENDER_ID=${process.env.VITE_FIREBASE_MESSAGING_SENDER_ID}` : ''}
${process.env.VITE_FIREBASE_APP_ID ? `VITE_FIREBASE_APP_ID=${process.env.VITE_FIREBASE_APP_ID}` : ''}`;

  fs.writeFileSync('.env', envContent);
  console.log('✅ .env dosyası oluşturuldu.');
  
  // Sadece frontend'i build et
  console.log('🔨 Frontend derlemesi başlatılıyor...');
  exec('cd client && npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Build hatası: ${error.message}`);
      process.exit(1);
    }
    
    if (stderr) {
      console.error(`⚠️ Build uyarıları: ${stderr}`);
    }
    
    console.log(`✅ Build çıktısı: ${stdout}`);
    
    // Dist klasörünü düzenle
    console.log('📂 Dosyalar düzenleniyor...');
    
    try {
      // Dist klasörünü kök dizine taşı
      fs.cpSync('client/dist', 'dist', { recursive: true });
      console.log('✅ Dist klasörü kök dizine taşındı.');
      
      // 404.html dosyasını oluştur
      fs.copyFileSync('dist/index.html', 'dist/404.html');
      console.log('✅ 404.html dosyası oluşturuldu.');
    } catch (err) {
      console.error(`❌ Dosya işleme hatası: ${err.message}`);
    }
    
    console.log('✅ Vercel build tamamlandı!');
  });
} else {
  console.log('⚠️ Bu script sadece Vercel ortamında çalıştırılmalıdır.');
  console.log('⚠️ Normal build için "npm run build" komutunu kullanın.');
}