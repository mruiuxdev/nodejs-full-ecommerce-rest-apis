const SubCategory = require("../models/subCategory.model");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll
} = require("./handlerFactory");

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

const getSubCategories = getAll(SubCategory, createFilterObj);

//* @desc Get specific subcategory
//* @route GET /subcategories
//* @access Public
const getSubCategoryById = getOne(SubCategory);

//* @desc Create subcategory
//* @route POST /subcategories
//* @access Private
const setCategoryIdBody = (req, _res, next) => {
  if (!req.body.categoryId) req.body.category = req.params.categoryId;
  next();
};
const createSubCategory = createOne(SubCategory);

//* @desc Update specific subcategory by id
//* @route PUT /subcategories/:id
//* @access Private
const updateSubcategoryById = updateOne(SubCategory);

//* @desc Delete specific subcategory by id
//* @route DELETE /subcategories/:id
//* @access Private
const deleteSubcategoryById = deleteOne(SubCategory);

module.exports = {
  setCategoryIdBody,
  createSubCategory,

  createFilterObj,
  getSubCategories,

  getSubCategoryById,
  updateSubcategoryById,
  deleteSubcategoryById
};
