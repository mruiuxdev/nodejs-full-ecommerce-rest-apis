const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const APIError = require("../utils/apiError");
const Brand = require("../models/brand.model");

//* @desc Get list of categories
//* @route GET /brands
//* @access Public
const getBrands = asyncHandler(async (req, res, _next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const brands = await Brand.find().skip(skip).limit(limit);

  res.status(200).json({ results: brands.length, page, data: brands });
});

//* @desc Get specific category by id
//* @route GET /brands/:id
//* @access Public
const getBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);

  if (!brand) {
    return next(new APIError("Brand not found", 404));
  } else {
    res.status(200).json({ data: brand });
  }
});

//* @desc Update specific brand by id
//* @route PUT /brands/:id
//* @access Private
const updateBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
    return next(new APIError("Brand not found", 404));
  } else {
    res.status(200).json({ data: brand });
  }
});

//* @desc Delete specific brands by id
//* @route DELETE /brands/:id
//* @access Private
const deleteBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    return next(new APIError("Brand not found", 404));
  } else {
    res.status(200).json({ msg: "Brand deleted successfully!" });
  }
});

//* @desc Create brand
//* @route POST /brands
//* @access Private
const createBrand = asyncHandler(async (req, res, _next) => {
  const { name } = req.body;

  const brand = await Brand.create({ name, slug: slugify(name) });

  res.status(201).json({ data: brand });
});

module.exports = {
  getBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
  createBrand
};
