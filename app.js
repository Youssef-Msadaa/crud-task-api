const express = require("express");
const app = express();
const mongoose = require("./database/connect");
app.listen(3000, () => {
  console.log("server starter on port 3000");
});
