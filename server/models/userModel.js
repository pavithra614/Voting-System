const db = require("../db");

// Create a new user
exports.createUser = async (username, password, role) => {
    try {
        // Insert user into the database
        const [result] = await db.query(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)", 
            [username, password, role]
        );
        return result; // You can return the result if needed for debugging or further actions
    } catch (error) {
        console.error("Error inserting user:", error);
        throw new Error("Failed to create user"); // Throw a more descriptive error
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
