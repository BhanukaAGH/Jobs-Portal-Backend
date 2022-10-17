const Event = require('../models/Event')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

//! POST Event
const createEvent = async (req, res) => {
  req.body.company = req.user.userId
  const event = await Event.create(req.body)
  res.status(StatusCodes.CREATED).json(event)
}

//Get Events by Company ID
const getEventsByCompanyId = async (req, res) => {
  const events = await Event.find({ company: req.user.userId })

  if (!events) {
    throw new CustomError.NotFoundError(`No events for company id : ${userId}`)
  }

  res.status(StatusCodes.OK).json(events)
}

//! GET Event
const getEvent = async (req, res) => {
  const { id: eventId } = req.params
  const event = await Event.findOne({ _id: eventId })

  if (!event) {
    throw new CustomError.NotFoundError(`No event with id : ${eventId}`)
  }
  res.status(StatusCodes.OK).json(event)
}

//! GET ALL Events
const getAllEvents = async (req, res) => {
  const events = await Event.find({})
  res.status(StatusCodes.OK).json({ events, count: events.length })
}

//! UPDATE Event
const updateEvent = async (req, res) => {
  const { id: eventId } = req.params
  const event = await Event.findOneAndUpdate({ _id: eventId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!event) {
    throw new CustomError.NotFoundError(`No event with id : ${eventId}`)
  }
  res.status(StatusCodes.OK).json(event)
}

//! DELETE Event
const deleteEvent = async (req, res) => {
  const { id: eventId } = req.params
  const event = await Event.findOne({ _id: eventId })

  if (!event) {
    throw new CustomError.NotFoundError(`No event with id : ${eventId}`)
  }

  await event.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! event removed.' })
}

// Get Events report Data

// const getEventsReportData = async (req, res) => {
//   // const events = await Event.find({ company: req.user.userId })

//   const report = await Event.aggregate([
//     {
//       $lookup: {
//         from: 'applyevents',
//         localField: '_id',
//         foreignField: 'EventID',
//         as: 'report',
//       },
//     },
//   ])

//   const reportByCompany = report.filter((event) => {
//     return event.company._id.toString() === req.user.userId.toString()
//   })

//   console.log(reportByCompany)

//   var total = 0

//   reportByCompany.map((event) => {
//     total = total + event.report.length
//   })

//   res.status(StatusCodes.OK).json({ reportByCompany, total })
// }

module.exports = {
  createEvent,
  getEvent,
  getEventsByCompanyId,
  getAllEvents,
  updateEvent,
  deleteEvent,
  // getEventsReportData,
}
