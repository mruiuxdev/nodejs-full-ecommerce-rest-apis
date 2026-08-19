const Brand = require("../models/brand.model");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll
} = require("./handlerFactory");

//* @desc Get list of categories
//* @route GET /brands
//* @access Public
const getBrands = getAll(Brand);

//* @desc Get specific category by id
//* @route GET /brands/:id
//* @access Public
const getBrandById = getOne(Brand);

//* @desc Create brand
//* @route POST /brands
//* @access Private
const createBrand = createOne(Brand);

//* @desc Update specific brand by id
//* @route PUT /brands/:id
//* @access Private
const updateBrandById = updateOne(Brand);

//* @desc Delete specific brands by id
//* @route DELETE /brands/:id
//* @access Private
const deleteBrandById = deleteOne(Brand);

module.exports = {
  getBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
  createBrand
};
