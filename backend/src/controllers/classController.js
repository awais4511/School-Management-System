import Class from '../models/Class.js';

// GET all classes
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({ isActive: true }).sort({ name: 1 });
    return res.status(200).json({ success: true, count: classes.length, data: classes });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching classes', error: error.message });
  }
};

// GET single class
export const getClass = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id);
    if (!cls) return res.status(404).json({ success: false, message: 'Class not found' });
    return res.status(200).json({ success: true, data: cls });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching class', error: error.message });
  }
};

// POST create class
export const createClass = async (req, res) => {
  try {
    const { name, grade, section, classTeacherName, subjects, capacity } = req.body;
    if (!name || !grade) {
      return res.status(400).json({ success: false, message: 'Name and grade are required' });
    }
    const existing = await Class.findOne({ name });
    if (existing) return res.status(409).json({ success: false, message: 'Class already exists' });

    const cls = await Class.create({ name, grade, section, classTeacherName, subjects, capacity });
    return res.status(201).json({ success: true, message: 'Class created successfully', data: cls });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating class', error: error.message });
  }
};

// PUT update class
export const updateClass = async (req, res) => {
  try {
    const cls = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cls) return res.status(404).json({ success: false, message: 'Class not found' });
    return res.status(200).json({ success: true, message: 'Class updated successfully', data: cls });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating class', error: error.message });
  }
};

// DELETE class (soft delete)
export const deleteClass = async (req, res) => {
  try {
    const cls = await Class.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!cls) return res.status(404).json({ success: false, message: 'Class not found' });
    return res.status(200).json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting class', error: error.message });
  }
};

// POST add student to class
export const addStudentToClass = async (req, res) => {
  try {
    const { studentId, name, rollNo } = req.body;
    if (!name || !rollNo) return res.status(400).json({ success: false, message: 'Student name and rollNo required' });

    const cls = await Class.findById(req.params.id);
    if (!cls) return res.status(404).json({ success: false, message: 'Class not found' });

    const exists = cls.students.find((s) => s.rollNo === rollNo);
    if (exists) return res.status(409).json({ success: false, message: 'Student already in class' });

    cls.students.push({ studentId, name, rollNo, status: 'active' });
    await cls.save();
    return res.status(200).json({ success: true, message: 'Student added to class', data: cls });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error adding student', error: error.message });
  }
};

// DELETE remove student from class
export const removeStudentFromClass = async (req, res) => {
  try {
    const { studentId } = req.params;
    const cls = await Class.findById(req.params.id);
    if (!cls) return res.status(404).json({ success: false, message: 'Class not found' });

    cls.students = cls.students.filter((s) => s._id.toString() !== studentId && s.rollNo !== studentId);
    await cls.save();
    return res.status(200).json({ success: true, message: 'Student removed from class', data: cls });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error removing student', error: error.message });
  }
};
