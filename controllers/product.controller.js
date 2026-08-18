const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const APIError = require("../utils/apiError");
const APIFeatures = require("../utils/apiFeature");

//* @desc Get list of products
//* @route GET /products
//* @access Public
const getProducts = asyncHandler(async (req, res, _next) => {
  //* Build query
  const countDocs = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .paginate(countDocs)
    .filter()
    .sort()
    .limitFields()
    .search("Products");

  //* Execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;

  /*
   * Another option filtration
   * .where("price")
   * .equals(req.query.price)
   * .where("ratingsAverage")
   * .equals(req.query.ratingsAverage)
   * .populate({ path: "category subCategories", select: "name -_id" });
   */

  res.status(200).json({
    results: products.length,
    paginationResult,
    data: products
  });
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
