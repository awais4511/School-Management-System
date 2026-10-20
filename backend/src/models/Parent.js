import mongoose from 'mongoose';

const parentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    fatherName: {
      type: String,
      required: [true, 'Please provide father name'],
      trim: true,
    },
    motherName: {
      type: String,
      default: '',
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
    },
    email: {
      type: String,
      default: '',
      lowercase: true,
    },
    relation: {
      type: String,
      enum: ['Father', 'Mother', 'Guardian'],
      default: 'Father',
    },
    address: {
      type: String,
      default: '',
    },
    // Linked students
    students: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student',
        },
        studentName: { type: String },
        rollNo: { type: String },
        class: { type: String },
        grade: { type: String },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Parent = mongoose.model('Parent', parentSchema);
export default Parent;
