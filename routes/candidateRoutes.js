const express = require('express')
const router = express.Router()

const {
    authenticateUser,
    authorizePermissions} = require('../middleware/authentication')
  
const {getAllJobs,saveJob,getSavedJobs,deleteSavedJobs,getAllEvents,
    saveEvent,getSavedEvents,deleteSavedEvents,getALLSavedJobs,getALLSavedEvents,
    AddResume,getUserResume,UpdateResume,RemoveResume} = require('../controllers/CandidateController')

//job routes
router.route('/getAllJobs').post(getAllJobs)
router.route('/saveJob').post(saveJob)
//to get array of jobids
router.route('/getsaveJob/:userID').get([authenticateUser, authorizePermissions('user','admin')],getSavedJobs)
//for view paage to dispaly
router.route('/getsaveJobs/:userID').get([authenticateUser, authorizePermissions('user','admin')],getALLSavedJobs)
router.route('/delsaveJob/:JobID').delete([authenticateUser, authorizePermissions('user','admin')],deleteSavedJobs)

//event routes
router.route('/getAllEvents').get(getAllEvents)
router.route('/saveEvent').post(saveEvent)
//to get array of eventid
router.route('/getsaveEvent/:userID').get([authenticateUser, authorizePermissions('user','admin')],getSavedEvents)
//to get all events
router.route('/getsaveEvents/:userID').get([authenticateUser, authorizePermissions('user','admin')],getALLSavedEvents)
router.route('/delsaveEvent/:EventID').delete([authenticateUser, authorizePermissions('user','admin')],deleteSavedEvents)

//resume routes
router.route('/addResume').post([authenticateUser, authorizePermissions('user')],AddResume)
router.route('/updateResume').post([authenticateUser, authorizePermissions('user')],UpdateResume)
router.route('/viewResume/:userID').get(getUserResume)
router.route('/removeResume/:userID').delete([authenticateUser, authorizePermissions('user')],RemoveResume)
module.exports = router

