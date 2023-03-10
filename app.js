const express = require("express");
const routes = require("./modules/routes");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: "include",
  })
);
app.use(routes);
app.listen(process.env.PORT || 5000, console.log(process.env.PORT || 5000));
