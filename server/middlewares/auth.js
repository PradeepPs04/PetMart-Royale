const jwt = require('jsonwebtoken');
require('dotenv').config();

// auth 
exports.isAuth = async (req, res, next) => {
    // fetch token from cookies
    const token = req.cookies.token;
    
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user",
        });
    }

    // verify token
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // add decoded token to req object
        req.user = decode;

        // go to next
        next();
    } catch(err) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user",
        });
    }
}