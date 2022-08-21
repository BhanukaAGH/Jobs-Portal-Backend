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
  .get(getAllJobs)

router
  .route('/:id')
  .get([authenticateUser, authorizePermissions('admin', 'company')], getJob)
  .patch(
    [authenticateUser, authorizePermissions('admin', 'company')],
    updateJob
  )
  .delete(
    [authenticateUser, authorizePermissions('admin', 'company')],
    deleteJob
  )

module.exports = router
