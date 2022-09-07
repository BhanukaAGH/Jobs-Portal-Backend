const Event = require('../models/Event')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

//! POST Event
const createEvent = async (req, res) => {
  req.body.company = req.user.userId
  const event = await Event.create(req.body)
  res.status(StatusCodes.CREATED).json(event)
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

module.exports = {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
}
