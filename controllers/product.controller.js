const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const APIError = require("../utils/apiError");

//* @desc Get list of products
//* @route GET /products
//* @access Public
const getProducts = asyncHandler(async (req, res, _next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const products = await Product.find()
    .skip(skip)
    .limit(limit)
    .populate({ path: "category subCategory", select: "name -_id" });

  res.status(200).json({ results: products.length, page, data: products });
});

//* @desc Get specific product by id
//* @route GET /products/:id
//* @access Public
const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate({
    path: "category subCategory",
    select: "name -_id"
  });

  if (!product) {
    return next(new APIError("Product not found", 404));
  } else {
    res.status(200).json({ data: product });
  }
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

//* @desc Create product
//* @route POST /products
//* @access Private
const createProduct = asyncHandler(async (req, res, _next) => {
  req.body.slug = slugify(req.body.name);

  const product = await Product.create(req.body);

  res.status(201).json({ data: product });
});

module.exports = {
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createProduct
};
