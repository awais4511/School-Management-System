import express from 'express';
import { getAllFees, getFeesByStudent, createFee, markFeePaid, updateFee, deleteFee } from '../controllers/feeController.js';
import { verifyToken, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

// Admin: manage all fees
router.get('/', authorize('Administrator'), getAllFees);
router.post('/', authorize('Administrator'), createFee);
router.put('/:id', authorize('Administrator'), updateFee);
router.delete('/:id', authorize('Administrator'), deleteFee);

// Student & Parent: view fees, pay
router.get('/student/:studentId', getFeesByStudent);
router.patch('/:id/pay', markFeePaid);

export default router;
