const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URI;
let database;

async function getDb() {
    if (database) return database;

    try {
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        database = client.db("dressdb");
        console.log("✅ Database connected");
        return database;
    } catch (err) {
        console.error("❌ Database connection error:", err.message);
        return null;
    }
}

module.exports = { getDb };
