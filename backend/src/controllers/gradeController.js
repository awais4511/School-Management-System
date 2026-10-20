import Grade from '../models/Grade.js';

// GET grades by class and subject
export const getGradesByClass = async (req, res) => {
  try {
    const { className, subject, term, academicYear } = req.query;
    if (!className) return res.status(400).json({ success: false, message: 'Class name is required' });

    const filter = { class: className };
    if (subject) filter.subject = subject;
    if (term) filter.term = term;
    if (academicYear) filter.academicYear = academicYear;

    const grades = await Grade.find(filter).sort({ rollNo: 1 });
    const total = grades.length;
    const classAverage = total > 0 ? (grades.reduce((sum, g) => sum + g.average, 0) / total).toFixed(2) : 0;
    const topPerformer = grades.sort((a, b) => b.average - a.average)[0] || null;

    return res.status(200).json({ success: true, count: total, data: grades, classAverage, topPerformer });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching grades', error: error.message });
  }
};

// GET grades by student
export const getGradesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const grades = await Grade.find({ studentId }).sort({ subject: 1 });
    return res.status(200).json({ success: true, count: grades.length, data: grades });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching student grades', error: error.message });
  }
};

// POST create grade entry
export const createGrade = async (req, res) => {
  try {
    const { studentId, studentName, rollNo, class: cls, subject, midterm, final, term, academicYear } = req.body;
    if (!studentId || !cls || !subject) {
      return res.status(400).json({ success: false, message: 'studentId, class, and subject are required' });
    }

    const existing = await Grade.findOne({ studentId, class: cls, subject, term, academicYear });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Grade entry already exists. Use update instead.' });
    }

    const grade = await Grade.create({
      studentId, studentName, rollNo, class: cls, subject,
      midterm: midterm || 0, final: final || 0, term, academicYear, updatedBy: req.userId,
    });
    return res.status(201).json({ success: true, message: 'Grade created successfully', data: grade });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating grade', error: error.message });
  }
};

// PUT update grade
export const updateGrade = async (req, res) => {
  try {
    const { midterm, final } = req.body;
    const grade = await Grade.findById(req.params.id);
    if (!grade) return res.status(404).json({ success: false, message: 'Grade not found' });

    if (midterm !== undefined) grade.midterm = midterm;
    if (final !== undefined) grade.final = final;
    grade.updatedBy = req.userId;
    await grade.save(); // triggers pre-save hook to recalculate average & letter grade

    return res.status(200).json({ success: true, message: 'Grade updated successfully', data: grade });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating grade', error: error.message });
  }
};

// DELETE grade
export const deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);
    if (!grade) return res.status(404).json({ success: false, message: 'Grade not found' });
    return res.status(200).json({ success: true, message: 'Grade deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting grade', error: error.message });
  }
};

// POST bulk save grades for a class
export const bulkSaveGrades = async (req, res) => {
  try {
    const { gradesList, className, subject, term, academicYear } = req.body;
    if (!gradesList || !Array.isArray(gradesList)) {
      return res.status(400).json({ success: false, message: 'gradesList array is required' });
    }

    const results = [];
    for (const item of gradesList) {
      const { studentId, studentName, rollNo, midterm, final } = item;
      const record = await Grade.findOneAndUpdate(
        { studentId, class: className, subject, term, academicYear },
        { studentId, studentName, rollNo, class: className, subject, midterm, final, term, academicYear, updatedBy: req.userId },
        { upsert: true, new: true, runValidators: true }
      );
      results.push(record);
    }

    return res.status(200).json({ success: true, message: 'Grades saved successfully', count: results.length, data: results });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error saving grades', error: error.message });
  }
};
