const express = require("express");
const router = express.Router();
// const refreshController = require("../controllers/refreshController");
const authController = require("../controllers/authController");
// const { protect } = require("../middleware/authMiddleware");

// router.use(protect);
router.route("/").get(authController.refresh);

module.exports = router;