import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide class name'],
      trim: true,
      unique: true,
    },
    grade: {
      type: String,
      required: [true, 'Please provide grade'],
      trim: true,
    },
    section: {
      type: String,
      default: 'A',
      trim: true,
    },
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      default: null,
    },
    classTeacherName: {
      type: String,
      default: '',
    },
    students: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student',
        },
        name: { type: String },
        rollNo: { type: String },
        status: {
          type: String,
          enum: ['present', 'absent', 'active'],
          default: 'active',
        },
      },
    ],
    subjects: [
      {
        type: String,
      },
    ],
    capacity: {
      type: Number,
      default: 40,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Class = mongoose.model('Class', classSchema);

export default Class;
