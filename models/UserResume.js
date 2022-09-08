const mongoose = require('mongoose')

const UserResumeSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      unique:true,
      required: [true, 'Please provide user id'],
    },
    skills: {
      type: Array,
    },
    CV:{
        type: String,
    },
    Location:{
        type: String,
    },
    PrimaryRole:{
        type: String,
    },
    Statement:{
        type: String,
    }
  }
)
module.exports = mongoose.model('Resume', UserResumeSchema)
