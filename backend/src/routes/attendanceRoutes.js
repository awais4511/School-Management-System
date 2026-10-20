import express from 'express';
import { getAttendanceByClass, getAttendanceByStudent, saveAttendance, updateAttendance, getAttendanceSummary } from '../controllers/attendanceController.js';
import { verifyToken, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

// Admin summary
router.get('/summary', authorize('Administrator'), getAttendanceSummary);

// Teacher: mark attendance for class
router.get('/class', authorize('Administrator', 'Teacher'), getAttendanceByClass);
router.post('/', authorize('Administrator', 'Teacher'), saveAttendance);
router.put('/:id', authorize('Administrator', 'Teacher'), updateAttendance);

// Student / Parent: view attendance
router.get('/student/:studentId', getAttendanceByStudent);

export default router;
