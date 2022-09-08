const mongoose = require('mongoose')

const UserResumeSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user id'],
    },
    skills: [
        {
          skill: {
            type: String,
            default: 'empty',
          },
          YOE: {
            type: Number,
            default: 0,
          },
        },
      ],
    CV:{
        type: String,
        required: true
    },
    Location:{
        type: String,
        required: true
    },
    PrimaryRole:{
        type: String,
        required: true
    },
    Statement:{
        type: String,
        required: true
    }
  }
)
module.exports = mongoose.model('Resume', UserResumeSchema)
