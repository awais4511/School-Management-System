import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    studentName: { type: String, default: '' },
    rollNo: { type: String, default: '' },
    class: { type: String, default: '' },
    month: {
      type: String,
      required: [true, 'Please provide month'],
    },
    tuition: {
      type: Number,
      required: [true, 'Please provide tuition fee'],
      default: 0,
    },
    transport: {
      type: Number,
      default: 0,
    },
    activities: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['paid', 'pending', 'overdue'],
      default: 'pending',
    },
    paidDate: {
      type: Date,
      default: null,
    },
    dueDate: {
      type: Date,
      required: [true, 'Please provide due date'],
    },
    remarks: { type: String, default: '' },
  },
  { timestamps: true }
);

// Auto-calculate total before saving
feeSchema.pre('save', function (next) {
  this.total = (this.tuition || 0) + (this.transport || 0) + (this.activities || 0);
  next();
});

const Fee = mongoose.model('Fee', feeSchema);
export default Fee;
