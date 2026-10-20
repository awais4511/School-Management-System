import Parent from '../models/Parent.js';

// GET all parents (admin view - grouped by class)
export const getAllParents = async (req, res) => {
  try {
    const { grade, search } = req.query;
    let filter = { isActive: true };

    const parents = await Parent.find(filter).sort({ fatherName: 1 });

    let result = parents;

    // Filter by grade (check inside students array)
    if (grade) {
      result = result.filter((p) => p.students.some((s) => s.grade === grade || s.class === grade));
    }

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.fatherName.toLowerCase().includes(q) ||
          p.motherName.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.students.some((s) => s.studentName.toLowerCase().includes(q))
      );
    }

    return res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching parents', error: error.message });
  }
};

// GET single parent
export const getParent = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) return res.status(404).json({ success: false, message: 'Parent not found' });
    return res.status(200).json({ success: true, data: parent });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching parent', error: error.message });
  }
};

// POST create parent record
export const createParent = async (req, res) => {
  try {
    const { fatherName, motherName, phone, email, relation, address, students } = req.body;
    if (!fatherName || !phone) {
      return res.status(400).json({ success: false, message: 'Father name and phone are required' });
    }

    const parent = await Parent.create({ fatherName, motherName, phone, email, relation, address, students: students || [] });
    return res.status(201).json({ success: true, message: 'Parent record created', data: parent });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating parent', error: error.message });
  }
};

// PUT update parent
export const updateParent = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!parent) return res.status(404).json({ success: false, message: 'Parent not found' });
    return res.status(200).json({ success: true, message: 'Parent updated', data: parent });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating parent', error: error.message });
  }
};

// DELETE parent (soft delete)
export const deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!parent) return res.status(404).json({ success: false, message: 'Parent not found' });
    return res.status(200).json({ success: true, message: 'Parent deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting parent', error: error.message });
  }
};

// POST add student to parent
export const addStudentToParent = async (req, res) => {
  try {
    const { studentId, studentName, rollNo, class: cls, grade } = req.body;
    if (!studentName || !rollNo) {
      return res.status(400).json({ success: false, message: 'studentName and rollNo are required' });
    }

    const parent = await Parent.findById(req.params.id);
    if (!parent) return res.status(404).json({ success: false, message: 'Parent not found' });

    parent.students.push({ studentId, studentName, rollNo, class: cls, grade });
    await parent.save();
    return res.status(200).json({ success: true, message: 'Student linked to parent', data: parent });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error linking student', error: error.message });
  }
};
