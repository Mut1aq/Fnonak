const ExpressError = require("../../error-handling/ExpressError");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports = (req, res, next) => {
  const userId = req.params.userId;
  if (!ObjectID.isValid(userId)) {
    console.log(userId);
    throw new ExpressError("Invalid user Id", 400);
  } else {
    next();
  }
};
