// backend/routes/order.js
const express = require("express");
const router = express.Router();
const { getDb } = require("../db");
const verifyToken = require("../middleware/verifyToken");


router.use(verifyToken);

// Create an order
router.post("/create-order", verifyToken, async (req, res) => {
    try {
        const db = await getDb();
        const { items } = req.body;
        const userEmail = req.user.email; 

        const order = {
            userId: userEmail,
            items,
            status: "pending", 
            createdAt: new Date(),
        };

        const orderCollection = db.collection("orders");
        await orderCollection.insertOne(order);

        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
});

// Fetch orders for a user
router.get("/", verifyToken, async (req, res) => {
    try {
        const db = await getDb();
        const userEmail = req.user.email; 

        const orderCollection = db.collection("orders");
        const orders = await orderCollection.find({ userId: userEmail }).toArray();

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});

module.exports = router;