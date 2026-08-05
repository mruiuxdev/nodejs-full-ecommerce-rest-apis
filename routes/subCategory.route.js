const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubcategoryById,
  deleteSubcategoryById
} = require("../controllers/subCategory.controller");
const {
  createSubCategoryValidator,
  getSubCategoryValidatorById,
  updateSubCategoryValidatorById,
  deleteSubCategoryValidatorById
} = require("../utils/validators/subCategory.validator");

const router = express.Router();

router
  .route("/")
  .get(getSubCategories)
  .post(createSubCategoryValidator, createSubCategory);

router
  .route("/:id")
  .get(getSubCategoryValidatorById, getSubCategoryById)
  .put(updateSubCategoryValidatorById, updateSubcategoryById)
  .delete(deleteSubCategoryValidatorById, deleteSubcategoryById);

module.exports = router;
