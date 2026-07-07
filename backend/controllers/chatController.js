import ChatSession from '../models/ChatSession.js';
import Profile from '../models/Profile.js';
import { askGroq } from '../services/groqService.js';

export const sendMessage = async (req, res) => {
  const { message, sessionId } = req.body;
  if (!message?.trim()) {
    res.status(400);
    throw new Error('Message is required.');
  }

  const profile = await Profile.findOne({ user: req.user._id });
  let session = sessionId ? await ChatSession.findOne({ _id: sessionId, user: req.user._id }) : null;

  if (!session) {
    session = await ChatSession.create({
      user: req.user._id,
      title: message.slice(0, 48),
      messages: [],
    });
  }

  session.messages.push({ role: 'user', content: message });
  const recent = session.messages.slice(-8).map(({ role, content }) => ({ role, content }));

  const reply = await askGroq([
    { role: 'system', content: `You are SkillPath AI, a helpful education mentor. User goal: ${profile?.learningGoal || 'unknown'}, level: ${profile?.currentLevel || 'unknown'}. Keep answers practical and encouraging.` },
    ...recent,
  ]) || `Here is a practical way to approach it: break "${message}" into one concept to understand, one small exercise to build, and one checkpoint to verify. If you share where you are stuck, I can guide the next step more precisely.`;

  session.messages.push({ role: 'assistant', content: reply });
  await session.save();

  res.json({ reply, sessionId: session._id });
};

export const getHistory = async (req, res) => {
  const sessions = await ChatSession.find({ user: req.user._id }).sort({ updatedAt: -1 }).select('_id title updatedAt createdAt');
  res.json({ sessions });
};

export const getSession = async (req, res) => {
  const session = await ChatSession.findOne({ _id: req.params.id, user: req.user._id });
  if (!session) {
    res.status(404);
    throw new Error('Chat session not found.');
  }
  res.json({ session });
};
