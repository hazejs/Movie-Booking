import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
} from '../controllers/order.controller';
import { authenticateToken } from '../middlware/auth.middleware';
import { isAdmin } from '../middlware/admin.middleware';

const router = express.Router();

router.post('/', authenticateToken, createOrder);
router.get('/', isAdmin, getAllOrders);
router.get('/:id', authenticateToken, getOrderById);
router.put('/:id', authenticateToken, updateOrder);
router.delete('/:id', authenticateToken, deleteOrder);
router.get('/:userId', authenticateToken, getOrdersByUserId);

export default router;
