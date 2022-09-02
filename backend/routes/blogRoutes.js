import express from "express";
const router = express.Router();
//controllers
import {
getBlogPosts
} from "../controllers/blogController.js";


router.route("/").get(getBlogPosts)


export default router;