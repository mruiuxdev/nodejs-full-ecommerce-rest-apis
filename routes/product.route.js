const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById
} = require("../controllers/product.controller");
const {
  getProductValidatorById,
  updateProductValidatorById,
  deleteProductValidatorById,
  createProductValidator
} = require("../utils/validators/product.validator");

const router = express.Router();

router.route("/").get(getProducts).post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidatorById, getProductById)
  .put(updateProductValidatorById, updateProductById)
  .delete(deleteProductValidatorById, deleteProductById);

module.exports = router;
