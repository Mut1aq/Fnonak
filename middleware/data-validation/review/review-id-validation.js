const ExpressError = require("../../error-handling/ExpressError");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports = (req, res, next) => {
  const reviewId = req.params.reviewId;
  if (!ObjectID.isValid(reviewId)) {
    console.log(reviewId);
    throw new ExpressError("Invalid Review Id", 400);
  } else {
    next();
  }
};
