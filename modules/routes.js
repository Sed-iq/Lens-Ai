const express = require("express");
const app = express();
const dontenv = require("dotenv").config();
const generate = require("./generate");
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "../client")));
app.post("/generate", generate);
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});
module.exports = app;
