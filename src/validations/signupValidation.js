const Joi = require("joi");

module.exports = Joi.object({
    phone: Joi.number().min(998330000000).max(998999999999).required(),
    fullName: Joi.string().trim().required(),
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required()
});