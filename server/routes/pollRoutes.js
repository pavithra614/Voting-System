const express = require("express");
const {
  createPoll,
  getAllPolls,
  getPollById,
  getPollOptions,
  deletePoll,
} = require("../models/pollModel");

const router = express.Router();

// Route to create a new poll
router.post("/create", async (req, res) => {
  const { title, options } = req.body;

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

// Route to get all polls
router.get("/", async (req, res) => {
  try {
    const polls = await getAllPolls();
    res.json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ success: false, message: "Failed to fetch polls." });
  }
});

// Route to get a specific poll by ID
router.get("/:pollId", async (req, res) => {
  const { pollId } = req.params;

  try {
    const poll = await getPollById(pollId);
    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found.",
      });
    }
    res.status(200).json({
      success: true,
      poll,
    });
  } catch (error) {
    console.error("Error fetching poll:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch poll details.",
    });
  }
});

// Route to get options for a specific poll
router.get("/:pollId/options", async (req, res) => {
  const { pollId } = req.params;

  try {
    const options = await getPollOptions(pollId);
    if (options.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No options found for the specified poll.",
      });
    }
    res.status(200).json({
      success: true,
      options,
    });
  } catch (error) {
    console.error("Error fetching poll options:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch poll options.",
    });
  }
});

// Route to delete a poll
router.delete("/:pollId", async (req, res) => {
  const { pollId } = req.params;

  try {
    const result = await deletePoll(pollId);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Poll deleted successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Poll not found.",
      });
    }
  } catch (error) {
    console.error("Error deleting poll:", error);
    res.status(500).json({ success: false, message: "Failed to delete poll." });
  }
});

module.exports = router;
