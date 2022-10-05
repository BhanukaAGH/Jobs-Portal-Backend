const express = require("express");
const router = express.Router();
const {
  accountCreate,
  getAllAccounts,
  accountUpdate,
  getAccount,
  accountDelete,
} = require("../controllers/adminController");

router.route("/").get(getAllAccounts);
router.route("/:id").get(getAccount);
router.route("/create").post(accountCreate);
router.route("/update/:id").patch(accountUpdate);
router.route("/delete/:id").delete(accountDelete);

module.exports = router;
