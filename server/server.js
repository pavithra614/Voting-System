const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const usersRoutes = require("./routes/users");
const pollRoutes = require("./routes/pollRoutes");
const votesRoutes = require("./routes/votes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Built-in middleware for JSON parsing
app.use(morgan("dev")); // Logs requests in a "dev" format for debugging

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Voting System API");
});

// Routes
app.use("/users", usersRoutes);
app.use("/polls", pollRoutes); // Updated route for managing polls
app.use("/votes", votesRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown on process termination
process.on("SIGINT", () => {
  console.log("\nShutting down server...");
  process.exit(0);
});
