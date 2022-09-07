const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication')

const {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController')

router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin', 'event')], createEvent)
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
