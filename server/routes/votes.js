const express = require("express");
const { castVote, getPollResults } = require("../models/voteModel");

const router = express.Router();

// Cast a vote
router.post("/", async (req, res) => {
    const { pollId, optionId, userId } = req.body;

    try {
        await castVote(pollId, optionId, userId);
        res.json({ success: true, message: "Vote cast successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to cast vote" });
    }
});

// Get results for a poll
router.get("/:pollId/results", async (req, res) => {
    const { pollId } = req.params;

    try {
        const results = await getPollResults(pollId);
        res.json({ success: true, results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to fetch poll results" });
    }
});

module.exports = router;
