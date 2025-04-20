import { Router } from "express";
import validation from "../middlewares/validation";
import { loginValidator, signupValidator } from "../controllers/auth/validator";
import { login, signup, getProfile } from "../controllers/auth/controller";
import enforceAuth from "../middlewares/enforce-auth";

const router = Router();

// Public routes
// Add this at the top of your auth.ts router file
router.get('/debug', (req, res) => {
    res.json({ message: 'Auth router is working properly' });
});
router.post('/login', validation(loginValidator), login);
router.post('/signup', validation(signupValidator), signup);

// Protected routes
router.get('/profile', enforceAuth, getProfile);

export default router;
