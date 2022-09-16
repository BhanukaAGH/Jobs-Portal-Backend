const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const { EventReport } = require("../controllers/AdminReport.controller");


router.route('/eventreport').get(EventReport)

module.exports = router;
