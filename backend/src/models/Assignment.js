import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide assignment title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide assignment description'],
    },
    subject: {
      type: String,
      required: [true, 'Please provide subject'],
    },
    class: {
      type: String,
      required: [true, 'Please provide class'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dueDate: {
      type: Date,
      required: [true, 'Please provide due date'],
    },
    maxMarks: {
      type: Number,
      default: 100,
    },
    attachments: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
