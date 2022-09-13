const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  company: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide company id'],
  },

  eventTitle: {
    type: String,
    required: [true, 'Please provide Event title'],
  },
  // eventCategoery: {
  //   type: String,
  //   required: [true, 'Please provide event category'],
  // },
  // jobCategoryTargeted: {
  //   type: String,
  //   required: [true, 'Please provide Job Category Targeted'],
  // },

  deliveryType: {
    type: String,
    enum: ['Virtual', 'Physical'],
    required: [true, 'Please provide event delivery type'],
  },

  location: {
    type: String,
    required: [true, 'Please provide event location'],
  },
  date: {
    type: Date,
    // required: [true, 'Please provide event date'],
  },

  description: {
    type: String,
    required: [true, 'Please provide event description'],
  },
})

module.exports = mongoose.model('Event', eventSchema)
