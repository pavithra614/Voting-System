const db = require("../db");

// Cast a vote
exports.castVote = async (pollId, optionId, userId) => {
    return db.query("INSERT INTO votes (poll_id, option_id, user_id) VALUES (?, ?, ?)", [pollId, optionId, userId]);
};

// Get results for a poll
exports.getPollResults = async (pollId) => {
    const [rows] = await db.query(
        "SELECT option_text, COUNT(votes.id) AS vote_count FROM poll_options LEFT JOIN votes ON poll_options.id = votes.option_id WHERE poll_options.poll_id = ? GROUP BY poll_options.id",
        [pollId]
    );
    return rows;
};
