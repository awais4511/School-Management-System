import Fee from '../models/Fee.js';

// GET all fee records (admin)
export const getAllFees = async (req, res) => {
  try {
    const { className, status, month } = req.query;
    const filter = {};
    if (className) filter.class = className;
    if (status) filter.status = status;
    if (month) filter.month = { $regex: month, $options: 'i' };

    const fees = await Fee.find(filter).sort({ createdAt: -1 });
    const totalPaid = fees.filter((f) => f.status === 'paid').reduce((s, f) => s + f.total, 0);
    const totalPending = fees.filter((f) => f.status === 'pending').reduce((s, f) => s + f.total, 0);
    const totalOverdue = fees.filter((f) => f.status === 'overdue').reduce((s, f) => s + f.total, 0);

    return res.status(200).json({ success: true, count: fees.length, data: fees, summary: { totalPaid, totalPending, totalOverdue } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching fees', error: error.message });
  }
};

// GET fees by student
export const getFeesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const fees = await Fee.find({ studentId }).sort({ createdAt: -1 });
    const totalDue = fees.filter((f) => f.status === 'pending').reduce((s, f) => s + f.total, 0);
    const totalPaid = fees.filter((f) => f.status === 'paid').reduce((s, f) => s + f.total, 0);
    return res.status(200).json({ success: true, count: fees.length, data: fees, summary: { totalDue, totalPaid } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching student fees', error: error.message });
  }
};

// POST create fee record
export const createFee = async (req, res) => {
  try {
    const { studentId, studentName, rollNo, class: cls, month, tuition, transport, activities, dueDate } = req.body;
    if (!studentId || !month || !dueDate) {
      return res.status(400).json({ success: false, message: 'studentId, month, and dueDate are required' });
    }

    const fee = await Fee.create({ studentId, studentName, rollNo, class: cls, month, tuition, transport, activities, dueDate });
    return res.status(201).json({ success: true, message: 'Fee record created', data: fee });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating fee record', error: error.message });
  }
};

// PUT mark fee as paid
export const markFeePaid = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) return res.status(404).json({ success: false, message: 'Fee record not found' });

    fee.status = 'paid';
    fee.paidDate = new Date();
    await fee.save();
    return res.status(200).json({ success: true, message: 'Fee marked as paid', data: fee });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating fee', error: error.message });
  }
};

// PUT update fee record
export const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!fee) return res.status(404).json({ success: false, message: 'Fee record not found' });
    return res.status(200).json({ success: true, message: 'Fee updated', data: fee });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating fee', error: error.message });
  }
};

// DELETE fee record
export const deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);
    if (!fee) return res.status(404).json({ success: false, message: 'Fee record not found' });
    return res.status(200).json({ success: true, message: 'Fee record deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting fee', error: error.message });
  }
};
