import express from 'express';
import { getConversations, getMessages, sendMessage, deleteMessage, getUnreadCount } from '../controllers/messageController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

// All authenticated users can use messaging
router.get('/conversations', getConversations);
router.get('/unread', getUnreadCount);
router.get('/:receiverId', getMessages);
router.post('/', sendMessage);
router.delete('/:id', deleteMessage);

export default router;
