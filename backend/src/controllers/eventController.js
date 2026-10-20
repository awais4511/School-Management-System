import Event from '../models/Event.js';

// GET all events
export const getAllEvents = async (req, res) => {
  try {
    const { targetAudience, category, upcoming } = req.query;
    const filter = { isActive: true };
    if (targetAudience && targetAudience !== 'all') filter.$or = [{ targetAudience }, { targetAudience: 'all' }];
    if (category) filter.category = category;
    if (upcoming === 'true') filter.date = { $gte: new Date() };

    const events = await Event.find(filter).sort({ date: 1 });
    return res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching events', error: error.message });
  }
};

// GET single event
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    return res.status(200).json({ success: true, data: event });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching event', error: error.message });
  }
};

// POST create event (Admin only)
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, endDate, location, category, targetAudience } = req.body;
    if (!title || !date) return res.status(400).json({ success: false, message: 'Title and date are required' });

    const event = await Event.create({
      title, description, date, endDate, location, category, targetAudience, createdBy: req.userId,
    });
    return res.status(201).json({ success: true, message: 'Event created', data: event });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating event', error: error.message });
  }
};

// PUT update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    return res.status(200).json({ success: true, message: 'Event updated', data: event });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating event', error: error.message });
  }
};

// DELETE event (soft delete)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    return res.status(200).json({ success: true, message: 'Event deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting event', error: error.message });
  }
};
