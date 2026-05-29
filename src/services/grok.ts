import { ChatMessage } from '../types/chat';

/** Groq API (ключ gsk_...) — OpenAI-совместимый chat/completions */
const GROQ_MODEL = 'llama-3.3-70b-versatile';
const API_BASE = 'https://api.groq.com/openai/v1';

function getApiKey(): string {
  const key = process.env.EXPO_PUBLIC_GROK_API_KEY;
  if (!key || key === 'your_grok_api_key_here') {
    throw new Error('Добавьте EXPO_PUBLIC_GROK_API_KEY в файл .env и перезапустите Expo (npx expo start -c)');
  }
  return key;
}

function mapMessages(messages: ChatMessage[]) {
  return messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));
}

function extractReplyText(data: unknown): string {
  const payload = data as {
    choices?: { message?: { content?: string } }[];
    error?: { message?: string };
  };

  if (payload.error?.message) {
    throw new Error(payload.error.message);
  }

  const text = payload.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error('Модель не вернула ответ. Попробуйте переформулировать вопрос.');
  }
  return text;
}

export async function callGrok(messages: ChatMessage[]): Promise<string> {
  const apiKey = getApiKey();

  const response = await fetch(`${API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: mapMessages(messages),
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Слишком много запросов. Подождите немного и попробуйте снова.');
    }
    const message = (data as { error?: { message?: string } })?.error?.message ?? `Ошибка API (${response.status})`;
    throw new Error(message);
  }

  return extractReplyText(data);
}
