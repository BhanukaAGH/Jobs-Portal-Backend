const express = require('express')
const router = express.Router()

const {
    authenticateUser,
    authorizePermissions} = require('../middleware/authentication')
  
const {getAllJobs,saveJob,getSavedJobs,deleteSavedJobs} = require('../controllers/CandidateController')


router.route('/getAllJobs').get(getAllJobs)
router.route('/saveJob').post(saveJob)
router.route('/getsaveJob/:userID').get([authenticateUser, authorizePermissions('user','admin')],getSavedJobs)
router.route('/delsaveJob/:JobID').delete([authenticateUser, authorizePermissions('user','admin')],deleteSavedJobs)

module.exports = router
