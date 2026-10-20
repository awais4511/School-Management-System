import Teacher from '../models/Teacher.js';
import User from '../models/User.js';

// GET all teachers (admin)
export const getAllTeachers = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status === 'Active') filter.isActive = true;
    if (status === 'Inactive') filter.isActive = false;

    let teachers = await Teacher.find(filter)
      .populate('userId', 'firstName lastName email phone')
      .sort({ createdAt: -1 });

    if (search) {
      const q = search.toLowerCase();
      teachers = teachers.filter((t) => {
        const fullName = t.userId ? `${t.userId.firstName} ${t.userId.lastName}`.toLowerCase() : '';
        return (
          fullName.includes(q) ||
          t.employeeId.toLowerCase().includes(q) ||
          t.specialization.toLowerCase().includes(q) ||
          (t.userId?.email || '').toLowerCase().includes(q)
        );
      });
    }

    return res.status(200).json({ success: true, count: teachers.length, data: teachers });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching teachers', error: error.message });
  }
};

// GET single teacher
export const getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('userId', 'firstName lastName email phone');
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    return res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching teacher', error: error.message });
  }
};

// GET logged-in teacher's profile
export const getMyProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.userId }).populate('userId', 'firstName lastName email phone');
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher profile not found' });
    return res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching teacher profile', error: error.message });
  }
};

// POST create teacher (admin)
export const createTeacher = async (req, res) => {
  try {
    const { userId, employeeId, specialization, department, classesAssigned, subjectsTeaching, qualification, experience, dateOfJoining } = req.body;
    if (!employeeId || !specialization) {
      return res.status(400).json({ success: false, message: 'employeeId and specialization are required' });
    }

    const existing = await Teacher.findOne({ employeeId });
    if (existing) return res.status(409).json({ success: false, message: 'Employee ID already exists' });

    const teacher = await Teacher.create({
      userId, employeeId, specialization, department,
      classesAssigned: classesAssigned || [],
      subjectsTeaching: subjectsTeaching || [],
      qualification, experience, dateOfJoining,
    });
    return res.status(201).json({ success: true, message: 'Teacher created', data: teacher });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating teacher', error: error.message });
  }
};

// PUT update teacher
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    return res.status(200).json({ success: true, message: 'Teacher updated', data: teacher });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating teacher', error: error.message });
  }
};

// DELETE teacher (soft delete)
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    return res.status(200).json({ success: true, message: 'Teacher deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting teacher', error: error.message });
  }
};

// GET teacher stats for admin dashboard
export const getTeacherStats = async (req, res) => {
  try {
    const total = await Teacher.countDocuments();
    const active = await Teacher.countDocuments({ isActive: true });
    const inactive = total - active;
    return res.status(200).json({ success: true, data: { total, active, inactive } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching teacher stats', error: error.message });
  }
};
