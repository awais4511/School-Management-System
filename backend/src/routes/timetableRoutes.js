import express from 'express';
import { getTimetableByClass, getTimetableByTeacher, saveTimetable, deleteTimetable } from '../controllers/timetableController.js';
import { verifyToken, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

// All users can view timetables
router.get('/class', getTimetableByClass);
router.get('/teacher/:teacherId', getTimetableByTeacher);

// Admin only: create, update, delete
router.post('/', authorize('Administrator'), saveTimetable);
router.delete('/:id', authorize('Administrator'), deleteTimetable);

export default router;
