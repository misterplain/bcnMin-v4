import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  // let token = req.get("Authorization")
  let token = req.body.headers.Authorization;
  if (token) {
    token = token.slice(token.indexOf(" ") + 1);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
      console.log("token verified");
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
      console.log("token not verified", error);
    }
  } else {
    res.status(401);
    console.log("protect middleware token not found");
    throw new Error("No token, authorization denied");
  }
});

export { protect };
