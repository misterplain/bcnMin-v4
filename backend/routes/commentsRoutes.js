const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/").get(commentsController.getAllComments);

//protected routes requiring authorization
router.use(verifyJWT);
router
  .route("/")
  .post(commentsController.createNewComment)
  .patch(commentsController.updateComment)
  .delete(commentsController.deleteComment);

module.exports = router;

