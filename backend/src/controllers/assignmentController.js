import Assignment from '../models/Assignment.js';

export const createAssignment = async (req, res) => {
  try {
    const { title, description, subject, class: classVal, dueDate, maxMarks } = req.body;

    if (!title || !description || !subject || !classVal || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const assignment = await Assignment.create({
      title,
      description,
      subject,
      class: classVal,
      dueDate,
      maxMarks: maxMarks || 100,
      createdBy: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      assignment,
    });
  } catch (error) {
    console.error('Create Assignment Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating assignment',
      error: error.message,
    });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const { class: classVal, subject } = req.query;

    let query = { isActive: true };
    if (classVal) query.class = classVal;
    if (subject) query.subject = subject;

    const assignments = await Assignment.find(query)
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: assignments.length,
      assignments,
    });
  } catch (error) {
    console.error('Get Assignments Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching assignments',
      error: error.message,
    });
  }
};

export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id).populate(
      'createdBy',
      'firstName lastName email'
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found',
      });
    }

    return res.status(200).json({
      success: true,
      assignment,
    });
  } catch (error) {
    console.error('Get Assignment By ID Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching assignment',
      error: error.message,
    });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, maxMarks } = req.body;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found',
      });
    }

    if (assignment.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this assignment',
      });
    }

    if (title) assignment.title = title;
    if (description) assignment.description = description;
    if (dueDate) assignment.dueDate = dueDate;
    if (maxMarks) assignment.maxMarks = maxMarks;

    await assignment.save();

    return res.status(200).json({
      success: true,
      message: 'Assignment updated successfully',
      assignment,
    });
  } catch (error) {
    console.error('Update Assignment Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating assignment',
      error: error.message,
    });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found',
      });
    }

    if (assignment.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this assignment',
      });
    }

    assignment.isActive = false;
    await assignment.save();

    return res.status(200).json({
      success: true,
      message: 'Assignment deleted successfully',
    });
  } catch (error) {
    console.error('Delete Assignment Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting assignment',
      error: error.message,
    });
  }
};
