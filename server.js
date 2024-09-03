const express = require("express");
const app = express();
const { createToken } = require("./jsonFile");
const cors = require("cors");
require("dotenv").config();
const validateToken = require("./utils/validateToken.js");

const UserModel = require("./model/userModel.js");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const MONGODB_CONNECTION =
  "mongodb+srv://victormugisha:victormugisha123@nodenetninja.hd6g2.mongodb.net/login-jwt?retryWrites=true&w=majority&appName=NodeNetNinja";

// connect the database
mongoose
  .connect(MONGODB_CONNECTION)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Mock a login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  }

  const user = UserModel.findOne({ username });
  res.json(user);

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username" });
  }
});

// Mock a register route
app.post("/register", async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new UserModel({
    firstName,
    lastName,
    username,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
});

// The protected route
app.get("/protected", validateToken, (req, res) => {
  res.json({ success: true, message: "Protected route!", user: req.user });
});

// now the endpoint for login is http://localhost:3000/login

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
