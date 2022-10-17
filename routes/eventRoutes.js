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
  getEventsByCompanyId,
  // getEventsReportData,
} = require('../controllers/eventController')

// router
//   .route('/eventReport')
//   .get([authenticateUser, authorizePermissions('company')], getEventsReportData)

router
  .route('/')
  .post([authenticateUser, authorizePermissions('company')], createEvent)
  .get(getAllEvents)

//get events by Company ID (userId)
router
  .route('/eventsByCompanyId')
  .get(
    [authenticateUser, authorizePermissions('company')],
    getEventsByCompanyId
  )

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
