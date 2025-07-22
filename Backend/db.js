const { MongoClient } = require("mongodb");
require("dotenv").config();

let db;

const getDb = async () => {
  if (db) return db;

  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    db = client.db(); // or db = client.db("your_db_name");
    console.log("✅ Connected to MongoDB");
    return db;
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    return null;
  }
};

module.exports = { getDb };
