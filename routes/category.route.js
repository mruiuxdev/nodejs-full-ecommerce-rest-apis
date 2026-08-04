const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/category.controller");
const {
  createCategoryValidator,
  getCategoryValidatorById,
  deleteCategoryValidatorById,
  updateCategoryValidatorById,
} = require("../utils/validators/category.validator");

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidatorById, getCategoryById)
  .put(updateCategoryValidatorById, updateCategoryById)
  .delete(deleteCategoryValidatorById, deleteCategoryById);

module.exports = router;
