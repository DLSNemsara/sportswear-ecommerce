import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/e-sportswear`);
    console.log("Database connected!");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};
