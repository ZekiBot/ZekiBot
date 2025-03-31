import OpenAI from "openai";
import { HfInference } from "@huggingface/inference";
import { Groq } from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";

// API anahtarlarını alıyoruz
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Service clients
const openai = new OpenAI({ apiKey: OPENAI_API_KEY || "" });
const hf = new HfInference(HUGGINGFACE_API_KEY || "");
const groq = new Groq({ apiKey: GROQ_API_KEY || "" });
const geminiAI = new GoogleGenerativeAI(GEMINI_API_KEY || "");

// Tüm model servislerini içeren API türü enum
export enum AIModelType {
  OpenAI = "openai",
  HuggingFace = "huggingface",
  DeepSeek = "deepseek",
  Gemini = "gemini",
  Groq = "groq"
}

// Tüm yapay zeka modellerini tanımlayan arayüz
export interface AIModelService {
  id: AIModelType;
  name: string;
  description: string;
  pointCost: number;
  supportsChat: boolean;
  supportsImage: boolean;
  supportsCode: boolean;
}

// Kullanılabilir modellerin listesi
export const availableModels: AIModelService[] = [
  {
    id: AIModelType.OpenAI,
    name: "OpenAI",
    description: "En gelişmiş AI modellerinden GPT-4o ile sohbet edin veya görsel oluşturun.",
    pointCost: 10,
    supportsChat: true,
    supportsImage: true,
    supportsCode: true
  },
  {
    id: AIModelType.HuggingFace,
    name: "Hugging Face",
    description: "Açık kaynaklı dil modelleri ile sohbet edin.",
    pointCost: 5,
    supportsChat: true,
    supportsImage: false,
    supportsCode: true
  },
  {
    id: AIModelType.DeepSeek,
    name: "DeepSeek",
    description: "DeepSeek-Coder gibi uzmanlaşmış kod modelleri.",
    pointCost: 8,
    supportsChat: true,
    supportsImage: false, 
    supportsCode: true
  },
  {
    id: AIModelType.Gemini,
    name: "Gemini",
    description: "Google'ın Gemini AI dil modellerini kullanın.",
    pointCost: 8,
    supportsChat: true,
    supportsImage: false,
    supportsCode: true
  },
  {
    id: AIModelType.Groq,
    name: "Groq",
    description: "Ultra hızlı AI yanıtları için Groq modellerini kullanın.",
    pointCost: 6,
    supportsChat: true,
    supportsImage: false,
    supportsCode: true
  }
];

// Sohbet mesajlarını işleme
export async function processChatMessage(message: string, modelType: AIModelType = AIModelType.OpenAI): Promise<string> {
  try {
    switch (modelType) {
      case AIModelType.OpenAI:
        return await processOpenAIChatMessage(message);
      
      case AIModelType.HuggingFace:
        return await processHuggingFaceChatMessage(message);
      
      case AIModelType.DeepSeek:
        return await processDeepSeekChatMessage(message);
      
      case AIModelType.Gemini:
        return await processGeminiChatMessage(message);
      
      case AIModelType.Groq:
        return await processGroqChatMessage(message);
      
      default:
        throw new Error(`Model tipi desteklenmiyor: ${modelType}`);
    }
  } catch (error: any) {
    console.error(`${modelType} API hatası:`, error);
    throw new Error(`${modelType} API hatası: ${error.message}`);
  }
}

// Kod üretme
export async function generateCode(prompt: string, language: string, modelType: AIModelType = AIModelType.OpenAI): Promise<string> {
  try {
    switch (modelType) {
      case AIModelType.OpenAI:
        return await generateOpenAICode(prompt, language);
      
      case AIModelType.HuggingFace:
        return await generateHuggingFaceCode(prompt, language);
      
      case AIModelType.DeepSeek:
        return await generateDeepSeekCode(prompt, language);
      
      case AIModelType.Gemini:
        return await generateGeminiCode(prompt, language);
      
      case AIModelType.Groq:
        return await generateGroqCode(prompt, language);
      
      default:
        throw new Error(`Model tipi desteklenmiyor: ${modelType}`);
    }
  } catch (error: any) {
    console.error(`${modelType} API hatası:`, error);
    throw new Error(`${modelType} API hatası: ${error.message}`);
  }
}

// Görsel oluşturma (şu anda sadece OpenAI destekliyor)
export async function generateImage(prompt: string, modelType: AIModelType = AIModelType.OpenAI): Promise<string> {
  if (modelType !== AIModelType.OpenAI) {
    throw new Error("Görsel oluşturma şu anda sadece OpenAI tarafından desteklenmektedir.");
  }
  
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${prompt}. Yüksek kaliteli, gerçekçi bir görsel.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data[0].url || "";
  } catch (error: any) {
    console.error("OpenAI API görsel oluşturma hatası:", error);
    throw new Error(`OpenAI API görsel oluşturma hatası: ${error.message}`);
  }
}

// OpenAI sohbet implementasyonu
async function processOpenAIChatMessage(message: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "Sen ZekiBot adlı bir yapay zeka asistanısın. Yardımcı, kibar ve bilgilendirici ol. Türkçe olarak cevap ver."
      },
      {
        role: "user",
        content: message
      }
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return response.choices[0].message.content || "Üzgünüm, bir cevap oluşturamadım.";
}

// Hugging Face sohbet implementasyonu
async function processHuggingFaceChatMessage(message: string): Promise<string> {
  try {
    // Mistral 7B modeli kullanıyoruz (veya başka bir model tercih edebilirsiniz)
    const result = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.1",
      inputs: `<s>[INST] Sen ZekiBot adlı Türkçe konuşan bir yapay zeka asistanısın. 
      Kullanıcıya kibar ve yardımcı olmaya çalış. 
      
      Kullanıcı: ${message} [/INST]</s>`,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.1
      }
    });

    // Cevabı ayıklama
    let response = result.generated_text || "";
    if (response.includes("[/INST]")) {
      response = response.split("[/INST]")[1].trim();
    }
    
    return response || "Üzgünüm, bir cevap oluşturamadım.";
  } catch (error) {
    console.error("Hugging Face API hatası:", error);
    throw new Error(`Hugging Face API hatası: ${error}`);
  }
}

// DeepSeek sohbet implementasyonu
async function processDeepSeekChatMessage(message: string): Promise<string> {
  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "Sen ZekiBot adlı bir yapay zeka asistanısın. Türkçe konuşan kullanıcılara yardımcı, kibar ve bilgilendirici şekilde yanıt veriyorsun."
          },
          {
            role: "user", 
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || "DeepSeek API yanıt vermiyor");
    }

    return data.choices?.[0]?.message?.content || "Üzgünüm, bir cevap oluşturamadım.";
  } catch (error) {
    console.error("DeepSeek API hatası:", error);
    throw new Error(`DeepSeek API hatası: ${error}`);
  }
}

// Gemini sohbet implementasyonu
async function processGeminiChatMessage(message: string): Promise<string> {
  try {
    const model = geminiAI.getGenerativeModel({ model: "gemini-pro" });
    
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Sen ZekiBot adlı Türkçe konuşan bir yapay zeka asistanısın." }],
        },
        {
          role: "model",
          parts: [{ text: "Merhaba! Ben ZekiBot, size nasıl yardımcı olabilirim? Türkçe olarak sorularınızı yanıtlamaktan memnuniyet duyarım." }],
        },
      ]
    });
    
    const result = await chat.sendMessage(message);
    const response = result.response;
    
    return response.text() || "Üzgünüm, bir cevap oluşturamadım.";
  } catch (error) {
    console.error("Gemini API hatası:", error);
    throw new Error(`Gemini API hatası: ${error}`);
  }
}

// Groq sohbet implementasyonu
async function processGroqChatMessage(message: string): Promise<string> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Sen ZekiBot adlı bir yapay zeka asistanısın. Türkçe konuşan kullanıcılara yardımcı, kibar ve bilgilendirici şekilde yanıt veriyorsun."
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "llama2-70b-4096",
      temperature: 0.7,
      max_tokens: 500,
    });

    return chatCompletion.choices[0]?.message?.content || "Üzgünüm, bir cevap oluşturamadım.";
  } catch (error) {
    console.error("Groq API hatası:", error);
    throw new Error(`Groq API hatası: ${error}`);
  }
}

// OpenAI kod üretme
async function generateOpenAICode(prompt: string, language: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `Sen bir kod yazma asistanısın. Kullanıcıların isteklerine göre ${language} dilinde kod yazıyorsun. 
        Sadece kodu döndür, açıklama veya ek bilgi verme.`
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 1000,
  });

  return response.choices[0].message.content || "// Kod oluşturulamadı";
}

// Hugging Face kod üretme
async function generateHuggingFaceCode(prompt: string, language: string): Promise<string> {
  try {
    // Code Llama veya benzer bir kod odaklı model kullanabiliriz
    const result = await hf.textGeneration({
      model: "codellama/CodeLlama-34b-Instruct-hf",
      inputs: `<s>[INST] Aşağıdaki ${language} kodunu yaz:
      
      ${prompt} [/INST]</s>`,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.3,
        top_p: 0.95,
        repetition_penalty: 1.05
      }
    });

    // Cevabı ayıklama
    let code = result.generated_text || "";
    if (code.includes("[/INST]")) {
      code = code.split("[/INST]")[1].trim();
    }
    
    return code || "// Kod oluşturulamadı";
  } catch (error) {
    console.error("Hugging Face API kod üretme hatası:", error);
    throw new Error(`Hugging Face API kod üretme hatası: ${error}`);
  }
}

// DeepSeek kod üretme
async function generateDeepSeekCode(prompt: string, language: string): Promise<string> {
  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-coder",
        messages: [
          {
            role: "system",
            content: `Sen bir kod yazma asistanısın. Kullanıcıların isteklerine göre ${language} dilinde kod yazıyorsun. 
            Sadece kodu döndür, açıklama veya ek bilgi verme.`
          },
          {
            role: "user", 
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || "DeepSeek API yanıt vermiyor");
    }

    return data.choices?.[0]?.message?.content || "// Kod oluşturulamadı";
  } catch (error) {
    console.error("DeepSeek API kod üretme hatası:", error);
    throw new Error(`DeepSeek API kod üretme hatası: ${error}`);
  }
}

// Gemini kod üretme
async function generateGeminiCode(prompt: string, language: string): Promise<string> {
  try {
    const model = geminiAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(`
      Sen bir kod yazma asistanısın. Sadece ${language} dilinde kod yazmalısın.
      Yorum satırları veya açıklamalar yazma.
      Sadece işleyen kod üretmelisin.
      
      İstek: ${prompt}
    `);
    
    const response = result.response;
    return response.text() || "// Kod oluşturulamadı";
  } catch (error) {
    console.error("Gemini API kod üretme hatası:", error);
    throw new Error(`Gemini API kod üretme hatası: ${error}`);
  }
}

// Groq kod üretme
async function generateGroqCode(prompt: string, language: string): Promise<string> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Sen bir kod yazma asistanısın. Kullanıcıların isteklerine göre ${language} dilinde kod yazıyorsun. 
          Sadece kodu döndür, açıklama veya ek bilgi verme.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama2-70b-4096",
      temperature: 0.3,
      max_tokens: 1000,
    });

    return chatCompletion.choices[0]?.message?.content || "// Kod oluşturulamadı";
  } catch (error) {
    console.error("Groq API kod üretme hatası:", error);
    throw new Error(`Groq API kod üretme hatası: ${error}`);
  }
}