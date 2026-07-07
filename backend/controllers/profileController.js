import Profile from '../models/Profile.js';
import Roadmap from '../models/Roadmap.js';
import Progress from '../models/Progress.js';
import { buildRoadmap } from '../services/contentService.js';

export const upsertProfile = async (req, res) => {
  const { learningGoal, currentLevel, weeklyHours } = req.body;
  if (!learningGoal || !currentLevel || !weeklyHours) {
    res.status(400);
    throw new Error('Learning goal, current level, and weekly hours are required.');
  }

  const profile = await Profile.findOneAndUpdate(
    { user: req.user._id },
    { learningGoal, currentLevel, weeklyHours },
    { new: true, upsert: true, runValidators: true },
  );

  const roadmapData = buildRoadmap({ goal: learningGoal, level: currentLevel, weeklyHours: Number(weeklyHours) });
  await Roadmap.deleteMany({ user: req.user._id });
  const roadmap = await Roadmap.create({ user: req.user._id, ...roadmapData });

  const progress = await Progress.findOneAndUpdate(
    { user: req.user._id },
    { roadmap: roadmap._id, completedSteps: [], totalSteps: roadmap.steps.length, percentComplete: 0, streak: 0 },
    { new: true, upsert: true },
  );

  res.status(201).json({ profile, roadmap, progress });
};
