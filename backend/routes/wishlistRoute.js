import express from "express";

import {
  addToWishlist,
  listWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

import authUser from "../middleware/auth.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/add", authUser, addToWishlist);
wishlistRouter.get("/list", authUser, listWishlist);
wishlistRouter.delete("/remove", authUser, removeFromWishlist);

export default wishlistRouter;