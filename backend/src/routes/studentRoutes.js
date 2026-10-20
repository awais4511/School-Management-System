import express from 'express';
import { getAllStudents, getStudent, getMyProfile, createStudent, updateStudent, deleteStudent, getStudentStats } from '../controllers/studentController.js';
import { verifyToken, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

// Admin: manage all students
router.get('/', authorize('Administrator', 'Teacher'), getAllStudents);
router.get('/stats', authorize('Administrator'), getStudentStats);
router.post('/', authorize('Administrator'), createStudent);
router.put('/:id', authorize('Administrator'), updateStudent);
router.delete('/:id', authorize('Administrator'), deleteStudent);

// Student: view own profile
router.get('/me', getMyProfile);
router.get('/:id', getStudent);

export default router;
