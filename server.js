const express = require("express");
const app = express();
const { createToken } = require("./jsonFile");

const PORT = 3000;

app.use(express.json());

const user = {
  firstName: "Victor",
  lastName: "Mugisha",
  username: "VictorMugisha",
  password: "password",
};

// Mock a login route
app.post("/login", (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  if (username === user.username && password === user.password) {
  } else {
    res.status(400).json({ error: "Invalid username or password" });
  }
});
