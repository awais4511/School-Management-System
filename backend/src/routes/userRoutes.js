import express from 'express';
import { verifyToken, authorize } from '../middleware/authMiddleware.js';
import {
  getAllUsers,
  getUsersByRole,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

// Protected routes - only Admin can access
router.get('/', verifyToken, authorize('Administrator'), getAllUsers);
router.get('/role/:role', verifyToken, authorize('Administrator'), getUsersByRole);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, authorize('Administrator'), deleteUser);

export default router;
