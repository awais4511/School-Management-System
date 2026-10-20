import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    studentName: { type: String, default: '' },
    rollNo: { type: String, default: '' },
    class: {
      type: String,
      required: [true, 'Please provide class'],
    },
    date: {
      type: Date,
      required: [true, 'Please provide attendance date'],
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
      required: [true, 'Please provide attendance status'],
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    subject: { type: String, default: '' },
    remarks: { type: String, default: '' },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate attendance for same student on same day
attendanceSchema.index({ studentId: 1, date: 1, subject: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
