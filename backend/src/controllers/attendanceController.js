import Attendance from '../models/Attendance.js';

// GET attendance by class and date
export const getAttendanceByClass = async (req, res) => {
  try {
    const { className, date } = req.query;
    if (!className) return res.status(400).json({ success: false, message: 'Class name is required' });

    const filter = { class: className };
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }

    const records = await Attendance.find(filter).sort({ date: -1 });
    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching attendance', error: error.message });
  }
};

// GET attendance by student
export const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({ studentId }).sort({ date: -1 });
    const total = records.length;
    const present = records.filter((r) => r.status === 'present').length;
    const absent = records.filter((r) => r.status === 'absent').length;
    const late = records.filter((r) => r.status === 'late').length;
    const percentage = total > 0 ? Math.round(((present + late) / total) * 100) : 0;
    return res.status(200).json({ success: true, data: records, summary: { total, present, absent, late, percentage } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching student attendance', error: error.message });
  }
};

// POST save attendance (bulk)
export const saveAttendance = async (req, res) => {
  try {
    const { attendanceList, date, className } = req.body;
    if (!attendanceList || !Array.isArray(attendanceList) || !className) {
      return res.status(400).json({ success: false, message: 'attendanceList array and className are required' });
    }

    const attendanceDate = date ? new Date(date) : new Date();
    const results = [];

    for (const item of attendanceList) {
      const { studentId, studentName, rollNo, status, subject } = item;
      const start = new Date(attendanceDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(attendanceDate);
      end.setHours(23, 59, 59, 999);

      const record = await Attendance.findOneAndUpdate(
        { studentId, date: { $gte: start, $lte: end }, subject: subject || '' },
        { studentId, studentName, rollNo, class: className, date: attendanceDate, status, subject: subject || '', markedBy: req.userId },
        { upsert: true, new: true }
      );
      results.push(record);
    }

    return res.status(200).json({ success: true, message: 'Attendance saved successfully', count: results.length, data: results });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error saving attendance', error: error.message });
  }
};

// PUT update single attendance record
export const updateAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!record) return res.status(404).json({ success: false, message: 'Attendance record not found' });
    return res.status(200).json({ success: true, message: 'Attendance updated', data: record });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating attendance', error: error.message });
  }
};

// GET attendance summary for admin dashboard
export const getAttendanceSummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const todayRecords = await Attendance.find({ date: { $gte: today, $lte: end } });
    const present = todayRecords.filter((r) => r.status === 'present').length;
    const absent = todayRecords.filter((r) => r.status === 'absent').length;
    const late = todayRecords.filter((r) => r.status === 'late').length;

    return res.status(200).json({ success: true, data: { total: todayRecords.length, present, absent, late } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching summary', error: error.message });
  }
};
