import userModel from "../models/userModel.js";
import mongoose from "mongoose";

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.body.userId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.json({ success: false, message: "Invalid product ID" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const productExists = user.wishlist.some(
      (item) => item.productId.toString() === productId
    );

    if (!productExists) {
      user.wishlist.push({ productId, addedAt: new Date() });
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Product added to wishlist successfully",
      });
    }

    res.json({
      success: false,
      message: "Product already exists in wishlist",
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const listWishlist = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await userModel
      .findById(userId)
      .populate("wishlist.productId");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error listing wishlist:", error);
    res.json({ success: false, message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const initialLength = user.wishlist.length;

    user.wishlist = user.wishlist.filter(
      (item) => item.productId.toString() !== productId
    );

    if (user.wishlist.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully",
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToWishlist, listWishlist, removeFromWishlist };