const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication')

const {
  getAllJobApplicants,
  updateApplicantStatus,
} = require('../controllers/applicantController')

router
  .route('/:companyId/:jobId')
  .get([authenticateUser, authorizePermissions('company')], getAllJobApplicants)

router
  .route('/:appliedJobId')
  .patch(
    [authenticateUser, authorizePermissions('company')],
    updateApplicantStatus
  )

module.exports = router
