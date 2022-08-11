const Joi = require("joi");

module.exports = Joi.object({
    username: Joi.string().trim(),
    fullName: Joi.string().trim(),
    bio: Joi.string().trim().max(100),
});