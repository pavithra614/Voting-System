const bcrypt = require("bcryptjs");
const db = require("../db"); // Assuming you have a db connection setup

// Create a new user
exports.createUser = async (username, password, role) => {
    // Validate input fields
    if (!username || !password || !role) {
        throw new Error("All fields (username, password, role) are required");
    }

    try {
        // Check if the username already exists
        const [existingUser] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser.length > 0) {
            throw new Error("Username already exists");
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database with hashed password
        const [result] = await db.query(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)", 
            [username, hashedPassword, role]
        );

        return result; // You can return the result if needed for debugging or further actions
    } catch (error) {
        console.error("Error inserting user:", error);
        throw new Error("Failed to create user");
    }
};

// Fetch a user by username
exports.getUserByUsername = async (username) => {
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        console.log("Fetched user from DB:", rows); // Log the fetched user
        return rows[0]; // Return the first match
    } catch (error) {
        console.error("Error fetching user from database:", error);
        throw new Error("Failed to fetch user");
    }
};
