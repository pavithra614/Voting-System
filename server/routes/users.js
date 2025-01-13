const express = require("express");
const bcrypt = require("bcryptjs"); // Using bcryptjs for consistency with password hashing
const jwt = require("jsonwebtoken");
const { createUser, getUserByUsername } = require("../models/userModel");
const { check, validationResult } = require("express-validator");

require("dotenv").config();
const router = express.Router();
const SECRET = process.env.JWT_SECRET || "default_secret_key";

// Register a new user
router.post(
  "/register",
  [
    // Validate username length and sanitize it
    check("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long")
      .trim()
      .escape(),
    
    // Validate password: minimum length, contains a number, contains an uppercase letter
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/[0-9]/)
      .withMessage("Password must contain a number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter"),
    
    // Validate role: must be either "admin" or "user"
    check("role")
      .isIn(["admin", "user"])
      .withMessage("Role must be 'admin' or 'user'"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { username, password, role } = req.body;

    try {
      // Check if the username already exists
      const existingUser = await getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "Username already exists", // Specific error for existing username
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user in the database
      await createUser(username, hashedPassword, role);

      res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({
        success: false,
        error: "Failed to register user", // General error message if something goes wrong
      });
    }
  }
);

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Login attempt with username:", username);

    // Check if the user exists
    const user = await getUserByUsername(username);
    if (!user) {
      console.error("No user found with username:", username);
      return res.status(401).json({
        success: false,
        message: "Invalid username or password", // Specific message for invalid username
      });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error("Invalid password for user:", username);
      return res.status(401).json({
        success: false,
        message: "Invalid username or password", // Specific message for invalid password
      });
    }

    // Create JWT token with user id and role
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1h" });

    // Send response with token and user role
    res.json({ success: true, token, role: user.role });
  } catch (error) {
    console.error("Unexpected error during login:", error.stack || error.message);
    res.status(500).json({
      success: false,
      message: "Failed to log in", // General error message if login fails
    });
  }
});

module.exports = router;
