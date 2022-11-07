const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
// const verifyJWT = require("../middleware/verifyJWT");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(commentsController.getAllComments)
  .delete(commentsController.deleteComment);

//protected routes requiring authorization
// router.use(verifyJWT);
router.use(protect);
router
  .route("/")
  .post(commentsController.createNewComment)
  .patch(commentsController.updateComment);

module.exports = router;
