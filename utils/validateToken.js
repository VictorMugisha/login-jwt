require("dotenv").config();
const { verify } = require("jsonwebtoken");


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// JWT token validation middleware
const validateToken = (req, res, next) => {
  const authHeader = req.headers.authentication;
  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: "Token is not provided",
    });
  } else {
    const token = authHeader.split(" ")[1]; // Bearer <token>

    verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid token",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};


module.exports = validateToken