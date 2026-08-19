const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");
const slugify = require("slugify");

const getCategoryValidatorById = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware
];

const updateCategoryValidatorById = [
  check("id").isMongoId().withMessage("Invalid category id"),
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 30 })
    .withMessage("Too long category name"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);

    return true;
  }),
  validatorMiddleware
];

const deleteCategoryValidatorById = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware
];

const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 30 })
    .withMessage("Too long category name"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);

    return true;
  }),
  validatorMiddleware
];

module.exports = {
  createCategoryValidator,
  getCategoryValidatorById,
  updateCategoryValidatorById,
  deleteCategoryValidatorById
};
