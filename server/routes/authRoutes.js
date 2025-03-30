const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const JWT_SECRET = "your_generated_secret_key_12345";

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔹 Login Attempt:", { email, password });

    // Find user by email
    const user = await User.findOne({ email });
    console.log("🔹 Found User:", user);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Check if password matches exactly
    if (user.password !== password) {
      console.log("🔹 Password mismatch. Expected:", user.password);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, user });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
