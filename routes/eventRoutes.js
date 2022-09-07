const express = require('express')
const {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication')

router
  .route('/')
  .post([authenticateUser, authorizePermissions('event')], createEvent)
  .get(getAllEvents)

router
  .route('/:id')
  .get([authenticateUser, authorizePermissions('admin', 'event')], getEvent)
  .patch(
    [authenticateUser, authorizePermissions('admin', 'event')],
    updateEvent
  )
  .delete(
    [authenticateUser, authorizePermissions('admin', 'event')],
    deleteEvent
  )

module.exports = router
