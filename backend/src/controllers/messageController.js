import Message from '../models/Message.js';
import User from '../models/User.js';

// Helper: generate consistent conversationId between two users
const getConversationId = (id1, id2) => [id1, id2].sort().join('_');

// GET all conversations for current user
export const getConversations = async (req, res) => {
  try {
    const userId = req.userId;

    // Find latest message per conversation involving this user
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: { $eq: userId } }, { receiver: { $eq: userId } }],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$conversationId',
          lastMessage: { $first: '$text' },
          timestamp: { $first: '$createdAt' },
          senderName: { $first: '$senderName' },
          receiverName: { $first: '$receiverName' },
          sender: { $first: '$sender' },
          receiver: { $first: '$receiver' },
          unreadCount: {
            $sum: { $cond: [{ $and: [{ $eq: ['$receiver', userId] }, { $eq: ['$isRead', false] }] }, 1, 0] },
          },
        },
      },
      { $sort: { timestamp: -1 } },
    ]);

    return res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching conversations', error: error.message });
  }
};

// GET messages in a conversation
export const getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const conversationId = getConversationId(req.userId.toString(), receiverId);

    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      { conversationId, receiver: req.userId, isRead: false },
      { isRead: true }
    );

    return res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching messages', error: error.message });
  }
};

// POST send a message
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    if (!receiverId || !text) {
      return res.status(400).json({ success: false, message: 'receiverId and text are required' });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ success: false, message: 'Receiver not found' });

    const sender = await User.findById(req.userId);
    const conversationId = getConversationId(req.userId.toString(), receiverId);

    const message = await Message.create({
      conversationId,
      sender: req.userId,
      senderName: sender ? `${sender.firstName} ${sender.lastName}` : '',
      receiver: receiverId,
      receiverName: `${receiver.firstName} ${receiver.lastName}`,
      text,
    });

    return res.status(201).json({ success: true, message: 'Message sent', data: message });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error sending message', error: error.message });
  }
};

// DELETE a message
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
    if (message.sender.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this message' });
    }
    await message.deleteOne();
    return res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting message', error: error.message });
  }
};

// GET unread message count for current user
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({ receiver: req.userId, isRead: false });
    return res.status(200).json({ success: true, unreadCount: count });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching unread count', error: error.message });
  }
};
