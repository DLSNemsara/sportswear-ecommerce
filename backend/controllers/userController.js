import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const dataUser = async (req, res) => {
  try {
    const { email, psw } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(psw, user.password);
    const userName = user.name;

    if (isMatch) {
      res.json({ success: true, userName });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password, captchaToken } = req.body;
    const exists = await userModel.findOne({ email });

    const captchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captchaToken,
        }),
      }
    );

    const captchaResult = await captchaResponse.json();

    if (!captchaResult.success) {
      return res.json({
        success: false,
        message: "CAPTCHA validation failed. Please verify you are human.",
      });
    } else if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
      });
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      return res.json({
        success: false,
        message: "Name must be valid and contain only letters and spaces.",
      });
    } else if (exists) {
      return res.json({ success: false, message: "User already exists." });
    } else if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token, captchaToken });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Internal server error." });
  }
};
const updateUser = async (req, res) => {
  try {
    const { email, passwords, newpassword, captchaToken } = req.body;

    const captchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captchaToken,
        }),
      }
    );

    const captchaResult = await captchaResponse.json();

    if (!captchaResult.success || captchaResult.score < 0.5) {
      return res.json({
        success: false,
        message: "CAPTCHA validation failed. Please verify you are human.",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(passwords, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    if (
      newpassword.length < 8 ||
      !/[A-Z]/.test(newpassword) ||
      !/[0-9]/.test(newpassword) ||
      !/[!@#$%^&*]/.test(newpassword)
    ) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newpassword, salt);

    const updatedUser = await userModel.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedNewPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({
        success: false,
        message: "Error while setting password",
      });
    }

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "An error occurred while updating the user",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email, captchaToken } = req.query;

    const captchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captchaToken,
        }),
      }
    );

    const captchaResult = await captchaResponse.json();

    if (!captchaResult.success || captchaResult.score < 0.5) {
      return res.json({
        success: false,
        message: "CAPTCHA validation failed. Please verify you are human.",
      });
    }

    if (!email || !validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email address" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // const resetToken = crypto.randomBytes(32).toString("hex");
    // const resetTokenHash = crypto
    //   .createHash("sha256")
    //   .update(resetToken)
    //   .digest("hex");

    // user.resetPasswordToken = resetTokenHash;
    // user.resetPasswordExpires = Date.now() + 3600000;
    // await user.save();

    // const resetURL = `${process.env.FRONTEND_URL}reset-password/${resetToken}`;

    res.json({ success: true, message: "User identified" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Failed to send password reset email",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email, DeleteCaptchaToken } = req.body;

    if (!email || typeof email !== "string") {
      return res.json({ success: false, message: "Invalid email provided" });
    }

    const captchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: DeleteCaptchaToken,
        }),
      }
    );

    const captchaResult = await captchaResponse.json();

    if (!captchaResult.success || captchaResult.score < 0.5) {
      return res.json({
        success: false,
        message: "CAPTCHA validation failed. Please verify you are human.",
      });
    }

    const result = await userModel.deleteOne({ email });

    if (result.deletedCount === 0) {
      return res.json({
        success: false,
        message: "No user found with this email",
      });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "An error occurred while deleting the user",
    });
  }
};

const allUsers = async (req, res) => {
  try {
    const token = req.body;
    const documents = await userModel.find();

    res.json({ success: true, message: "recived", token, documents });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email == process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  dataUser,
  updateUser,
  forgotPassword,
  deleteUser,
  allUsers,
};
