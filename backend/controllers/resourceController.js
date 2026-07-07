import Resource from '../models/Resource.js';
import { defaultResources } from '../services/contentService.js';

export const getResources = async (req, res) => {
  const resources = await Resource.find().sort({ createdAt: -1 });
  res.json({ resources: resources.length ? resources : defaultResources });
};
