import express from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse
} from '../controllers/courseController.js';
import { authenticateToken, requireAdmin, requireTeacher } from '../middleware/auth.js';
import { validateCourse } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected routes
router.post('/:courseId/enroll', authenticateToken, enrollInCourse);

// Admin/Teacher routes
router.post('/', authenticateToken, requireTeacher, validateCourse, createCourse);
router.put('/:id', authenticateToken, requireTeacher, updateCourse);
router.delete('/:id', authenticateToken, requireAdmin, deleteCourse);

export default router;