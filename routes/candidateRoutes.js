const express = require('express')
const router = express.Router()

const {
    authenticateUser,
    authorizePermissions} = require('../middleware/authentication')
  
const {getAllJobs,saveJob,getSavedJobs,deleteSavedJobs,getAllEvents,saveEvent,getSavedEvents,deleteSavedEvents} = require('../controllers/CandidateController')

//job routes
router.route('/getAllJobs').get(getAllJobs)
router.route('/saveJob').post(saveJob)
router.route('/getsaveJob/:userID').get([authenticateUser, authorizePermissions('user','admin')],getSavedJobs)
router.route('/delsaveJob/:JobID').delete([authenticateUser, authorizePermissions('user','admin')],deleteSavedJobs)

//event routes
router.route('/getAllEvents').get(getAllEvents)
router.route('/saveEvent').post(saveEvent)
router.route('/getsaveEvent/:userID').get([authenticateUser, authorizePermissions('user','admin')],getSavedEvents)
router.route('/delsaveEvent/:EventID').delete([authenticateUser, authorizePermissions('user','admin')],deleteSavedEvents)

module.exports = router

