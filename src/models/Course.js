import mongoose from 'mongoose';

// Schema definition for the Course model.
const CourseSchema = new mongoose.Schema({
  // Title of the course.
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    maxlength: [100, 'Title can not be more than 100 characters'],
  },
  // Description of the course.
  description: {
    type: String,
    required: [true, 'Please add a course description'],
    maxlength: [1000, 'Description can not be more than 1000 characters'],
  },
  // Duration of the course in weeks.
  weeks: {
    type: String,
    required: [true, 'Please add the number of weeks'],
  },
  // Tuition cost of the course.
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost'],
  },
  // Minimum skill level required for the course.
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill level'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  // Indicates if scholarships are available for the course.
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  // Timestamp of creation.
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Reference to the associated bootcamp.
  bootcamp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
});

// Export the Course model.
export default mongoose.model('Course', CourseSchema);
