const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");

const getProductValidatorById = [
  check("id").isMongoId().withMessage("Invalid product id"),
  validatorMiddleware
];

const updateProductValidatorById = [
  check("id").isMongoId().withMessage("Invalid product id"),
  validatorMiddleware
];

const deleteProductValidatorById = [
  check("id").isMongoId().withMessage("Invalid product id"),
  validatorMiddleware
];

const createProductValidator = [
  check("name")
    .notEmpty()
    .withMessage("Product name required")
    .isLength({ min: 3 })
    .withMessage("Too short product name")
    .isLength({ max: 100 })
    .withMessage("Too long product name"),
  check("description")
    .notEmpty()
    .withMessage("Product description required")
    .isLength({ min: 20 })
    .withMessage("Too short product description")
    .isLength({ max: 2000 })
    .withMessage("Too long product description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product solid must be number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be number")
    .isLength({ max: 32 })
    .withMessage("Too long price"),
  check("priceAfterDiscount")
    .optional()
    .isFloat()
    .isNumeric()
    .withMessage("Product price after discount must be number")
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("Price after discount lower than original price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Product colors should be array of string"),
  check("imageCover").notEmpty().withMessage("Product image cover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Product colors should be array of string"),
  check("category")
    .notEmpty()
    .withMessage("Category id is required")
    .isMongoId()
    .withMessage("Category id is invalid"),
  check("subCategory")
    .optional()
    .isMongoId()
    .withMessage("Subcategory id is invalid"),
  check("brand").optional().isMongoId().withMessage("Brand id is invalid"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Ratings average must be number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1")
    .isLength({ max: 5 })
    .withMessage("Rating must be above or equal 5"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Ratings quantity must be number"),
  validatorMiddleware
];

module.exports = {
  createProductValidator,
  getProductValidatorById,
  updateProductValidatorById,
  deleteProductValidatorById
};
