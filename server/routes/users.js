const express = require("express");
const bcrypt = require("bcrypt");
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
        check("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
        check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        check("role").isIn(["admin", "user"]).withMessage("Role must be 'admin' or 'user'"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await createUser(username, hashedPassword, role);
            res.status(201).json({ success: true, message: "User registered successfully" });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ success: false, error: "Failed to register user" });
        }
    }
);

// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log("Login attempt with username:", username);

        const user = await getUserByUsername(username);
        if (!user) {
            console.error("No user found with username:", username);
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.error("Invalid password for user:", username);
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1h" });
        res.json({ success: true, token, role: user.role }); // Include role in response
    } catch (error) {
        console.error("Unexpected error during login:", error.stack || error.message);
        res.status(500).json({ success: false, message: "Failed to log in" });
    }
});

module.exports = router;
