import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import orderRouter from "./routes/orderRoutes.js";
import router from "./routes/collectionRoute.js";
import cartRouter from "./routes/cartRoute.js";
import wishlistRouter from "./routes/wishlistRoute.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/reviews", reviewRoute);
app.use("/api/order", orderRouter);
app.use("/api/collection", router);
app.use("/api/wishlist", wishlistRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

// app.listen(port, () => console.log("Server started on PORT : " + port));

process.on("SIGINT", () => {
  console.log("Gracefully shutting down...");
  app.close(() => {
    console.log("Closed out remaining connections.");
    process.exit(0);
  });
});
export default app;
