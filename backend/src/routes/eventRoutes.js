import express from 'express';
import { getAllEvents, getEvent, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { verifyToken, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

// All authenticated users can view events
router.get('/', getAllEvents);
router.get('/:id', getEvent);

// Admin only: create, update, delete
router.post('/', authorize('Administrator'), createEvent);
router.put('/:id', authorize('Administrator'), updateEvent);
router.delete('/:id', authorize('Administrator'), deleteEvent);

export default router;
