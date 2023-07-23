// src/routes/userRoutes.ts
import { Router } from "express";
import { registerUser, login } from "../controllers/userController";

const router = Router();

// Route for user registration (sign up)
router.post("/register", registerUser);

// Route for user login
router.post("/login", login);

export default router;
