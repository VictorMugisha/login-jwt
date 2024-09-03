const express = require("express");
const app = express();
const { createToken } = require("./jsonFile");
const { verify } = require("jsonwebtoken");
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const PORT = 3000;

app.use(express.json());

const user = {
  userId: 1,
  firstName: "Victor",
  lastName: "Mugisha",
  username: "VictorMugisha",
  password: "password",
};

// JWT token validation middleware
const validateToken = (req, res, next) => {
    const authHeader = req.headers.authentication;
    if (!authHeader) {
        res.status(401).json({
            success: false,
            message: 'Token is not provided'
        });
    } else {
        const token = authHeader.split(' ')[1]; // Bearer <token>

        verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid token'
                });
            } else {
                req.user = decoded;
                next()
            }
        })
    }
}

// Mock a login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    const token = createToken(user);
    res.json({ success: true, message: 'Authentication successful!', token: token });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }
});

// now the endpoint for login is http://localhost:3000/login

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
