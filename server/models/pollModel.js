const db = require("../db"); // Import your database connection

// Function to create a poll
const createPoll = async (title, options) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [pollResult] = await connection.execute(
      "INSERT INTO polls (title) VALUES (?)",
      [title]
    );

    const pollId = pollResult.insertId;

    const optionPromises = options.map((optionText) =>
      connection.execute(
        "INSERT INTO poll_options (poll_id, option_text) VALUES (?, ?)",
        [pollId, optionText]
      )
    );
    await Promise.all(optionPromises);

    await connection.commit();
    return pollId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Function to get all polls
const getAllPolls = async () => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute("SELECT * FROM polls");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

// Function to get a poll by its ID
const getPollById = async (pollId) => {
  const connection = await db.getConnection();
  try {
    const [poll] = await connection.execute(
      "SELECT * FROM polls WHERE id = ?",
      [pollId]
    );

    if (poll.length > 0) {
      const [options] = await connection.execute(
        "SELECT * FROM poll_options WHERE poll_id = ?",
        [pollId]
      );

      return {
        ...poll[0], // poll data
        options: options.map((option) => ({
          id: option.id,
          text: option.option_text,
        })),
      };
    } else {
      return null; // Poll not found
    }
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

// Function to get options for a specific poll
const getPollOptions = async (pollId) => {
  const connection = await db.getConnection();
  try {
    const [options] = await connection.execute(
      "SELECT id, option_text FROM poll_options WHERE poll_id = ?",
      [pollId]
    );
    return options;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

// Function to delete a poll
const deletePoll = async (pollId) => {
  const connection = await db.getConnection();
  try {
    const [result] = await connection.execute("DELETE FROM polls WHERE id = ?", [
      pollId,
    ]);
    if (result.affectedRows === 0) {
      return false; // Poll not found
    }

    await connection.execute("DELETE FROM poll_options WHERE poll_id = ?", [
      pollId,
    ]);
    return true;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  createPoll,
  getAllPolls,
  getPollById,
  getPollOptions, // Added function to fetch options
  deletePoll,
};
