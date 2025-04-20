import { Router } from "express";
import {
    getAllVacations,
    getVacationById,
    createVacation,
    updateVacation,
    deleteVacation
} from "../controllers/vacations/controller";
import {
    vacationIdParamValidator,
    createVacationValidator,
    updateVacationValidator,
    vacationFilesValidator,
    updateVacationFilesValidator
} from "../controllers/vacations/validator";
import enforceAuth from "../middlewares/enforce-auth";
import adminOnly from "../middlewares/admin-only";
import validation from "../middlewares/validation";
import paramsValidation from "../middlewares/params-validation";
import filesValidation from "../middlewares/files-validation";
import fileUploader from "../middlewares/file-uploader";

const router = Router();

// Public routes
router.get('/', getAllVacations);
router.get('/:id', paramsValidation(vacationIdParamValidator), getVacationById);

// Admin-only routes
router.post(
    '/',
    enforceAuth,
    adminOnly,
    validation(createVacationValidator),
    filesValidation(vacationFilesValidator),
    fileUploader,
    createVacation
);

router.put(
    '/:id',
    enforceAuth,
    adminOnly,
    paramsValidation(vacationIdParamValidator),
    validation(updateVacationValidator),
    filesValidation(updateVacationFilesValidator),
    fileUploader,
    updateVacation
);

router.delete(
    '/:id',
    enforceAuth,
    adminOnly,
    paramsValidation(vacationIdParamValidator),
    deleteVacation
);

export default router;