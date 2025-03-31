import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Chat processing
export async function processChatMessage(message: string): Promise<string> {
  try {
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
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    throw new Error(`OpenAI API hatası: ${error.message}`);
  }
}

// Code generation
export async function generateCode(prompt: string, language: string): Promise<string> {
  try {
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
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    throw new Error(`OpenAI API hatası: ${error.message}`);
  }
}

// Image generation
export async function generateImage(prompt: string): Promise<string> {
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
    console.error("OpenAI API error:", error);
    throw new Error(`OpenAI API hatası: ${error.message}`);
  }
}