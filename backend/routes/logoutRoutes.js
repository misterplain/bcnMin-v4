const express = require("express");
const router = express.Router();
// const logoutController = require("../controllers/logoutController");
const authController = require("../controllers/authController");
const { loginLimiter } = require("../middleware/loginLimiter");
const  verifyJWT  = require("../middleware/verifyJWT");
const { protect } = require("../middleware/authMiddleware");

router.use(protect)

router.post("/", authController.logout);

module.exports = router;