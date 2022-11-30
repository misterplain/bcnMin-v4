const express = require("express");
const router = express.Router();
const refreshController = require("../controllers/refreshController");
// const { protect } = require("../middleware/authMiddleware");

// router.use(protect);
router.route("/").get(refreshController.refresh);

module.exports = router;