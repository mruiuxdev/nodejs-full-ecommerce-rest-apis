const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const APIError = require("./utils/apiError");
const globalError = require("./middlewares/error.middleware");
const categoryRoute = require("./routes/category.route");
const subCategoryRoute = require("./routes/subCategory.route");
const brandRoute = require("./routes/brand.route");

//* Read ENV
dotenv.config({ path: ".env" });
//* Connect Database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//* Routes
app.use("/v1/categories", categoryRoute);
app.use("/v1/subcategories", subCategoryRoute);
app.use("/v1/brands", brandRoute);

//! In case no route found
//* @ another solution app.all("/*splat", () => {})
app.use((req, res, next) => {
  next(new APIError(`Cannot find this route: ${req.originalUrl}`, 404));
});

//* "Global" Error handling middleware express
app.use(globalError);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});

//* Handle any unhandled rejection not have control on
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Server is shutting down...");
    process.exit(1);
  });
});
