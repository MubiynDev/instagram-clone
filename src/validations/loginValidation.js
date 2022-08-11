const Joi = require("joi");

module.exports = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required()
});