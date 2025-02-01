import express from "express";

import {
  loginUser,
  registerUser,
  adminLogin,
  dataUser,
  updateUser,
  deleteUser,
  allUsers,
  forgotPassword,
} from "../controllers/userController.js";

import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/data", authUser, dataUser);
userRouter.put("/updateuser", authUser, updateUser);
userRouter.get("/forgot-password", forgotPassword);
userRouter.delete("/deleteuser", authUser, deleteUser);
userRouter.post("/allusers", adminAuth, allUsers);

export default userRouter;
