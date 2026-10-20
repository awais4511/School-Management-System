import express from 'express';
import { verifyToken, authorize } from '../middleware/authMiddleware.js';
import {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from '../controllers/assignmentController.js';

const router = express.Router();

// Public routes
router.get('/', getAssignments);
router.get('/:id', getAssignmentById);

// Protected routes - only Teachers can create/update/delete
router.post('/', verifyToken, authorize('Teacher', 'Administrator'), createAssignment);
router.put('/:id', verifyToken, authorize('Teacher', 'Administrator'), updateAssignment);
router.delete('/:id', verifyToken, authorize('Teacher', 'Administrator'), deleteAssignment);

export default router;
