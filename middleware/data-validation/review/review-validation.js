const Joi = require("joi");
const ExpressError = require("../../error-handling/ExpressError");

exports.postValidateReview = (req, res, next) => {
  const reviewSchema = Joi.object({
    review: Joi.object({
      rating: Joi.number().min(1).max(5).default(5).required(),
      body: Joi.string().required(),
    }).required(),
  });
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

exports.putValidateReview = (req, res, next) => {
  const reviewSchema = Joi.object({
    review: Joi.object({
      rating: Joi.number().min(1).max(5).default(5),
      body: Joi.string(),
    }).required(),
  });
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};
