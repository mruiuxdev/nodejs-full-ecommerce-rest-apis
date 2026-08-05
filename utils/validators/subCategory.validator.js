const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");

const getSubCategoryValidatorById = [
  check("id").isMongoId().withMessage("Invalid subcategory id"),
  validatorMiddleware
];

const updateSubCategoryValidatorById = [
  check("id").isMongoId().withMessage("Invalid subcategory id"),
  check("name")
    .notEmpty()
    .withMessage("Subcategory required")
    .isLength({ min: 2 })
    .withMessage("Too short subcategory name")
    .isLength({ max: 30 })
    .withMessage("Too long subcategory name"),
  check("category")
    .notEmpty()
    .withMessage("Subcategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid category id"),
  validatorMiddleware
];

const deleteSubCategoryValidatorById = [
  check("id").isMongoId().withMessage("Invalid subcategory id"),
  validatorMiddleware
];

const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short subcategory name")
    .isLength({ max: 30 })
    .withMessage("Too long subcategory name"),
  check("category")
    .notEmpty()
    .withMessage("Subcategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid category id"),
  validatorMiddleware
];

module.exports = {
  createSubCategoryValidator,
  getSubCategoryValidatorById,
  updateSubCategoryValidatorById,
  deleteSubCategoryValidatorById
};
