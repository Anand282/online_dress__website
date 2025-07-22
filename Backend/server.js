require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const { getDb } = require("./db");
const verifyToken = require("./middleware/verifyToken");

const app = express();
const saltRounds = 10;

const allowedOrigins = [
  "http://localhost:3000",
  "https://online-dress-website.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only PNG, JPG, JPEG, WEBP formats allowed."));
    }
    cb(null, true);
  },
});
app.use("/uploads", express.static("uploads"));

// ----------------- Routes -----------------

// ✅ Register
app.post("/register", upload.single("image"), async (req, res) => {
  const { email, password, gender, number, age } = req.body;
  const file = req.file;

  if (!email || !password || !gender || !number || !age || !file) {
    return res.status(400).json({ error: "All fields and image required." });
  }

  try {
    const db = await getDb();
    const users = db.collection("register");

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = {
      email,
      password: hashedPassword,
      gender,
      number,
      age,
      imageUrl: `/uploads/${file.filename}`,
    };

    await users.insertOne(user);
    res.status(201).json({ message: "User registered", imageUrl: user.imageUrl });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = await getDb();
    const users = db.collection("register");

    const user = await users.findOne({ email: username });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ email: user.email }, "your_secret_key", { expiresIn: "1h" });
    res.json({ success: true, message: "Login successful", user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Profile
app.get("/profile/:email", verifyToken, async (req, res) => {
  try {
    const db = await getDb();
    const users = db.collection("register");

    const user = await users.findOne(
      { email: req.params.email },
      { projection: { password: 0 } }
    );
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Contact Form
app.post("/contactUser", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    if (!name || !email || !message) {
      return res.status(400).send("Fill all fields.");
    }
    const db = await getDb();
    const contactCollection = db.collection("contactuser");
    await contactCollection.insertOne({ name, email, message });
    res.status(201).send("Submitted");
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).send("Error inserting data");
  }
});

// ✅ Report
app.post("/report", async (req, res) => {
  const { name, email, number, message } = req.body;
  try {
    if (!name || !email || !number || !message) {
      return res.status(400).send("All fields required.");
    }
    const db = await getDb();
    const reportCollection = db.collection("report");
    await reportCollection.insertOne({ name, email, number, message });
    res.status(201).send("Report submitted");
  } catch (error) {
    console.error("Report error:", error);
    res.status(500).send("Error submitting report");
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  const db = await getDb();
  if (db) {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } else {
    console.log("❌ Failed to connect to DB. Server still running.");
  }
});
