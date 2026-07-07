import express from 'express';
import { getRecommendations, saveProject } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/recommendations', protect, getRecommendations);
router.post('/save', protect, saveProject);

export default router;
