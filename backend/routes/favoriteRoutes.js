import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import pkg from "mongoose";

const { Types } = pkg;
import {
  fetchFavorites,
  addFavorite,
  deleteFavorite,
} from "../controllers/favoriteController.js";

router.get("/", protect, fetchFavorites);
router.post("/:blogId", protect, addFavorite);
router.delete("/:blogId", protect, deleteFavorite);

export default router;
