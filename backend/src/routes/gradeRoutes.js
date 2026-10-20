import express from 'express';
import { getGradesByClass, getGradesByStudent, createGrade, updateGrade, deleteGrade, bulkSaveGrades } from '../controllers/gradeController.js';
import { verifyToken, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

// Teacher / Admin: manage grades
router.get('/class', authorize('Administrator', 'Teacher'), getGradesByClass);
router.post('/', authorize('Administrator', 'Teacher'), createGrade);
router.post('/bulk', authorize('Administrator', 'Teacher'), bulkSaveGrades);
router.put('/:id', authorize('Administrator', 'Teacher'), updateGrade);
router.delete('/:id', authorize('Administrator'), deleteGrade);

// Student / Parent: view grades
router.get('/student/:studentId', getGradesByStudent);

export default router;
