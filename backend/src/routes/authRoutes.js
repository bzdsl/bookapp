/** @format */

import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "10d" });
};
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res
        .status(400)
        .send("Please provide email, username and password");
    }
    if (password.length < 6) {
      return res.status(400).send("Password must be at least 6 characters");
    }
    if (username.length < 3) {
      return res.status(400).send("Username must be at least 3 characters");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ message: "Email already exists" });
    }

    //get random avatar
    const profileImage = `https://api.dicebear.com/6.x/lorelei/svg?seed=${username}`;

    const user = new User({
      email,
      username,
      password,
      profileImage,
    });
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Error in register route:", error.message);
    res.status(500).json({ message: error.message }); // Temporarily show actual error
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }
    //check if password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid credentials");
    }

    //generate token
    const token = generateToken(user._id);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in login route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
