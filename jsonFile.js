const { sign, verify } = require("jsonwebtoken");

const generateToken = (payload) => {
    const secretKey = "someSecretString";
    const options = { expiresIn: "1d" };
    const token = sign(payload, secretKey, options);
    
    return token;
};


module.exports = {
    createToken: generateToken,
}