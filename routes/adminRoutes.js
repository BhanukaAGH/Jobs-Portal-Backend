const express = require("express");
const router = express.Router();
const {
  accountCreate,
  getAllAccounts,
  accountUpdate,
  getAccount,
  accountDelete,
  UpdateStatus,
} = require("../controllers/adminController");

router.route("/").get(getAllAccounts);
router.route("/:id").get(getAccount);
router.route("/create").post(accountCreate);
router.route("/update/:id").patch(accountUpdate);
router.route("/update/status/:id").patch(UpdateStatus);
router.route("/delete/:id").delete(accountDelete);
router.route("/delete/company/:id").delete(accountDelete);

module.exports = router;
