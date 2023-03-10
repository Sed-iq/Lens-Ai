const express = require("express");
const app = express();
const dontenv = require("dotenv").config();
const generate = require("./generate");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/generate", generate);
app.get("/", (req, res) => {
  res.send("Homepage");
});
module.exports = app;
