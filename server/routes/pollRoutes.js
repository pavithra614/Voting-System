// routes/pollRoutes.js
const express = require("express");
const { createPoll } = require("../models/pollModel");
const router = express.Router();

// Route to create a new poll
router.post("/create", async (req, res) => {
  const { title, options } = req.body;

  // Validate input
  if (!title || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Poll title and at least two options are required.",
    });
  }

  try {
    const pollId = await createPoll(title, options);
    res.status(201).json({
      success: true,
      message: "Poll created successfully.",
      pollId,
    });
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create poll.",
    });
  }
});

module.exports = router;
