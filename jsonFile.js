require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateToken = (user) => {
  const payload = {
    id: user._id, 
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const secretKey = JWT_SECRET_KEY;
  const options = { expiresIn: "1d" };
  const token = sign(payload, secretKey, options);

  return token;
};

module.exports = {
  createToken: generateToken,
};
