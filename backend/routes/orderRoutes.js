import express from 'express';
import {
	createOrder,
	getMyOrders,
	getAllOrders,
	updateOrderStatus,
	createOrderForUser
} from '../controllers/orderController.js';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/my', authMiddleware, getMyOrders);
router.get('/', authMiddleware, adminOnly, getAllOrders);
router.put('/:id/status', authMiddleware, adminOnly, updateOrderStatus);
router.post('/admin', authMiddleware, adminOnly, createOrderForUser);

export default router;
