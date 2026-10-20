import express from 'express';
import { getAllClasses, getClass, createClass, updateClass, deleteClass, addStudentToClass, removeStudentFromClass } from '../controllers/classController.js';
import { verifyToken, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', getAllClasses);
router.get('/:id', getClass);
router.post('/', authorize('Administrator'), createClass);
router.put('/:id', authorize('Administrator'), updateClass);
router.delete('/:id', authorize('Administrator'), deleteClass);

// Manage students inside a class
router.post('/:id/students', authorize('Administrator'), addStudentToClass);
router.delete('/:id/students/:studentId', authorize('Administrator'), removeStudentFromClass);

export default router;
