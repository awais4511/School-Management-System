import express from 'express';
import { getAllTeachers, getTeacher, getMyProfile, createTeacher, updateTeacher, deleteTeacher, getTeacherStats } from '../controllers/teacherController.js';
import { verifyToken, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

// Admin: manage all teachers
router.get('/', authorize('Administrator'), getAllTeachers);
router.get('/stats', authorize('Administrator'), getTeacherStats);
router.post('/', authorize('Administrator'), createTeacher);
router.put('/:id', authorize('Administrator'), updateTeacher);
router.delete('/:id', authorize('Administrator'), deleteTeacher);

// Teacher: view own profile
router.get('/me', authorize('Teacher'), getMyProfile);
router.get('/:id', getTeacher);

export default router;
