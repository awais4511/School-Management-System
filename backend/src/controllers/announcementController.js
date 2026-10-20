import Announcement from '../models/Announcement.js';
import User from '../models/User.js';

// GET all announcements (filterable by role)
export const getAllAnnouncements = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = { isActive: true };

    // If role specified, return matching + 'all' role announcements
    if (role && role !== 'all') {
      filter.$or = [{ role }, { role: 'all' }];
    }

    const announcements = await Announcement.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: announcements.length, data: announcements });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching announcements', error: error.message });
  }
};

// GET single announcement
export const getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ success: false, message: 'Announcement not found' });
    return res.status(200).json({ success: true, data: announcement });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching announcement', error: error.message });
  }
};

// POST create announcement (Admin only)
export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, role, priority, expiresAt } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const author = await User.findById(req.userId);
    const authorName = author ? `${author.firstName} ${author.lastName}` : 'Admin';

    const announcement = await Announcement.create({
      title, content, role: role || 'all', priority: priority || 'medium',
      author: req.userId, authorName, expiresAt: expiresAt || null,
    });
    return res.status(201).json({ success: true, message: 'Announcement created', data: announcement });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating announcement', error: error.message });
  }
};

// PUT update announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!announcement) return res.status(404).json({ success: false, message: 'Announcement not found' });
    return res.status(200).json({ success: true, message: 'Announcement updated', data: announcement });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating announcement', error: error.message });
  }
};

// DELETE announcement (soft delete)
export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id, { isActive: false }, { new: true }
    );
    if (!announcement) return res.status(404).json({ success: false, message: 'Announcement not found' });
    return res.status(200).json({ success: true, message: 'Announcement deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting announcement', error: error.message });
  }
};
