import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    userEmail: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { minimize: false }
);

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;