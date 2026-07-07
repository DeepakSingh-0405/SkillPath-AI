import express from 'express';
import { sendMessage, getHistory, getSession } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/history', protect, getHistory);
router.get('/history/:id', protect, getSession);

export default router;
