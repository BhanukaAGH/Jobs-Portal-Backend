const express = require('express')
const router = express.Router()

const {
    authenticateUser,
    authorizePermissions} = require('../middleware/authentication')
  
const {getAllJobs} = require('../controllers/CandidateController')


router.route('/getAllJobs').get(getAllJobs)

module.exports = router
