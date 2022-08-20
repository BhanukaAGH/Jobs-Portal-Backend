const mongoose = require('mongoose')
const validator = require('validator')

const companySchema = new mongoose.Schema({
  companyWebsite: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: 'Please provide valid url',
    },
  },
  companyLocation: {
    type: String,
    required: [true, 'Please provide company location'],
  },
  numberOfEmployees: {
    type: String,
    required: [true, 'Please provide number of employees'],
    enum: [
      '1 to 49',
      '50 to 149',
      '150 to 249',
      '250 to 499',
      '500 to 749',
      '750 to 999',
      '1000+',
    ],
  },
  companyDescription: {
    type: String,
    required: [true, 'Please provide company description'],
    minlength: [20, 'mininmum lenght is 20'],
    maxlength: [500, 'maximum length is 500'],
  },
})

module.exports = mongoose.model('Company', companySchema)
