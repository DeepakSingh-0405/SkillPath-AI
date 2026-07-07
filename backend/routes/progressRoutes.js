import express from 'express';
import { getProgress, updateStep } from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getProgress);
router.put('/step', protect, updateStep);

export default router;
