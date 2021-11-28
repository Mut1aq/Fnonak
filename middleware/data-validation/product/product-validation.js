const Joi = require("joi");
const ExpressError = require("../../error-handling/ExpressError");

exports.postValidateProduct = (req, res, next) => {
  const productSchema = Joi.object({
    product: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().min(0).required(),
      quantity: Joi.number().min(0).default(1).required(),
      category: Joi.string().required(),
      // subCategory: Joi.string().required(),
      views: Joi.number().min(0).default(0),
      isSoldOut: Joi.boolean().default(false),
    }).required(),
  });
  const { error } = productSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

exports.putValidateProduct = (req, res, next) => {
  const productSchema = Joi.object({
    product: Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      price: Joi.number().min(0),
      quantity: Joi.number().min(0).default(1),
      category: Joi.string(),
      // subCategory: Joi.string(),
      views: Joi.number().min(0).default(0),
      isSoldOut: Joi.boolean().default(false),
    }).required(),
  });
  const { error } = productSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};
