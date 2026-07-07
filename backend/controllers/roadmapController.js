import Roadmap from '../models/Roadmap.js';
import Progress from '../models/Progress.js';
import Profile from '../models/Profile.js';
import { buildRoadmap } from '../services/contentService.js';

export const getMyRoadmap = async (req, res) => {
  const roadmap = await Roadmap.findOne({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ roadmap });
};

export const regenerateRoadmap = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  const goal = req.body.goal || profile?.learningGoal;
  const level = req.body.level || profile?.currentLevel || 'beginner';
  const weeklyHours = Number(req.body.weeklyHours || profile?.weeklyHours || 5);

  if (!goal) {
    res.status(400);
    throw new Error('Set a learning goal before generating a roadmap.');
  }

  const roadmapData = buildRoadmap({ goal, level, weeklyHours });
  await Roadmap.deleteMany({ user: req.user._id });
  const roadmap = await Roadmap.create({ user: req.user._id, ...roadmapData });

  await Progress.findOneAndUpdate(
    { user: req.user._id },
    { roadmap: roadmap._id, completedSteps: [], totalSteps: roadmap.steps.length, percentComplete: 0, streak: 0 },
    { upsert: true },
  );

  res.status(201).json({ roadmap });
};
