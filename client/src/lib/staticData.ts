// GitHub Pages statik yayını için örnek veri
import { AIModel } from './openai';

export const mockModels: AIModel[] = [
  {
    id: "openai",
    name: "OpenAI GPT-4",
    description: "En gelişmiş dil modeli",
    pointCost: 5,
    supportsChat: true,
    supportsImage: true,
    supportsCode: true,
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    description: "Açık kaynaklı dil modelleri",
    pointCost: 3,
    supportsChat: true,
    supportsImage: false,
    supportsCode: true,
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "Derin öğrenme modeli",
    pointCost: 4,
    supportsChat: true,
    supportsImage: false,
    supportsCode: true,
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Google'ın çok modlu AI modeli",
    pointCost: 5,
    supportsChat: true,
    supportsImage: true,
    supportsCode: true,
  },
  {
    id: "groq",
    name: "Groq",
    description: "Yüksek performanslı AI",
    pointCost: 4,
    supportsChat: true,
    supportsImage: false,
    supportsCode: true,
  },
];

export const mockUser = {
  id: 1,
  username: "demo_kullanici",
  email: "demo@zekibot.com",
  points: 100,
  isAdmin: false,
  photoURL: "https://ui-avatars.com/api/?name=Demo+User&background=random"
};

export const mockChatMessages = [
  {
    id: 1,
    userId: 1,
    userMessage: "Merhaba, bugün nasılsın?",
    aiResponse: "Merhaba! Ben bir yapay zeka asistanıyım, bu yüzden duygular hissetmiyorum, ancak size yardımcı olmaktan memnuniyet duyarım! Size nasıl yardımcı olabilirim?",
    modelType: "openai",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 1,
    userMessage: "Türkiye'nin başkenti neresidir?",
    aiResponse: "Türkiye'nin başkenti Ankara'dır. Ankara, Türkiye'nin İç Anadolu Bölgesi'nde yer almakta olup, 13 Ekim 1923 tarihinde T.C.'nin başkenti ilan edilmiştir.",
    modelType: "gemini",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 gün önce
  }
];

export const mockImageGenerations = [
  {
    id: 1,
    userId: 1,
    prompt: "Boğaz'da gün batımı manzarası, yağlı boya tablo",
    imageUrl: "https://picsum.photos/seed/sunset/800/600",
    modelType: "openai",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 1,
    prompt: "Kapadokya'da sıcak hava balonları, minimalist çizim",
    imageUrl: "https://picsum.photos/seed/balloons/800/600",
    modelType: "gemini",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 gün önce
  }
];

export const mockCodeGenerations = [
  {
    id: 1,
    userId: 1,
    prompt: "React'te Todo listesi komponenti oluştur",
    language: "javascript",
    code: `import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className="todo-list">
      <h2>Yapılacaklar Listesi</h2>
      <div className="add-todo">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yeni görev ekle..."
        />
        <button onClick={addTodo}>Ekle</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTodo(index)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;`,
    modelType: "openai",
    createdAt: new Date().toISOString(),
  }
];

export const mockTransactions = [
  {
    id: 1,
    userId: 1,
    points: 50,
    type: "BONUS",
    description: "Günlük giriş bonusu",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 1,
    points: -5,
    type: "CHAT",
    description: "Chat kullanımı",
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 saat önce
  },
  {
    id: 3,
    userId: 1,
    points: -10,
    type: "IMAGE",
    description: "Görsel oluşturma",
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 saat önce
  }
];