const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide company id'],
    },
    jobTitle: {
      type: String,
      required: [true, 'Please provide job title'],
      minlength: [3, 'mininmum lenght is 3'],
      maxlength: [30, 'maximum length is 30'],
    },
    jobCategory: {
      type: String,
      required: [true, 'Please provide job category'],
      enum: [
        'IT/Telecommunication',
        'Management',
        'Digital & Creative',
        'Sales & Marketing',
        'Accounting',
        'Design & Art',
      ],
    },
    jobType: {
      type: String,
      required: [true, 'Please provide job type'],
      enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'],
    },
    jobDescription: {
      type: String,
      required: [true, 'Please provide job description'],
      minlength: [20, 'mininmum lenght is 20'],
      maxlength: [500, 'maximum length is 500'],
    },
    country: {
      type: String,
      required: [true, 'Please provide country'],
    },
    workType: {
      type: String,
      required: [true, 'Please provide work type'],
      enum: ['Remote', 'In person'],
    },
    numberOfVacancy: {
      type: Number,
      required: [true, 'Please provide number of hires'],
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    jobDeadline: {
      type: String,
      required: [true, 'Please provide job deadline'],
    },
    averageSalary: {
      type: String,
      required: [true, 'Please provide average salary of the job'],
    },
    jobRequirements: {
      type: [String],
      required: [true, 'Please provide job requirements'],
    },
    jobExpectations: {
      type: [String],
      required: [true, 'Please provide job expectations'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Job', jobSchema)
