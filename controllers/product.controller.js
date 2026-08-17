const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const APIError = require("../utils/apiError");

//* @desc Get list of products
//* @route GET /products
//* @access Public
const getProducts = asyncHandler(async (req, res, _next) => {
  //* Exclude filter queries
  const queryStringObj = { ...req.query };
  const excludesFields = ["page", "sort", "limit", "fields"]; // These fields are API control parameters, not MongoDB filters

  excludesFields.forEach((field) => delete queryStringObj[field]);

  //* {price: {$gte: 50}, ratingsAverage: {$gte: 4}} => Mongoose query
  //* {price: {gte: '50'}, ratingsAverage: {gte: '4'}} => Req query "{{dev__localhost}}/products?price[gte]=50&ratingsAverage[gte]=4"
  let queryStr = JSON.stringify(queryStringObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;

  //* Build query
  const mongooseQuery = Product.find(JSON.parse(queryStr));
  //* Execute query
  const products = await mongooseQuery
    //* Another option filtration
    // .where("price")
    // .equals(req.query.price)
    // .where("ratingsAverage")
    // .equals(req.query.ratingsAverage)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category subCategories", select: "name -_id" });

  res.status(200).json({ results: products.length, page, data: products });
});

//* @desc Get specific product by id
//* @route GET /products/:id
//* @access Public
const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate({
    path: "category subCategories",
    select: "name -_id"
  });

  if (!product) {
    return next(new APIError("Product not found", 404));
  } else {
    res.status(200).json({ data: product });
  }
});

//* @desc Create product
//* @route POST /products
//* @access Private
const createProduct = asyncHandler(async (req, res, _next) => {
  req.body.slug = slugify(req.body.name);

  const product = await Product.create(req.body);

  res.status(201).json({ data: product });
});

//* @desc Update specific product by id
//* @route PUT /products/:id
//* @access Private
const updateProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) req.body.slug = slugify(req.body.name);

  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

  if (!product) {
    return next(new APIError("Product not found", 404));
  } else {
    res.status(200).json({ data: product });
  }
});

//* @desc Delete specific product by id
//* @route DELETE /products/:id
//* @access Private
const deleteProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new APIError("Product not found", 404));
  } else {
    res.status(200).json({ msg: "Product deleted successfully!" });
  }
});

module.exports = {
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createProduct
};
