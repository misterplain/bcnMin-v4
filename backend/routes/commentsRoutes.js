import express from "express";
const router = express.Router();
import Comment from "../models/commentModel.js";
import { protect } from "../middleware/authMiddleware.js";


import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/commentController.js";

router.get("/", getComments);
router.post("/:id", protect, addComment);
router.delete("/:id", protect, deleteComment);

export default router
