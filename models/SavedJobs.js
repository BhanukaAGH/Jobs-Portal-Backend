const mongoose = require('mongoose')

const SavedjobSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user id'],
    },
    JobID:{
      type: mongoose.Types.ObjectId,
      ref: 'Job',
      unique: [true,"jobid already exists"],
      required: [true, 'Please provide job id'],
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('SavedJob', SavedjobSchema)
