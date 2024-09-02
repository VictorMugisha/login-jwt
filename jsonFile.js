const { sign, verify } = require("jsonwebtoken");

const createToken = (payload) => {
    return sign(payload, "secret", { expiresIn: "1d" });
};


module.exports = {
    createToken,
}