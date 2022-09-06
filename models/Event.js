const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  eventTiltle: {
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
  location: {
    type: String,
    required: [true, 'Please provide event location'],
  },
  // date: {
  //   type: String,
  //   required: [true, 'Please provide event date'],
  // },

  description: {
    type: String,
    required: [true, 'Please provide event description'],
  },
})

module.exports = mongoose.model('Event', eventSchema)
