import express from 'express';
import {
  getAllBlogPosts,
  getBlogPostById,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../controllers/blogController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { validateBlogPost } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllBlogPosts);
router.get('/:id', getBlogPostById);
router.get('/slug/:slug', getBlogPostBySlug);

// Admin routes
router.post('/', authenticateToken, requireAdmin, validateBlogPost, createBlogPost);
router.put('/:id', authenticateToken, requireAdmin, updateBlogPost);
router.delete('/:id', authenticateToken, requireAdmin, deleteBlogPost);

export default router;