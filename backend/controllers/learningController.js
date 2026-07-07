import { askGroq } from '../services/groqService.js';
import { buildLesson, buildQuiz } from '../services/contentService.js';

export const generateLesson = async (req, res) => {
  const { topic, description } = req.body;
  if (!topic) {
    res.status(400);
    throw new Error('Topic is required.');
  }

  const lesson = await askGroq([
    { role: 'system', content: 'You are a concise learning coach. Return markdown only.' },
    { role: 'user', content: `Create a practical lesson for "${topic}". Context: ${description || 'No extra context'}. Include key ideas, example, practice task, and checkpoint.` },
  ], { maxTokens: 1200 }) || buildLesson(topic, description);

  res.json({ lesson });
};

export const generateQuiz = async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    res.status(400);
    throw new Error('Topic is required.');
  }

  const prompt = `Return only JSON array of 3 quiz objects for ${topic}. Each object must have question, options array of 4 strings, correctIndex number, and explanation.`;
  const aiText = await askGroq([
    { role: 'system', content: 'You return valid JSON only.' },
    { role: 'user', content: prompt },
  ]);

  let quiz = buildQuiz(topic);
  if (aiText) {
    try {
      const parsed = JSON.parse(aiText.replace(/^```json|```$/g, '').trim());
      if (Array.isArray(parsed) && parsed.length) quiz = parsed;
    } catch {}
  }

  res.json({ quiz });
};
