require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require("multer");
const bodyParser = require('body-parser');
const { getDb } = require("./db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/verifyToken");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const saltRounds = 10;
const orderRoutes = require("./routes/order");

const allowedOrigins = [
    "https://online-dress-website.vercel.app",
    "http://localhost:3000"
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
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Multer setup for storing uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});


const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
        if (!allowedFormats.includes(file.mimetype)) {
            return cb(new Error("Only PNG, JPG, JPEG, and WEBP formats are allowed."));
        }
        cb(null, true);
    },
});

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// app.get("/", (req, res) => {
//   res.send("API is running.");
// });

// Register API
app.post("/register", upload.single("image"), async (req, res) => {
    const insertForm = req.body;
    const db = await getDb();
    const collection = db.collection("register");

    try {
        if (insertForm.email && insertForm.password && insertForm.gender && insertForm.number && insertForm.age && req.file) {

            const hashedPassword = await bcrypt.hash(insertForm.password, saltRounds);

            const user = {
                email: insertForm.email,
                password: hashedPassword,
                gender: insertForm.gender,
                number: insertForm.number,
                age: insertForm.age,
                imageUrl: `/uploads/${req.file.filename}`,
            };

            await collection.insertOne(user);
            res.status(201).json({ message: "User registered successfully", imageUrl: user.imageUrl });
        } else {
            res.status(400).json({ error: "All fields and an image are required" });
        }
    } catch (error) {
        console.error("Error in register API:", error);
        res.status(500).json({ error: "Server error" });
    }
});





// Login API
app.post("/", async (req, res) => {
    const { username, password } = req.body;
    const db = await getDb();
    const collection = db.collection("register");

    try {
        const user = await collection.findOne({ email: username });

        if (user) {

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {

                const token = jwt.sign({ email: user.email }, "your_secret_key", { expiresIn: "1h" });

                res.json({ success: true, message: "Login successful", user, token });
            } else {
                res.json({ success: false, message: "Wrong username or password" });
            }
        } else {
            res.json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


app.get("/profile/:email", verifyToken, async (req, res) => {
    console.log("Token received:", req.headers.authorization);

    try {
        const db = await getDb();
        const collection = db.collection("register");
        const user = await collection.findOne(
            { email: req.params.email },
            { projection: { password: 0 } }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Contact API
app.post('/contactUser', async (req, res) => {
    try {
        const insertData = req.body;
        const db = await getDb();
        let collection = db.collection('contactuser');
        console.log(insertData);
        if (insertData.email && insertData.name && insertData.message) {
            await collection.insertOne(insertData);
            res.end();
        } else {
            res.status(400).send('Please fill out the form data');
        }
    } catch (error) {
        console.log("Error inserting data:", error);
        res.status(500).send("Error inserting data");
    }
});

// Report API
app.post("/report", async (req, res) => {
    const insertdata = req.body;
    const db = await getDb();
    const collection = db.collection('report');
    try {
        if (insertdata.email && insertdata.name && insertdata.number && insertdata.message) {
            await collection.insertOne(insertdata);
            res.end();
        } else {
            console.log("Error in report backend");
        }
    } catch (error) {
        console.error("Error in fetching data report", error);
    }
});

app.get("/admin",)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));