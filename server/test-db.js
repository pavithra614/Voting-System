const db = require("./db");

async function testDbConnection() {
  try {
    const [rows, fields] = await db.query("SELECT 1 + 1 AS result");
    console.log("Database connected successfully:", rows[0].result); // Should print: 2
  } catch (err) {
    console.error("Error connecting to database:", err.message);
  }
}

testDbConnection();
