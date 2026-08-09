const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
} = require("../controllers/category.controller");
const {
  createCategoryValidator,
  getCategoryValidatorById,
  deleteCategoryValidatorById,
  updateCategoryValidatorById
} = require("../utils/validators/category.validator");
const subCategoriesRoute = require("./subCategory.route");

const router = express.Router();

//* Nested route setup
router.use("/:categoryId/subcategories", subCategoriesRoute);

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
