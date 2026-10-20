import mongoose from 'mongoose';

const periodSchema = new mongoose.Schema({
  periodNo: { type: Number, required: true },
  subject: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null },
  teacherName: { type: String, default: '' },
  startTime: { type: String, required: true },  // e.g. "08:00"
  endTime: { type: String, required: true },    // e.g. "09:00"
  room: { type: String, default: '' },
});

const timetableSchema = new mongoose.Schema(
  {
    class: {
      type: String,
      required: [true, 'Please provide class name'],
    },
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      required: [true, 'Please provide day'],
    },
    periods: [periodSchema],
    academicYear: {
      type: String,
      default: () => new Date().getFullYear().toString(),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

timetableSchema.index({ class: 1, day: 1 }, { unique: true });

const Timetable = mongoose.model('Timetable', timetableSchema);
export default Timetable;
