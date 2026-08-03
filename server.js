const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./db");

dotenv.config({ path: ".env" });
connectDB();

const app = express();

if (process.env.NODE_ENV === "dev") app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Our API 1");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
