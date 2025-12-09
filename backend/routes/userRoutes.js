import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware, getUserProfile);
router.put('/me', authMiddleware, updateUserProfile);

export default router;
