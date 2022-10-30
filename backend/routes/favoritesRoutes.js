const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/", favoritesController.getAllFavorites);

//protected routes requiring authorization 
router.use(verifyJWT);
router.post("/:blogId", favoritesController.addFavorite);
router.delete("/:blogId", favoritesController.deleteFavorite);

module.exports = router;
