const mongoose = require('mongoose')

const AppliedJobsSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user id'],
    },
    JobID: {
      type: mongoose.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Please provide job id'],
    },
    ResumeID: {
      type: mongoose.Types.ObjectId,
      ref: 'Resume',
      required: [true, 'Please provide job id'],
    },
    CompanyID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide job id'],
    },
    ApplicationStatus: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('AppliedJobs', AppliedJobsSchema)
