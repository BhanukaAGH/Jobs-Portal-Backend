const mongoose = require('mongoose')

const SavedEventsSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user id'],
    },
    EventID:{
      type: mongoose.Types.ObjectId,
      ref: 'Event',
      unique: [true,"jobid already exists"],
      required: [true, 'Please provide job id'],
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('SavedEvents', SavedEventsSchema)
