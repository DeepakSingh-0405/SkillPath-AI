import express from 'express';
import { upsertProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, upsertProfile);

export default router;
