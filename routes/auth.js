const express = require("express");
const passport = require("passport");

const router = express.Router();

const User = require("../models/user");
const authController = require("../controllers/auth");

const auth = require("../middleware/authentication/is-logged-in");
const validateUser = require("../middleware/data-validation/user/user-validation");

const catchAsync = require("../middleware/error-handling/catchAsync");

const multer = require("multer");
const { profileStorage } = require("../cloudinary");
const upload = multer({ profileStorage });

// GET Route to render Signup form
router.get("/signup", auth.isLoggedOut, authController.getSignup);
// Post Routes to register a new User
router.post(
  "/signup",
  auth.isLoggedOut,
  validateUser,
  catchAsync(authController.postSignup)
);
// GET Route to render Login form
router.get("/login", auth.isLoggedOut, authController.getLogin);
// Post Routes to log a User in
router.post(
  "/login",
  auth.isLoggedOut,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  authController.postLogin
);

router.get("/logout", auth.isLoggedIn, authController.getLogout);

module.exports = router;
