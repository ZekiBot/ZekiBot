import { apiRequest } from "./queryClient";

// Chat API
export async function sendChatMessage(message: string) {
  try {
    const response = await apiRequest("POST", "/api/chat", { message });
    return await response.json();
  } catch (error) {
    throw new Error(`Sohbet mesajı gönderilirken hata oluştu: ${error}`);
  }
}

export async function getChatHistory() {
  try {
    const response = await apiRequest("GET", "/api/chat/history");
    return await response.json();
  } catch (error) {
    throw new Error(`Sohbet geçmişi yüklenirken hata oluştu: ${error}`);
  }
}

// Image generation API
export async function generateImage(prompt: string) {
  try {
    const response = await apiRequest("POST", "/api/image/generate", { prompt });
    return await response.json();
  } catch (error) {
    throw new Error(`Görsel oluşturulurken hata oluştu: ${error}`);
  }
}

export async function getImageHistory() {
  try {
    const response = await apiRequest("GET", "/api/image/history");
    return await response.json();
  } catch (error) {
    throw new Error(`Görsel geçmişi yüklenirken hata oluştu: ${error}`);
  }
}

// Code generation API
export async function generateCode(prompt: string, language: string) {
  try {
    const response = await apiRequest("POST", "/api/code/generate", { prompt, language });
    return await response.json();
  } catch (error) {
    throw new Error(`Kod oluşturulurken hata oluştu: ${error}`);
  }
}

export async function getCodeHistory() {
  try {
    const response = await apiRequest("GET", "/api/code/history");
    return await response.json();
  } catch (error) {
    throw new Error(`Kod geçmişi yüklenirken hata oluştu: ${error}`);
  }
}
