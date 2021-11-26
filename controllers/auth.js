const User = require("../models/user");
const { countries } = require("../util/countries");

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", { pageTitle: "Signup", countries });
};

exports.postSignup = async (req, res, next) => {
  try {
    delete req.body.user["confirmPassword"];
    const password = req.body.user.password;
    const user = new User(req.body.user);
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Register successful");
      res.redirect("/");
    });
  } catch (error) {
    req.flash("error", error.message);
    return res.redirect("/signup");
  }
};

exports.getLogin = (req, res, next) => {
  res.render("auth/login", { pageTitle: "Login" });
};

exports.postLogin = (req, res, next) => {
  req.flash("success", "login successful");
  const redirectUrl = req.session.returnTo || "/";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

exports.getLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
