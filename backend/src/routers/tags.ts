import { Router } from "express";
import {
    getUserTags,
    tagVacation,
    untagVacation
} from "../controllers/tags/controller";
import { vacationIdParamValidator } from "../controllers/tags/validator";
import enforceAuth from "../middlewares/enforce-auth";
import paramsValidation from "../middlewares/params-validation";

const router = Router();

// All routes require authentication
router.use(enforceAuth);

router.get('/', getUserTags);
router.post('/tag/:id', paramsValidation(vacationIdParamValidator), tagVacation);
router.delete('/untag/:id', paramsValidation(vacationIdParamValidator), untagVacation);

export default router;