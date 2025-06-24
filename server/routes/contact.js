import express from 'express';
import {
  createContactMessage,
  getAllContactMessages,
  updateContactMessageStatus,
  subscribeNewsletter
} from '../controllers/contactController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { validateContactMessage } from '../middleware/validation.js';
import { body } from 'express-validator';

const router = express.Router();

// Public routes
router.post('/message', validateContactMessage, createContactMessage);
router.post('/newsletter', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email')
], subscribeNewsletter);

// Admin routes
router.get('/messages', authenticateToken, requireAdmin, getAllContactMessages);
router.put('/messages/:id/status', authenticateToken, requireAdmin, updateContactMessageStatus);

export default router;