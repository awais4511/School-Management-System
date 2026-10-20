import express from 'express';
import { getAllParents, getParent, createParent, updateParent, deleteParent, addStudentToParent } from '../controllers/parentController.js';
import { verifyToken, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

// Admin: full CRUD
router.get('/', authorize('Administrator'), getAllParents);
router.get('/:id', authorize('Administrator'), getParent);
router.post('/', authorize('Administrator'), createParent);
router.put('/:id', authorize('Administrator'), updateParent);
router.delete('/:id', authorize('Administrator'), deleteParent);
router.post('/:id/students', authorize('Administrator'), addStudentToParent);

export default router;
