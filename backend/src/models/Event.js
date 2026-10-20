import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide event title'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      required: [true, 'Please provide event date'],
    },
    endDate: {
      type: Date,
      default: null,
    },
    location: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['academic', 'sports', 'cultural', 'holiday', 'exam', 'meeting', 'other'],
      default: 'other',
    },
    targetAudience: {
      type: String,
      enum: ['all', 'student', 'teacher', 'parent'],
      default: 'all',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
