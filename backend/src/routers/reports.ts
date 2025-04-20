// backend/routes/reports.ts
import { Router } from "express";
import {
    getTagStats,
    getVacationTagDetails,
    getPopularDestinations,
    getUserTagActivity,
    getMonthlyTagActivity,
    downloadTagStatsCsv
} from "../controllers/reports/controller";
import {
    vacationIdParamValidator,
    tagStatsQueryValidator,
    userActivityQueryValidator
} from "../controllers/reports/validator";
import enforceAuth from "../middlewares/enforce-auth";
import adminOnly from "../middlewares/admin-only";
import paramsValidation from "../middlewares/params-validation";
import validation from "../middlewares/validation";

const router = Router();

// All routes require admin authentication
router.use(enforceAuth);
router.use(adminOnly);

// Optional query validation can be added where needed
router.get("/vacation-followers.csv", downloadTagStatsCsv);
router.get("/tag-stats", getTagStats);
router.get("/vacation-tags/:id", paramsValidation(vacationIdParamValidator), getVacationTagDetails);
router.get("/popular-destinations", getPopularDestinations);
router.get("/user-activity", getUserTagActivity);
router.get("/monthly-activity", getMonthlyTagActivity);

export default router;
