import express from "express";
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/authController.js";
import { protectedMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// api/v1/auth/register
router.post("/register", registerUser);

// api/v1/auth/login
router.post("/login", loginUser);

// api/v1/auth/logout
router.get("/logout", protectedMiddleware, logoutUser);

// api/v1/auth/get-user
router.get("/get-user", protectedMiddleware, getCurrentUser);

export default router;
