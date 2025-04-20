import Joi from "joi";

export const vacationIdParamValidator = Joi.object({
    id: Joi.string().uuid().required()
});

export const createVacationValidator = Joi.object({
    destination: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(10).required(),
    startDate: Joi.date().greater('now').required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    price: Joi.number().positive().precision(2).required()
});

export const updateVacationValidator = Joi.object({
    destination: Joi.string().min(3).max(255).optional(),
    description: Joi.string().min(10).optional(),
    startDate: Joi.date().greater('now').optional(),
    endDate: Joi.date().greater(Joi.ref('startDate')).optional(),
    price: Joi.number().positive().precision(2).optional()
});

export const vacationFilesValidator = Joi.object({
    image: Joi.object({
        mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg', 'image/gif')
    }).unknown(true).required()
});

export const updateVacationFilesValidator = Joi.object({
    image: Joi.object({
        mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg', 'image/gif')
    }).unknown(true).optional()
});