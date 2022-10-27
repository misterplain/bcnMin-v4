import asyncHandler from "express-async-handler";
import Favorite from "../models/favoriteModel.js";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

export const fetchFavorites = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    throw new Error("Cannot fetch favorites");
  }
});

export const addFavorite = asyncHandler(async (req, res) => {
  console.log("add favorite controller accessed");
  try {

    const user = await User.findById(req.user._id)
    user.populate("favorites");
    const blog = await Blog.findById(req.params.blogId);
    console.log(user.favorites)
    if (user.favorites.includes(blog._id)) {
      res.status(400);
      throw new Error("Already favorited");
    } else {
      user.favorites.push(blog);
      await user.save();
      res.json(user.favorites);
    }
  } catch (err) {
    console.error("add favorite controller", err.message);
    throw new Error("Cannot add favorite");
  }
});

export const deleteFavorite = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    const blog = await Blog.findById(req.body.blogId);
    if (!user.favorites.includes(blog)) {
      res.status(400);
      throw new Error("Already unfavorited");
    }
    user.favorites.pull(blog);
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    throw new Error("Cannot delete favorite");
  }
});
