import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";

// @desc    Get all blog posts
// @route   GET /api/users/login
// @access  Public
export const getBlogPosts = asyncHandler(async (req, res) => {
    const blogPosts = await Blog.find();
    
    if (blogPosts) {
        res.status(200);
        res.json(blogPosts);
    } else {
        res.status(500);
        throw new Error("Cannot fetch blog posts");
    }
})

