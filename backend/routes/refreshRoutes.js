const express = require("express");
const { default: modules } = require("react-scroll/modules");
const router = express.Router();
const refreshController = require("../controllers/refreshController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);
router.route("/").get(refreshController.refresh);

module.exports = router;