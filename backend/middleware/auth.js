const jwt = require('jsonwebtoken');
const JWT_SECRET = '1q_5G%%,5p?>~_q"[sAEWsXA^{$Yju2v5TG>fyFeuD^#[8V!fCBdIf@dgd:q]ni'; // Replace with the same secret key from auth.js

// Middleware to verify JWT
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        console.log(token);
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("decoded : " + decoded);
        req.user = decoded; // Add decoded token to request object
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = { authenticate };
