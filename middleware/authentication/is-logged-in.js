exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you must be logged in");
    return res.redirect("/login");
  } else {
    next();
  }
};
exports.isLoggedOut = (req, res, next) => {
  if (req.user) {
    return res.redirect(
      req.originalUrl === "/login" || "/signup" ? "/" : req.originalUrl
    );
  } else {
    next();
  }
};
