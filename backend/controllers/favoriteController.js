import asyncHandler from "express-async-handler";
import Favorite from "../models/favoriteModel.js";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

export const fetchFavorites = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    throw new Error("Cannot fetch favorites");
  }
});

export const addFavorite = asyncHandler(async (req, res) => {
  console.log("add favorite controller accessed");
  try {
    const user = await User.findById(req.user._id);
    // user.populate("favorites");
    console.log(user);
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

export const deleteFavorite = asyncHandler(async (req, res) => {
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
