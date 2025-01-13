// models/pollModel.js
const db = require("../db"); // Import your database connection

// Function to create a poll
const createPoll = async (title, options) => {
  const connection = await db.getConnection();
  try {
    // Start a transaction
    await connection.beginTransaction();

    // Insert the poll into the polls table
    const [pollResult] = await connection.execute(
      "INSERT INTO polls (title) VALUES (?)",
      [title]
    );

    const pollId = pollResult.insertId;

    // Insert options into poll_options table
    const optionPromises = options.map((optionText) =>
      connection.execute(
        "INSERT INTO poll_options (poll_id, option_text) VALUES (?, ?)",
        [pollId, optionText]
      )
    );
    await Promise.all(optionPromises);

    // Commit transaction
    await connection.commit();
    return pollId;
  } catch (error) {
    // Rollback transaction in case of error
    await connection.rollback();
    throw error;
  } finally {
    // Release the connection
    connection.release();
  }
};

module.exports = { createPoll };
