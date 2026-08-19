const Category = require("../models/category.model");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll
} = require("./handlerFactory");

//* @desc Get list of categories
//* @route GET /categories
//* @access Public
const getCategories = getAll(Category);

//* @desc Get specific category by id
//* @route GET /categories/:id
//* @access Public
const getCategoryById = getOne(Category);

//* @desc Create category
//* @route POST /categories
//* @access Private
const createCategory = createOne(Category);

//* @desc Update specific category by id
//* @route PUT /categories/:id
//* @access Private
const updateCategoryById = updateOne(Category);

//* @desc Delete specific category by id
//* @route DELETE /categories/:id
//* @access Private
const deleteCategoryById = deleteOne(Category);

module.exports = {
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  createCategory
};
