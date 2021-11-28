const express = require("express");

// Middleware
const productValidation = require("../middleware/data-validation/product/product-validation");
const productValidId = require("../middleware/data-validation/product/product-id-validation");
const reviewValidId = require("../middleware/data-validation/review/review-id-validation");
const reviewValidation = require("../middleware/data-validation/review/review-validation");
const auth = require("../middleware/authentication/is-logged-in");
const catchAsync = require("../middleware/error-handling/catchAsync");

const productController = require("../controllers/product");

const router = express.Router();

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// ------------------------------------------ PRODUCTS ------------------------------------------//
// GET Route for displaying Products index page (All Products will be shown )
router.get("/", catchAsync(productController.getIndex)); // ! REST
// POST Route for adding a Product
router.post(
  "/product",
  // auth.isLoggedIn,
  upload.array("images"),
  productValidation.postValidateProduct,
  catchAsync(productController.postAddProduct)
); // ! REST
// POST Route for displaying a single a Product
router.get(
  "/product/:productId",
  // auth.isLoggedIn,
  productValidId,
  catchAsync(productController.getProduct)
); // ! REST
// PUT Route for editing a Product
router.put(
  "/product/:productId",
  // auth.isLoggedIn,
  productValidId,
  upload.array("images"),
  productValidation.putValidateProduct,
  catchAsync(productController.putEditProduct)
); // ! REST
// DELETE Route for deleting a Product
router.delete(
  "/product/:productId",
  // auth.isLoggedIn,
  productValidId,
  catchAsync(productController.deleteProduct)
); // ! REST
// ------------------------------------------ REVIEWS ------------------------------------------//
// GET Route for adding a Review
router.post(
  "/product/:productId/review",
  // auth.isLoggedIn,
  productValidId,
  reviewValidation.postValidateReview,
  catchAsync(productController.postAddReview)
); // ! REST
// POST Route for displaying a review
router.get(
  "/product/:productId/review/:reviewId",
  productValidId,
  catchAsync(productController.getReview)
); // ! REST
// PUT Route for editing a Review
router.put(
  "/product/:productId/review/:reviewId",
  // auth.isLoggedIn,
  productValidId,
  reviewValidId,
  reviewValidation.putValidateReview,
  catchAsync(productController.putEditReview)
); // ! REST
// DELETE Route for editing a Review
router.delete(
  "/product/:productId/review/:reviewId",
  // auth.isLoggedIn,
  productValidId,
  reviewValidId,
  catchAsync(productController.deleteReview)
); // ! REST

module.exports = router;
