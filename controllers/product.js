const { cloudinary } = require("../cloudinary");

const { categories } = require("../util/categories");
const Product = require("../models/product");
const Review = require("../models/review");
const User = require("../models/user");

const isDocumentExist = require("../middleware/error-handling/document-exists");

const productPerPage = 2;

// ------------------------------------------ PRODUCTS ------------------------------------------//
// GET Route for displaying Products index page (All Products will be shown )
// Controller => Extract all documents from Product Model and send it to with the response
exports.getIndex = async (req, res, next) => {
  const products = await Product.find().populate("author");
  res.render("products/index", {
    pageTitle: "index Page",
    products,
  });
};
// GET Route for Product add form page
// Controller => Render a form
exports.getProductForm = (req, res, next) => {
  res.render("products/add-product", {
    pageTitle: "Add new Product",
    categories,
  });
};
// POST Route for adding a Product
// Controller => Add a new Product document with the data extracted from the form
exports.postAddProduct = async (req, res, next) => {
  const product = new Product(req.body.product);
  product.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  product.views = 0;
  product.author = req.user;
  product.createdDate = new Date();
  await product.save();
  console.log("Added Successfully");

  res.redirect(`/product/${product._id}`);
};
// POST Route for displaying a single a Product
// Controller => Extract one document from Product Model and send it to with the response
exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId).populate("author");
  isDocumentExist(product);
  const reviews = await Review.find({ product: product }).populate("author");
  isDocumentExist(reviews);
  res.render("products/product-detail", {
    pageTitle: "Single Product",
    product,
    reviews,
  });
};
// GET Route for displaying an edit Product form
// Controller =>  Render a form Extract the Product ID from the params
//                and send the correct document using Mongoose findById
exports.getEditProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  isDocumentExist(product);
  res.render("products/edit-product", {
    pageTitle: "Edit Product",
    product,
    categories,
  });
};
// PUT Route for editing a Product
// Controller => Update one document using findByIdAndUpdate
exports.putEditProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  const product = await Product.findByIdAndUpdate(productId, req.body.product);
  isDocumentExist(product);
  product.images.push(...images);
  await product.save();
  console.log("Edit Successful");
  res.redirect(`/product/${productId}`);
};
// DELETE Route for deleting a Product
// Controller => Delete a Product using findByIdAndDelete, and delete the
//               Asset from Cloudinary using cloudinary.uploader.destroy
exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  isDocumentExist(product);
  for (let image of product.images) {
    await cloudinary.uploader.destroy(image.filename);
  }
  await Product.findByIdAndDelete(productId);
  console.log("Deleted Successfully");
  res.redirect("/");
};

// ------------------------------------------ REVIEWS ------------------------------------------//
// GET Route for adding a Review
// Controller => Add a new Review document with the data extracted from the form
exports.postAddReview = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  isDocumentExist(product);
  const review = new Review(req.body.review);
  review.author = req.user;
  review.product = productId;
  review.createdDate = new Date();
  product.reviews.push(review);
  await review.save();
  await product.save();
  console.log("Added Review Successful");
  res.redirect(`/product/${productId}`);
};
// POST Route for adding a review
// Controller => Extract one Review document with associated Data
exports.getReview = async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await Review.findById(reviewId).populate("product");
  isDocumentExist(review);
  res.render("reviews/review-detail", {
    pageTitle: "Single Product",
    review,
  });
};
// GET Route for displaying an edit Review form
// Controller => render edit form
exports.getEditReview = async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await Review.findById(reviewId).populate("product");
  isDocumentExist(review);
  res.render("reviews/edit-review", {
    pageTitle: "Edit review",
    review,
  });
};
// PUT Route for editing a Review
// Controller => Update one Review document using findByIdAndUpdate
exports.putEditReview = async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const productId = req.params.productId;
  const review = await Review.findByIdAndUpdate(reviewId, req.body.review);
  isDocumentExist(review);
  await review.save();
  console.log("Edit Review Successful");
  res.redirect(`/product/${productId}/review/${reviewId}`);
};
// DELETE Route for editing a Review
// Controller => Delete one Review document and update the parent Product
exports.deleteReview = async (req, res, next) => {
  const productId = req.params.productId;
  const reviewId = req.params.reviewId;
  const product = await Product.findByIdAndUpdate(productId, {
    $pull: { reviews: reviewId },
  });
  isDocumentExist(product);
  const review = await Review.findByIdAndDelete(reviewId);
  isDocumentExist(review);
  res.redirect(`/product/${productId}`);
};
