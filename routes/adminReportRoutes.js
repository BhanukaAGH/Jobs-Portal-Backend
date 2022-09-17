const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const { EventReport } = require("../controllers/AdminReport.controller");


router.route('/eventreport').get([authenticateUser, authorizePermissions('admin')],EventReport)

module.exports = router;
