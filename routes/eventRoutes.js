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
  .post([authenticateUser, authorizePermissions('company')], createEvent)
  .get(getAllEvents)

router
  .route('/:id')
  .get([authenticateUser, authorizePermissions('admin', 'company')], getEvent)
  .patch(
    [authenticateUser, authorizePermissions('admin', 'company')],
    updateEvent
  )
  .delete(
    [authenticateUser, authorizePermissions('admin', 'company')],
    deleteEvent
  )

module.exports = router
