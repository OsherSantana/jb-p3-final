import Joi from "joi";

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(40).required()
});

export const signupValidator = Joi.object({
    firstName: Joi.string().min(2).max(40).required(),
    lastName: Joi.string().min(2).max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(40).required()
});