// backend/controllers/reports/validator.ts
import Joi from "joi";

export const vacationIdParamValidator = Joi.object({
    id: Joi.string().uuid().required()
});

// Optional validator for filtering tag stats
export const tagStatsQueryValidator = Joi.object({
    startDate: Joi.date().iso().optional(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')).optional(),
    limit: Joi.number().integer().min(1).max(100).optional()
});

// Optional validator for filtering user activity
export const userActivityQueryValidator = Joi.object({
    limit: Joi.number().integer().min(1).max(100).optional(),
    page: Joi.number().integer().min(1).optional()
});