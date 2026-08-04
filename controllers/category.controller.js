const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category.model");

//* @desc Get list of categories
//* @route GET /categories
//* @access Public
const getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const categories = await Category.find().skip(skip).limit(limit);

  res.status(200).json({ results: categories.length, page, data: categories });
});

//* @desc Get specific category by id
//* @route GET /categories/:id
//* @access Public
const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    res.status(404).json({ msg: "Category not found" });
  } else {
    res.status(200).json({ data: category });
  }
});

//* @desc Update specific category by id
//* @route PUT /categories/:id
//* @access Private
const updateCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true },
  );

  if (!category) {
    res.status(404).json({ msg: "Category not found" });
  } else {
    res.status(200).json({ data: category });
  }
});

//* @desc Delete specific category by id
//* @route DELETE /categories/:id
//* @access Private
const deleteCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    res.status(404).json({ msg: "Category not found" });
  } else {
    res.status(200).json({ msg: "Category deleted successfully!" });
  }
});

//* @desc Create category
//* @route POST /categories
//* @access Private
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({ name, slug: slugify(name) });

  res.status(201).json({ data: category });
});

module.exports = {
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  createCategory,
};
