const express = require("express");

const app = express();

const { createToken } = require("./jsonFile");

console.log(createToken({ name: "Victor" }))