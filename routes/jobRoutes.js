const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication')

const {
  createJob,
  getJob,
  getAllJobs,
  updateJob,
  deleteJob,
} = require('../controllers/jobController')

router
  .route('/')
  .post([authenticateUser, authorizePermissions('company')], createJob)
  .get(authenticateUser, getAllJobs)

router
  .route('/:id')
  .get(getJob)
  .patch(
    [authenticateUser, authorizePermissions('admin', 'company')],
    updateJob
  )
  .delete(
    [authenticateUser, authorizePermissions('admin', 'company')],
    deleteJob
  )

module.exports = router
