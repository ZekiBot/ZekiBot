import { apiRequest } from "./queryClient";

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

// Get available AI models
export async function getAvailableModels() {
  try {
    const response = await apiRequest("GET", "/api/ai-models");
    return await response.json();
  } catch (error) {
    throw new Error(`AI modelleri yüklenirken hata oluştu: ${error}`);
  }
}

// Chat API
export async function sendChatMessage(message: string, modelType?: string) {
  try {
    const response = await apiRequest("POST", "/api/chat", { message, modelType });
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
export async function generateImage(prompt: string, modelType?: string) {
  try {
    const response = await apiRequest("POST", "/api/image/generate", { prompt, modelType });
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
export async function generateCode(prompt: string, language: string, modelType?: string) {
  try {
    const response = await apiRequest("POST", "/api/code/generate", { prompt, language, modelType });
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
