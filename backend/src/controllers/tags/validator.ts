import Joi from "joi";

export const vacationIdParamValidator = Joi.object({
    id: Joi.string().uuid().required()
});