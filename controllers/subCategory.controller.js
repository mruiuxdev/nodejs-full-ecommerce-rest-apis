const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const SubCategory = require("../models/subCategory.model");
const APIError = require("../utils/apiError");
const Category = require("../models/category.model");

//* @desc Get list subcategories
//* @route GET /subcategories
//* @access Public
const createFilterObj = (req, res, next) => {
  const { categoryId } = req.params;

  let filterObject = {};

  if (categoryId) filterObject = { category: categoryId };

  req.filterObject = filterObject;

  next();
};
const getSubCategories = asyncHandler(async (req, res, _next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await SubCategory.find(req.filterObject)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "category",
      select: "name slug -_id"
    });

  res
    .status(200)
    .json({ results: subCategories.length, page: page, data: subCategories });
});

//* @desc Get specific subcategory
//* @route GET /subcategories
//* @access Public
const getSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findById(id).populate({
    path: "category",
    select: "name slug -_id"
  });

  if (!subCategory) {
    return next(new APIError("Subcategory not found", 404));
  }

  res.status(200).json({ data: subCategory });
});

//* @desc Create subcategory
//* @route POST /subcategories
//* @access Private
const setCategoryIdBody = (req, _res, next) => {
  if (!req.body.categoryId) req.body.category = req.params.categoryId;
  next();
};
const createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;

  const isCategoryFound = await Category.findById(category);

  if (!isCategoryFound) {
    return next(new APIError("Category not found", 404));
  }

  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category
  });

  res.status(201).json({ data: subCategory });
});

//* @desc Update specific subcategory by id
//* @route PUT /subcategories/:id
//* @access Private
const updateSubcategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const categoryId = await Category.findById(category);

  if (!categoryId) {
    return next(new APIError("Category not found", 404));
  }

  const subCategory = await SubCategory.findByIdAndUpdate(
    id,
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!subCategory) {
    return next(new APIError("Subcategory not found", 404));
  } else {
    res.status(200).json({ data: subCategory });
  }
});

//* @desc Delete specific subcategory by id
//* @route DELETE /subcategories/:id
//* @access Private
const deleteSubcategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findByIdAndDelete(id);

  if (!subCategory) {
    return next(new APIError("Subcategory not found", 404));
  } else {
    res.status(200).json({ msg: "Subcategory deleted successfully!" });
  }
});

module.exports = {
  setCategoryIdBody,
  createSubCategory,

  createFilterObj,
  getSubCategories,

  getSubCategoryById,
  updateSubcategoryById,
  deleteSubcategoryById
};
