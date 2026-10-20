import express from 'express';
import { getAllAnnouncements, getAnnouncement, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/announcementController.js';
import { verifyToken, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

// All authenticated users can view announcements
router.get('/', getAllAnnouncements);
router.get('/:id', getAnnouncement);

// Admin only: create, update, delete
router.post('/', authorize('Administrator'), createAnnouncement);
router.put('/:id', authorize('Administrator'), updateAnnouncement);
router.delete('/:id', authorize('Administrator'), deleteAnnouncement);

export default router;
