const Joi = require("joi");
const ExpressError = require("../../error-handling/ExpressError");

module.exports = (req, res, next) => {
  const userSchema = Joi.object({
    user: Joi.object({
      username: Joi.string().min(3).max(30).required().label("Username"),
      password: Joi.string().min(10).max(30).required().label("Password"),
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .label("Passwords")
        .messages({
          "confirmPassword.valid": "Passwords don't match",
          "confirmPassword.ref": "Passwords don't match",
        }),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "jo"] },
        })
        .required()
        .label("E-Mail"),
      firstName: Joi.string().min(3).max(30).required().label("First Name"),
      lastName: Joi.string().min(3).max(30).required().label("Last Name"),
      phoneNumber: Joi.number().integer().required().label("Phone Number"),
      country: Joi.string().min(2).max(57).required().label("Country"),
      dateOfBirth: Joi.date()
        .iso()
        .less("2003-01-01")
        .greater("1960-01-01")
        .required()
        .label("Date Of Birth")
        .messages({
          "date.less": "You must be 18 or older",
          "date.greater": "You must be 18 or older",
          "date.iso": "Invalid Date",
        }),
    }).required(),
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    const newMessage = message
      .slice(message.indexOf(".") + 1, message.length)
      .replace(/["]+/g, "");
    throw new ExpressError(newMessage, 400);
  } else {
    next();
  }
};
