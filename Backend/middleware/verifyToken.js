const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) return res.status(401).json({ success: false, message: 'Access Denied' });

    try {
        const decoded = jwt.verify(token, 'your_secret_key'); 
        req.user = decoded;
        next(); 
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid Token' });
    }
};

module.exports = verifyToken;