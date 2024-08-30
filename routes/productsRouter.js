import express from "express";
import {
    AllProducts,
    CreateProducts,
    DeleteProducts,
    DetailsProducts,
    UpdateProducts,
    UploadFile,
} from "../controllers/productsController.js";
import {
    adminMiddleware,
    protectedMiddleware,
} from "../middleware/authMiddleware.js";
import { upload } from "../utils/uploadFileHandler.js";

// CRUD Product

const router = express.Router();

// middleware owner
// post api/v1/products
// Create Data Products
router.post("/", protectedMiddleware, adminMiddleware, CreateProducts);

// Read Data Products
// get api/v1/products
router.get("/", AllProducts);

// Details Data Products
// get api/v1/products
router.get("/:id", DetailsProducts);

// Update Data Products
// put api/v1/products
router.put("/:id", protectedMiddleware, adminMiddleware, UpdateProducts);

// Delete Data Products
// delete api/v1/products
router.delete("/:id", protectedMiddleware, adminMiddleware, DeleteProducts);

// Upload Data Products
// post api/v1/products
router.post(
    "/file-upload",
    protectedMiddleware,
    adminMiddleware,
    upload.single("image"),
    UploadFile
);

export default router;
