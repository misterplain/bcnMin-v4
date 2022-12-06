const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const { loginLimiter } = require("../middleware/loginLimiter");

router.post("/", registerController.registerUser);

module.exports = router;