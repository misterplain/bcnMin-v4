import asyncHandler from "express-async-handler";
import Favorite from "../models/favoriteModel.js";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

export const getComments = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate({
        path: "user",
        model: "User",
        select: { email: 1, username: 1, admin: 1 },
      })
      .sort({ createdAt: -1 });
    res.json(comments);
    console.log("comments fetched");
  } catch (err) {
    console.error(err.message);
    throw new Error("Cannot fetch comments");
  }
});

export const addComment = asyncHandler(async (req, res) => {
  const comment = new Comment({
    user: req.user.id,
    comment: req.body.comment,
    // username: req.user.username,
  });
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
    console.log("comment posted");
  } catch (err) {
    res.status(500);
    throw new Error("Cannot post comment");
  }
});

export const deleteComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      await comment.remove();
      res.json({ message: "Comment removed" });
    } else {
      res.status(404);
      throw new Error("Comment not found");
    }
  } catch (err) {
    res.status(500);
    throw new Error("Cannot delete comment");
  }
});
