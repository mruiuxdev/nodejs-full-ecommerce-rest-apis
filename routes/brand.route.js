const express = require("express");
const {
  createBrandValidator,
  getBrandValidatorById,
  deleteBrandValidatorById,
  updateBrandValidatorById
} = require("../utils/validators/brand.validator");
const {
  getBrands,
  createBrand,
  getBrandById,
  updateBrandById,
  deleteBrandById
} = require("../controllers/brand.controller");

const router = express.Router();

router.route("/").get(getBrands).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidatorById, getBrandById)
  .put(updateBrandValidatorById, updateBrandById)
  .delete(deleteBrandValidatorById, deleteBrandById);

module.exports = router;
