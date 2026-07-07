import express from 'express';
import { generateLesson, generateQuiz } from '../controllers/learningController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/lesson', protect, generateLesson);
router.post('/quiz', protect, generateQuiz);

export default router;
