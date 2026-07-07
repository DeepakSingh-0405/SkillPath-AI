import express from 'express';
import {
  getStats,
  getAllUsers,
  updateUserStatus,
  createResource,
  updateResource,
  deleteResource,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, admin);

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUserStatus);
router.post('/resources', createResource);
router.put('/resources/:id', updateResource);
router.delete('/resources/:id', deleteResource);

export default router;
