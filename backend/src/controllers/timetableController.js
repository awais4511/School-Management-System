import Timetable from '../models/Timetable.js';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// GET timetable for a class (all days)
export const getTimetableByClass = async (req, res) => {
  try {
    const { className, academicYear } = req.query;
    if (!className) return res.status(400).json({ success: false, message: 'Class name is required' });

    const filter = { class: className, isActive: true };
    if (academicYear) filter.academicYear = academicYear;

    const timetable = await Timetable.find(filter).sort({ day: 1 });
    return res.status(200).json({ success: true, count: timetable.length, data: timetable });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching timetable', error: error.message });
  }
};

// GET timetable for a teacher (across all classes)
export const getTimetableByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const timetable = await Timetable.find({ 'periods.teacherId': teacherId, isActive: true }).sort({ day: 1 });
    return res.status(200).json({ success: true, count: timetable.length, data: timetable });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching teacher timetable', error: error.message });
  }
};

// POST create or update timetable for a class/day
export const saveTimetable = async (req, res) => {
  try {
    const { class: cls, day, periods, academicYear } = req.body;
    if (!cls || !day || !periods) {
      return res.status(400).json({ success: false, message: 'class, day, and periods are required' });
    }
    if (!DAYS.includes(day)) {
      return res.status(400).json({ success: false, message: `Day must be one of: ${DAYS.join(', ')}` });
    }

    const timetable = await Timetable.findOneAndUpdate(
      { class: cls, day },
      { class: cls, day, periods, academicYear, isActive: true },
      { upsert: true, new: true, runValidators: true }
    );
    return res.status(200).json({ success: true, message: 'Timetable saved successfully', data: timetable });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error saving timetable', error: error.message });
  }
};

// DELETE timetable entry
export const deleteTimetable = async (req, res) => {
  try {
    const entry = await Timetable.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!entry) return res.status(404).json({ success: false, message: 'Timetable entry not found' });
    return res.status(200).json({ success: true, message: 'Timetable entry deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting timetable entry', error: error.message });
  }
};
