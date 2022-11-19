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
  console.log(req.user.favorites, 'req.user.favorites');
  console.log(req, 'req params')

  try {
    const favorites = req.user.favorites;
    const blogId = req.params.blogId;
    if (favorites.includes(blogId)) {
      res.status(400).send({
        message: "Blog already in favorites",
        id: blogId,
      });
      console.log('blog already in favorites')
    } else {
      favorites.push(blogId);
      await req.user.save();
      res.status(200).send({
        message: "Blog added to favorites",
        id: blogId,
      });
    }
    console.log('Blog sucessfully added to favorites')
  } catch (error) {
    console.error("add favorite controller but error", error.message);
    res.status(500).send({
      error: error.message,
      id: req.params.blogId,
    });
  }
  // console.log(req.user);
  // try {
  //   const user = await User.findOne(req.user);
  //   const user = req.user._id
  //   console.log(user);
  //   const blog = await Blog.findById(req.params.blogId);
  //   console.log(blog);
  //   if (user.favorites.includes(blog._id)) {
  //     res.status(400).send({
  //       error: "already blog favourited",
  //     });
  //   } else {
  //     user.favorites.push(blog);
  //     await user.save();
  //     res.status(200).send({
  //       message: "blog favourite successfully",
  //       blogId: blog._id,
  //     });
  //   }
  // } catch (err) {
  //   console.error("add favorite controller", err.message);
  //   res.status(500).send({ error: "unexpected error occured" });
  // }
});

const deleteFavorite = asyncHandler(async (req, res) => {
  console.log("delete favorite controller accessed");
  // console.log(req.user.favorites);
  // console.log(req.params.blogId);

  try {
    const favorites = req.user.favorites;
    const blogId = req.params.blogId;
    if (!favorites.includes(blogId)) {
      res.status(400).send({
        message: "Blog doesn't exist within favorites",
        id: blogId,
      });
      console.log('blog doesnt exist within favorites')
    } else {
      favorites.pull(blogId);
      await req.user.save();
      res.status(200).send({
        message: "Blog deleted from favorites",
        id: blogId,
      });
    }
    console.log('Blog sucessfully deleted from favorites')
  } catch (error) {
    console.error("remove favorite controller but error caught", error.message);
    res.status(500).send({
      error: error.message,
      id: blogId,
    });
  }
});

module.exports = {
  getAllFavorites,
  addFavorite,
  deleteFavorite,
};
