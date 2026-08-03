const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { Schema, default: mongoose } = require("mongoose");
const categoryRoute = require("./routes/category.route");

dotenv.config({ path: ".env" });
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "dev") app.use(morgan("dev"));

app.use("/v1/categories", categoryRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
