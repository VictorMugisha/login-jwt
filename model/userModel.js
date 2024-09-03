const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String
});

module.exports = mongoose.model("User", userSchema)