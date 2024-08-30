import express from "express";
import {
    AllOrder,
    CreateOrder,
    CurrentUserOrder,
    DetailsOrder,
} from "../controllers/orderController.js";
import {
    adminMiddleware,
    protectedMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// post /api/v1/order
// diakses user auth
router.post("/", protectedMiddleware, CreateOrder);

// get /api/v1/order
// diakses admin
router.get("/", protectedMiddleware, adminMiddleware, AllOrder);

// get /api/v1/order/:id
// diakses admin
router.get("/:id", protectedMiddleware, adminMiddleware, DetailsOrder);

// get /api/v1/order/current/user
// diakses user auth
router.get("/current/user", protectedMiddleware, CurrentUserOrder);

export default router;
