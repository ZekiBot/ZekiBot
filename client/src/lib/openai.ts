import { apiRequest } from "./queryClient";
import { 
  mockModels, 
  mockChatMessages, 
  mockImageGenerations, 
  mockCodeGenerations 
} from "./staticData";

// AI Model type
export type AIModel = {
  id: string;
  name: string;
  description: string;
  pointCost: number;
  supportsChat: boolean;
  supportsImage: boolean;
  supportsCode: boolean;
};

// Check if we're in static (GitHub Pages) mode
const isStaticMode = () => {
  return window.location.hostname.includes('github.io') || 
         import.meta.env.VITE_STATIC_MODE === 'true';
};

// Get available AI models
export async function getAvailableModels() {
  if (isStaticMode()) {
    return mockModels;
  }

  try {
    const response = await apiRequest("GET", "/api/ai-models");
    return await response.json();
  } catch (error) {
    console.error("API error, falling back to static data:", error);
    return mockModels;
  }
}

// Chat API
export async function sendChatMessage(message: string, modelType?: string) {
  if (isStaticMode()) {
    const selectedModel = mockModels.find(m => m.id === modelType) || mockModels[0];
    
    // Farklı modeller için farklı yanıt şablonları
    let response = '';
    
    // Basit soru/yanıt kalıpları
    const isGreeting = /merhaba|selam|nasılsın|hey/i.test(message);
    const isQuestion = /\?$|ne|nasıl|neden|niçin|nerede|kim|kime|hangi|kaç/i.test(message);
    const isAboutAI = /yapay zeka|ai|gpt|makine öğrenmesi|deep learning|chatbot/i.test(message);
    const isAboutService = /hizmet|servis|özellik|ne yapabilirsin|neler yapabilirsin/i.test(message);
    const isAboutHelp = /yardım|destek|sorun|problem|hata/i.test(message);
    
    if (isGreeting) {
      response = `Merhaba! Ben ${selectedModel.name} modeliyle çalışan bir yapay zeka asistanıyım. Size nasıl yardımcı olabilirim? 😊\n\n(Not: Bu, GitHub Pages üzerinde çalışan statik bir yanıttır.)`;
    }
    else if (isAboutService) {
      response = `ZekiBot olarak şu hizmetleri sunuyoruz:\n\n- AI Sohbet: Benimle istediğiniz konuda sohbet edebilirsiniz\n- Görsel Oluşturma: Metinden görsel oluşturabilirsiniz\n- Kod Asistanı: Programlama dillerinde kod oluşturabilirsiniz\n- Oyunlar: AI destekli oyunlar oynayabilirsiniz\n\n(Not: Bu, GitHub Pages üzerinde çalışan statik bir yanıttır.)`;
    }
    else if (isAboutAI) {
      response = `Yapay zeka, insan zekasını taklit eden ve zamanla öğrenebilen bilgisayar sistemleridir. ${selectedModel.name} gibi büyük dil modelleri, milyarlarca metin örneğinden öğrenerek insan benzeri metinler oluşturabilir.\n\nAncak şu an sınırlı bir statik modda çalışıyorum çünkü bu GitHub Pages üzerinde çalışan bir demoyum.`;
    }
    else if (isAboutHelp) {
      response = `Yardıma ihtiyacınız olduğunu duyduğuma üzüldüm. Size nasıl yardımcı olabilirim?\n\n- Teknik sorun yaşıyorsanız, sayfayı yenilemeyi deneyin\n- Kullanım hakkında bilgi almak için "özellikler neler?" yazabilirsiniz\n- Daha fazla yardım için iletişim sayfamızı ziyaret edebilirsiniz\n\n(Not: Bu, GitHub Pages üzerinde çalışan statik bir yanıttır.)`;
    }
    else if (isQuestion) {
      response = `İlginç bir soru sorduğunuzu fark ettim. Normal şartlarda buna detaylı bir yanıt verebilirdim, ancak şu anda GitHub Pages üzerinde çalışan statik bir demo modundayım.\n\nGerçek uygulamada ${selectedModel.name} modeli kullanılarak bu tür sorulara kapsamlı yanıtlar verilebilir.`;
    }
    else {
      response = `"${message}" mesajınızı aldım. Bu ${selectedModel.name} modelinin statik bir yanıtıdır.\n\nGitHub Pages üzerinde gerçek AI API çağrıları yapılamamaktadır. Gerçek uygulamada daha kapsamlı ve konuyla ilgili yanıtlar alırsınız.`;
    }
    
    // Create a new mock message
    const newMessage = {
      id: mockChatMessages.length + 1,
      userId: 1,
      userMessage: message,
      aiResponse: response,
      modelType: modelType || "openai",
      createdAt: new Date().toISOString()
    };
    
    // Add to mock history
    mockChatMessages.unshift(newMessage);
    
    return { success: true, message: newMessage };
  }

  try {
    const response = await apiRequest("POST", "/api/chat", { message, modelType });
    return await response.json();
  } catch (error) {
    throw new Error(`Sohbet mesajı gönderilirken hata oluştu: ${error}`);
  }
}

export async function getChatHistory() {
  if (isStaticMode()) {
    return mockChatMessages;
  }

  try {
    const response = await apiRequest("GET", "/api/chat/history");
    return await response.json();
  } catch (error) {
    console.error("API error, falling back to static data:", error);
    return mockChatMessages;
  }
}

// Image generation API
export async function generateImage(prompt: string, modelType?: string) {
  if (isStaticMode()) {
    const randomSeed = Math.floor(Math.random() * 1000);
    const selectedModel = mockModels.find(m => m.id === modelType) || mockModels[0];
    
    // Farklı modeller için farklı görsel URL'leri
    let imageUrl = '';
    
    switch (selectedModel.id) {
      case 'openai':
        imageUrl = `https://picsum.photos/seed/${randomSeed}/800/600?grayscale`;
        break;
      case 'huggingface':
        imageUrl = `https://picsum.photos/seed/${randomSeed}/800/600?blur=2`;
        break;
      case 'deepseek':
        imageUrl = `https://picsum.photos/seed/${randomSeed + 100}/800/600?blur=1`;
        break;
      case 'gemini':
        imageUrl = `https://picsum.photos/seed/${randomSeed + 200}/800/600`;
        break;
      case 'groq':
        imageUrl = `https://picsum.photos/seed/${randomSeed + 300}/800/600?grayscale&blur=1`;
        break;
      default:
        imageUrl = `https://picsum.photos/seed/${randomSeed}/800/600`;
    }
    
    // Create a new mock image
    const newImage = {
      id: mockImageGenerations.length + 1,
      userId: 1,
      prompt: prompt,
      imageUrl: imageUrl,
      modelType: modelType || "openai",
      createdAt: new Date().toISOString()
    };
    
    // Add to mock history
    mockImageGenerations.unshift(newImage);
    
    return { success: true, image: newImage };
  }

  try {
    const response = await apiRequest("POST", "/api/image/generate", { prompt, modelType });
    return await response.json();
  } catch (error) {
    throw new Error(`Görsel oluşturulurken hata oluştu: ${error}`);
  }
}

export async function getImageHistory() {
  if (isStaticMode()) {
    return mockImageGenerations;
  }

  try {
    const response = await apiRequest("GET", "/api/image/history");
    return await response.json();
  } catch (error) {
    console.error("API error, falling back to static data:", error);
    return mockImageGenerations;
  }
}

// Code generation API
export async function generateCode(prompt: string, language: string, modelType?: string) {
  if (isStaticMode()) {
    const selectedModel = mockModels.find(m => m.id === modelType) || mockModels[0];
    
    // Kod şablonları için farklı diller
    let codeTemplate = '';
    
    switch (language.toLowerCase()) {
      case 'javascript':
      case 'js':
        codeTemplate = `// Bu GitHub Pages üzerinde statik bir yanıttır
// Model: ${selectedModel.name}
// İstek: ${prompt}

function ${prompt.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 20)}() {
  console.log("Bu statik bir JavaScript kod örneğidir");
  
  // Varsayılan fonksiyon örneği
  const data = ["Örnek", "Veri", "Dizisi"];
  
  return data.map(item => {
    return item.toUpperCase();
  });
}

// Bu kodu çalıştırmak için:
// ${prompt.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 20)}();`;
        break;
      
      case 'python':
      case 'py':
        codeTemplate = `# Bu GitHub Pages üzerinde statik bir yanıttır
# Model: ${selectedModel.name}
# İstek: ${prompt}

def ${prompt.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 20)}():
    """
    ${prompt}
    """
    print("Bu statik bir Python kod örneğidir")
    
    # Varsayılan fonksiyon örneği
    data = ["Örnek", "Veri", "Listesi"]
    
    return [item.upper() for item in data]

# Bu kodu çalıştırmak için:
# result = ${prompt.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 20)}()
# print(result)`;
        break;
      
      case 'typescript':
      case 'ts':
        codeTemplate = `// Bu GitHub Pages üzerinde statik bir yanıttır
// Model: ${selectedModel.name}
// İstek: ${prompt}

interface SampleData {
  id: number;
  name: string;
  value: number;
}

function ${prompt.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 20)}(): SampleData[] {
  console.log("Bu statik bir TypeScript kod örneğidir");
  
  // Örnek veri
  const data: SampleData[] = [
    { id: 1, name: "Örnek1", value: 100 },
    { id: 2, name: "Örnek2", value: 200 },
    { id: 3, name: "Örnek3", value: 300 },
  ];
  
  return data.filter(item => item.value > 150);
}

// Bu kodu çalıştırmak için:
// const result = ${prompt.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 20)}();
// console.log(result);`;
        break;
      
      case 'html':
        codeTemplate = `<!-- Bu GitHub Pages üzerinde statik bir yanıttır -->
<!-- Model: ${selectedModel.name} -->
<!-- İstek: ${prompt} -->

<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${prompt}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${prompt}</h1>
    <p>Bu statik bir HTML kod örneğidir. GitHub Pages üzerinde gerçek API çağrıları yapılamaz.</p>
    <button onclick="alert('Merhaba Dünya!')">Tıkla</button>
  </div>
</body>
</html>`;
        break;
      
      case 'css':
        codeTemplate = `/* Bu GitHub Pages üzerinde statik bir yanıttır */
/* Model: ${selectedModel.name} */
/* İstek: ${prompt} */

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background-color: #0056b3;
  color: white;
  padding: 1rem;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 20px;
}

.button {
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #003d7a;
}

/* Mobil cihazlar için stil ayarlamaları */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .header {
    padding: 0.5rem;
  }
}`;
        break;
        
      default:
        codeTemplate = `// Bu GitHub Pages üzerinde statik bir yanıttır
// Model: ${selectedModel.name}
// Dil: ${language}
// İstek: ${prompt}

function mockCode() {
  console.log("Bu statik bir kod örneğidir");
  // GitHub Pages üzerinde gerçek API çağrıları yapılamaz
  return "Statik kod örneği";
}`;
    }
    
    // Create a new mock code generation
    const newCode = {
      id: mockCodeGenerations.length + 1,
      userId: 1,
      prompt: prompt,
      language: language,
      code: codeTemplate,
      modelType: modelType || "openai",
      createdAt: new Date().toISOString()
    };
    
    // Add to mock history
    mockCodeGenerations.unshift(newCode);
    
    return { success: true, code: newCode };
  }

  try {
    const response = await apiRequest("POST", "/api/code/generate", { prompt, language, modelType });
    return await response.json();
  } catch (error) {
    throw new Error(`Kod oluşturulurken hata oluştu: ${error}`);
  }
}

export async function getCodeHistory() {
  if (isStaticMode()) {
    return mockCodeGenerations;
  }

  try {
    const response = await apiRequest("GET", "/api/code/history");
    return await response.json();
  } catch (error) {
    console.error("API error, falling back to static data:", error);
    return mockCodeGenerations;
  }
}
