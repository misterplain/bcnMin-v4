const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const getAllFavorites = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    throw new Error("Cannot fetch favorites");
  }
});

const addFavorite = asyncHandler(async (req, res) => {
  console.log("add favorite controller accessed");
  try {
    const user = await User.findById(req.user._id);
    // user.populate("favorites");
    const blog = await Blog.findById(req.params.blogId);
    if (user.favorites.includes(blog._id)) {
      res.status(400).send({
        error: "already blog favourited",
      });
    } else {
      user.favorites.push(blog);
      await user.save();
      res.status(200).send({
        message: "blog favourite successfully",
        blogId: blog._id,
      });
    }
  } catch (err) {
    console.error("add favorite controller", err.message);
    res.status(500).send({ error: "unexpected error occured" });
  }
});

const deleteFavorite = asyncHandler(async (req, res) => {
  console.log("delete favorite controller accessed");
  try {
    const user = await User.findById(req.user._id);
    const blog = await Blog.findById(req.params.blogId);
    if (user.favorites.includes(blog._id)) {
      user.favorites.pull(blog);
      await user.save();
      res.status(200).send({
        message: "post removed from favorites",
      });
    } else {
      res.status(404).send({
        error: "blog does not exist in favorites",
      });
    }

    // res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "unexpected error occured" });
  }
});

module.exports = {
  getAllFavorites,
  addFavorite,
  deleteFavorite,
};
