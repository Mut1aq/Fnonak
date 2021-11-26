const ExpressError = require("../../error-handling/ExpressError");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports = (req, res, next) => {
  const productId = req.params.productId;
  if (!ObjectID.isValid(productId)) {
    throw new ExpressError("Invalid Product Id", 400);
  } else {
    next();
  }
};
