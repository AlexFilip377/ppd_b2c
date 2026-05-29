export type ChatRole = 'system' | 'user' | 'assistant';

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export const ASSISTANT_SYSTEM_PROMPT =
  'Ты AI-наставник по информационным системам. Помогаешь студентам разбирать ошибки в коде, объяснять концепции программирования, дизайна и работы с данными. Отвечай на языке пользователя.';

export const ASSISTANT_WELCOME = 'Какой вопрос Вас интересует сегодня?';
