const Comment = require("../models/commentModel");
const User = require("../models/userModel");

// @desc Get all notes
// @route GET /comments
// @access Private
const getAllComments = async (req, res) => {
  // Get all notes from MongoDB
  const comments = await Comment.find().lean().sort({ createdAt: -1 });

  // If no comemnts
  if (!comments?.length) {
    return res.status(400).json({ message: "No comments found" });
  }
  res.json(comments);
};

// @desc Create new coimment
// @route POST /comments
// @access Private
const createNewComment = async (req, res) => {
  const { comment } = req.body;
  console.log(comment);
  const { id, username } = req.user;
  console.log(id, username);

  // Confirm data
  if (!comment) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create and store the new user
  const newComment = await Comment.create({ username, comment, createdBy: id });
  console.log(newComment)

  if (newComment) {
    // Created
    return res.status(201).json({newComment});
  } else {
    return res.status(400).json({ message: "Invalid note data received" });
  }
};

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateComment = async (req, res) => {
  const { id, username, comment } = req.body;

  // Confirm data
  if (!id || !username || !comment) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm note exists to update
  const commentToUpdate = await Comment.findById(id).exec();

  if (!commentToUpdate) {
    return res.status(400).json({ message: "Note not found" });
  }

  commentToUpdate.comment = comment;

  const updatedComment = await commentToUpdate.save();

  res.json(`'${updatedComment._id}' updated`);
};

// @desc Delete a comment
// @route DELETE /comments
// @access Private
const deleteComment = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Comment ID required" });
  }

  // Confirm note exists to delete
  const comment = await Comment.findById(id).exec();

  if (!comment) {
    return res.status(400).json({ message: "Note not found" });
  }

  const result = await comment.deleteOne();

  const reply = `Comment '${result.comment}' with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllComments,
  createNewComment,
  updateComment,
  deleteComment,
};
