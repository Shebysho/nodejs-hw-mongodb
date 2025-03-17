const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid("home", "work", "personal").required(),
});

module.exports = { contactSchema };
