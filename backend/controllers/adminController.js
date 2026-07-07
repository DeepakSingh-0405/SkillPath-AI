import User from '../models/User.js';
import Roadmap from '../models/Roadmap.js';
import ChatSession from '../models/ChatSession.js';
import Resource from '../models/Resource.js';
import { defaultResources } from '../services/contentService.js';

export const getStats = async (req, res) => {
  const [totalUsers, activeRoadmaps, totalChats, totalResources] = await Promise.all([
    User.countDocuments(),
    Roadmap.countDocuments(),
    ChatSession.countDocuments(),
    Resource.countDocuments(),
  ]);

  res.json({ stats: { totalUsers, activeRoadmaps, totalChats, totalResources: totalResources || defaultResources.length } });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ users });
};

export const updateUserStatus = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: Boolean(req.body.isActive) }, { new: true }).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found.');
  }
  res.json({ user });
};

export const createResource = async (req, res) => {
  const resource = await Resource.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ resource });
};

export const updateResource = async (req, res) => {
  const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!resource) {
    res.status(404);
    throw new Error('Resource not found.');
  }
  res.json({ resource });
};

export const deleteResource = async (req, res) => {
  const resource = await Resource.findByIdAndDelete(req.params.id);
  if (!resource) {
    res.status(404);
    throw new Error('Resource not found.');
  }
  res.json({ message: 'Resource deleted.' });
};
