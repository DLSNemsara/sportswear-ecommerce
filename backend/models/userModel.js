import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String, default: null }, // Store hashed token here
    resetPasswordExpires: { type: Date, default: null },
    cartData: { type: Object, default: {} },
    wishlist: [
      {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { minimize: false }
);

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;
