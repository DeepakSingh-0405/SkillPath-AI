import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import { buildProjects } from '../services/contentService.js';

export const getRecommendations = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  const projects = buildProjects({ goal: profile?.learningGoal, level: profile?.currentLevel });
  res.json({ projects });
};

export const saveProject = async (req, res) => {
  const { title, description, difficulty, techStack, estimatedTime } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new Error('Project title and description are required.');
  }

  const project = await Project.create({
    user: req.user._id,
    title,
    description,
    difficulty,
    techStack,
    estimatedTime,
  });

  res.status(201).json({ project });
};
