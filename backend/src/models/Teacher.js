import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      default: '',
    },
    classesAssigned: [
      {
        type: String,
      },
    ],
    subjectsTeaching: [
      {
        type: String,
      },
    ],
    qualification: {
      type: String,
      default: '',
    },
    experience: {
      type: Number,
      default: 0,
    },
    dateOfJoining: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
