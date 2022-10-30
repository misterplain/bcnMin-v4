const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { loginLimiter } = require("../middleware/loginLimiter");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/").get(usersController.getAllUsers);

//protected routes requiring authorization 
// router.use(verifyJWT);
router
  .route("/")
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
