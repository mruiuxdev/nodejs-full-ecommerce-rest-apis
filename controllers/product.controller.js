const Product = require("../models/product.model");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll
} = require("./handlerFactory");

//* @desc Get list of products
//* @route GET /products
//* @access Public
const getProducts = getAll(Product, "Products");

//* @desc Get specific product by id
//* @route GET /products/:id
//* @access Public
const getProductById = getOne(Product);

//* @desc Create product
//* @route POST /products
//* @access Private
const createProduct = createOne(Product);

//* @desc Update specific product by id
//* @route PUT /products/:id
//* @access Private
const updateProductById = updateOne(Product);

//* @desc Delete specific product by id
//* @route DELETE /products/:id
//* @access Private
const deleteProductById = deleteOne(Product);

module.exports = {
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createProduct
};
