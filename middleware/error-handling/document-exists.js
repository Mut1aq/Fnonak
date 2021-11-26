const ExpressError = require("./ExpressError");

module.exports = (document) => {
  if (!document) {
    throw new ExpressError("Document Not Found", 404);
  }
};
