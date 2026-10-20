import Student from '../models/Student.js';
import User from '../models/User.js';

// GET all students (admin)
export const getAllStudents = async (req, res) => {
  try {
    const { class: cls, search, isActive } = req.query;
    const filter = {};
    if (cls) filter.class = cls;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    let students = await Student.find(filter).populate('userId', 'firstName lastName email phone').sort({ rollNo: 1 });

    if (search) {
      const q = search.toLowerCase();
      students = students.filter((s) => {
        const fullName = s.userId ? `${s.userId.firstName} ${s.userId.lastName}`.toLowerCase() : '';
        return fullName.includes(q) || s.rollNo.toLowerCase().includes(q) || s.class.toLowerCase().includes(q);
      });
    }

    return res.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching students', error: error.message });
  }
};

// GET single student
export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('userId', 'firstName lastName email phone');
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    return res.status(200).json({ success: true, data: student });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching student', error: error.message });
  }
};

// GET student profile (for logged-in student)
export const getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId }).populate('userId', 'firstName lastName email phone');
    if (!student) return res.status(404).json({ success: false, message: 'Student profile not found' });
    return res.status(200).json({ success: true, data: student });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching profile', error: error.message });
  }
};

// POST create student (admin creates, links to User)
export const createStudent = async (req, res) => {
  try {
    const { userId, rollNo, class: cls, section, fatherName, motherName, parentEmail, dateOfBirth, subjects } = req.body;
    if (!rollNo || !cls) return res.status(400).json({ success: false, message: 'rollNo and class are required' });

    const existing = await Student.findOne({ rollNo });
    if (existing) return res.status(409).json({ success: false, message: 'Roll number already exists' });

    const student = await Student.create({ userId, rollNo, class: cls, section, fatherName, motherName, parentEmail, dateOfBirth, subjects: subjects || [] });
    return res.status(201).json({ success: true, message: 'Student created', data: student });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating student', error: error.message });
  }
};

// PUT update student
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    return res.status(200).json({ success: true, message: 'Student updated', data: student });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating student', error: error.message });
  }
};

// DELETE student (soft delete)
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    return res.status(200).json({ success: true, message: 'Student deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting student', error: error.message });
  }
};

// GET dashboard stats for admin
export const getStudentStats = async (req, res) => {
  try {
    const total = await Student.countDocuments({ isActive: true });
    const byClass = await Student.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$class', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    return res.status(200).json({ success: true, data: { total, byClass } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching student stats', error: error.message });
  }
};
