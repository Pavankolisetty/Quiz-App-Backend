const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ Middleware to Verify Token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the user payload to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// ✅ Middleware for Admin Role
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// ✅ Signup API with Role Assignment
router.post("/signup", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Both username and password are required" });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      username,
      password, // Store password in plain text (not recommended for production)
      role: role || "user", // Default to "user" if no role is provided
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { username, role: newUser.role },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
});

// ✅ Login API with Role-Based Token
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT Token including the user's role
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Include `role` in the payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// ✅ Example of a Protected Route (Admin Only)
router.get("/admin", verifyToken, isAdmin, async (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

module.exports = router;
