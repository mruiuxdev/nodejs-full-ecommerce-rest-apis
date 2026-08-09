const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");

const getBrandValidatorById = [
  check("id").isMongoId().withMessage("Invalid brand id"),
  validatorMiddleware
];

const updateBrandValidatorById = [
  check("id").isMongoId().withMessage("Invalid brand id"),
  check("name")
    .notEmpty()
    .withMessage("Brand")
    .isLength({ min: 3 })
    .withMessage("Too short brand name")
    .isLength({ max: 30 })
    .withMessage("Too long brand name"),
  validatorMiddleware
];

const deleteBrandValidatorById = [
  check("id").isMongoId().withMessage("Invalid brand id"),
  validatorMiddleware
];

const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand required")
    .isLength({ min: 3 })
    .withMessage("Too short brand name")
    .isLength({ max: 30 })
    .withMessage("Too long brand name"),
  validatorMiddleware
];

module.exports = {
  createBrandValidator,
  getBrandValidatorById,
  updateBrandValidatorById,
  deleteBrandValidatorById
};
