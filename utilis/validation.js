const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(4).max(25).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema
};
