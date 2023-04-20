const Joi = require("joi");
const ERROR_MESSAGES = require("../constants/error_constants");
const authValidator = {
    signup: Joi.object().keys({
        email: Joi.string().regex(new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")).required().messages({
            'required': ERROR_MESSAGES.REQUIRED_FIELDS
        }),
        age: Joi.number().required().messages({
            'required': ERROR_MESSAGES.REQUIRED_FIELDS
        }),
        name: Joi.string().required().messages({
            'required': ERROR_MESSAGES.REQUIRED_FIELDS
        }),
        password: Joi.string().required().min(1).messages({
            'required': ERROR_MESSAGES.REQUIRED_FIELDS
        }),
    }).unknown(),

    login: Joi.object().keys({
        email: Joi.string().regex(new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")).required().messages({
            'required': ERROR_MESSAGES.REQUIRED_FIELDS,
            'string.pattern.base':"bad email"
        }),
        password: Joi.string().required().min(1).max(20).messages({
            'required': ERROR_MESSAGES.REQUIRED_FIELDS
        }),
    }).unknown(),

};

module.exports = authValidator;