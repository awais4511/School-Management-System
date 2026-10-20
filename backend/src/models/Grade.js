import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema(
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
    subject: {
      type: String,
      required: [true, 'Please provide subject'],
    },
    midterm: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    final: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    average: {
      type: Number,
      default: 0,
    },
    grade: {
      type: String,
      enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'],
      default: 'F',
    },
    academicYear: {
      type: String,
      default: () => new Date().getFullYear().toString(),
    },
    term: {
      type: String,
      enum: ['First', 'Second', 'Annual'],
      default: 'First',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

// Auto-calculate average & grade before saving
gradeSchema.pre('save', function (next) {
  this.average = (this.midterm + this.final) / 2;
  const avg = this.average;
  if (avg >= 90) this.grade = 'A+';
  else if (avg >= 80) this.grade = 'A';
  else if (avg >= 70) this.grade = 'B+';
  else if (avg >= 60) this.grade = 'B';
  else if (avg >= 50) this.grade = 'C+';
  else if (avg >= 40) this.grade = 'C';
  else if (avg >= 30) this.grade = 'D';
  else this.grade = 'F';
  next();
});

const Grade = mongoose.model('Grade', gradeSchema);
export default Grade;
