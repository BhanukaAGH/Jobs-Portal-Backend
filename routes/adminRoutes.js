const express = require("express");
const router = express.Router();
const {
  accountCreate,
  getAllAccounts,
  accountUpdate,
  getAccount,
  accountDelete,
  UpdateStatus,
  getAllUsers,
} = require("../controllers/adminController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/users/allUsers")
  .get([authenticateUser, authorizePermissions("admin")], getAllUsers);
router.route("/").get(getAllAccounts);
router.route("/:id").get(getAccount);
router
  .route("/create")
  .post([authenticateUser, authorizePermissions("admin")], accountCreate);
router
  .route("/update/:id")
  .patch([authenticateUser, authorizePermissions("admin")], accountUpdate);
router
  .route("/update/status/:id")
  .patch([authenticateUser, authorizePermissions("admin")], UpdateStatus);
router
  .route("/delete/:id")
  .delete([authenticateUser, authorizePermissions("admin")], accountDelete);
router
  .route("/delete/company/:id")
  .delete([authenticateUser, authorizePermissions("admin")], accountDelete);

module.exports = router;
