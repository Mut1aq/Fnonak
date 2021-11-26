const express = require("express");

// Middleware
const validateProduct = require("../middleware/data-validation/product/product-validation");
const productValidId = require("../middleware/data-validation/product/product-id-validation");
const reviewValidId = require("../middleware/data-validation/review/review-id-validation");
const validateReview = require("../middleware/data-validation/review/review-validation");
const auth = require("../middleware/authentication/is-logged-in");
const catchAsync = require("../middleware/error-handling/catchAsync");

const productController = require("../controllers/product");

const router = express.Router();

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// ------------------------------------------ PRODUCTS ------------------------------------------//
// GET Route for displaying Products index page (All Products will be shown )
router.get("/", catchAsync(productController.getIndex));
// GET Route for Product add form page
router.get("/product/new", auth.isLoggedIn, productController.getProductForm);
// POST Route for adding a Product
router.post(
  "/product",
  auth.isLoggedIn,
  upload.array("images"),
  validateProduct,
  catchAsync(productController.postAddProduct)
);
// POST Route for displaying a single a Product
router.get(
  "/product/:productId",
  auth.isLoggedIn,
  productValidId,
  // productExists,
  catchAsync(productController.getProduct)
);
// GET Route for displaying an edit Product form
router.get(
  "/product/:productId/edit",
  auth.isLoggedIn,
  productValidId,
  // productExists,
  catchAsync(productController.getEditProduct)
);
// PUT Route for editing a Product
router.put(
  "/product/:productId",
  auth.isLoggedIn,
  productValidId,
  // productExists,
  upload.array("images"),
  validateProduct,
  catchAsync(productController.putEditProduct)
);
// DELETE Route for deleting a Product
router.delete(
  "/product/:productId",
  auth.isLoggedIn,
  productValidId,
  // productExists,
  catchAsync(productController.deleteProduct)
);
// ------------------------------------------ REVIEWS ------------------------------------------//
// GET Route for adding a Review
router.post(
  "/product/:productId/review",
  auth.isLoggedIn,
  productValidId,
  validateReview,
  catchAsync(productController.postAddReview)
);
// POST Route for displaying a review
router.get(
  "/product/:productId/review/:reviewId",
  productValidId,
  reviewValidId,
  // reviewExists,
  catchAsync(productController.getReview)
);
// GET Route for displaying an edit Review form
router.get(
  "/product/:productId/review/:reviewId/edit",
  auth.isLoggedIn,
  productValidId,
  reviewValidId,
  // reviewExists,
  catchAsync(productController.getEditReview)
);
// PUT Route for editing a Review
router.put(
  "/product/:productId/review/:reviewId",
  auth.isLoggedIn,
  productValidId,
  reviewValidId,
  // reviewExists,
  validateReview,
  catchAsync(productController.putEditReview)
);
// DELETE Route for editing a Review
router.delete(
  "/product/:productId/review/:reviewId",
  auth.isLoggedIn,
  productValidId,
  // productExists,
  reviewValidId,
  // reviewExists,
  catchAsync(productController.deleteReview)
);

module.exports = router;
