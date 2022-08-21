const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication')

const {
  getCompany,
  getAllCompany,
  updateCompany,
} = require('../controllers/companyController')

router.route('/').get(getAllCompany)
router
  .route('/:id')
  .get([authenticateUser, authorizePermissions('admin', 'company')], getCompany)
  .patch(
    [authenticateUser, authorizePermissions('admin', 'company')],
    updateCompany
  )

module.exports = router
