const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubcategoryById,
  deleteSubcategoryById,
  setCategoryIdBody,
  createFilterObj
} = require("../controllers/subCategory.controller");
const {
  createSubCategoryValidator,
  getSubCategoryValidatorById,
  updateSubCategoryValidatorById,
  deleteSubCategoryValidatorById
} = require("../utils/validators/subCategory.validator");

//* Merge params: allow us to access parameters on other routes
//* Ex: Access category id from category router
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getSubCategories)
  .post(setCategoryIdBody, createSubCategoryValidator, createSubCategory);

router
  .route("/:id")
  .get(getSubCategoryValidatorById, getSubCategoryById)
  .put(updateSubCategoryValidatorById, updateSubcategoryById)
  .delete(deleteSubCategoryValidatorById, deleteSubcategoryById);

module.exports = router;
