const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const askGroq = async (messages, { temperature = 0.4, maxTokens = 900 } = {}) => {
  if (!process.env.GROQ_API_KEY) return null;

  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || null;
};
