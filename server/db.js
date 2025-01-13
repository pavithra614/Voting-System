const mysql = require("mysql2");
require("dotenv").config();  // Load environment variables from .env file

const pool = mysql.createPool({
  host: process.env.DB_HOST,       // 'localhost'
  user: process.env.DB_USER,       // 'root'
  password: process.env.DB_PASSWORD,  // Empty if no password
  database: process.env.DB_NAME,   // 'voting_system'
});

const promisePool = pool.promise();  // Enables promise-based queries

module.exports = promisePool;  // Export for use in queries
