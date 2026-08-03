const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const app = express();

app.get("/", (req, res) => {
  res.send("Our API 1");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
