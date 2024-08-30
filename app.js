import express from "express";
import authRouter from "./routes/authRouter.js";
import productsRouter from "./routes/productsRouter.js";
import orderRouter from "./routes/orderRouter.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { v2 as cloudinary } from "cloudinary";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// app
dotenv.config();
const app = express();
const port = 3000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

// server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/order", orderRouter);

// error handler
app.use(notFound);
app.use(errorHandler);

// mongodb connection
const connection = mongoose.connect(process.env.MONGODB_URL);
const connected = async () => {
    try {
        await connection;
        console.log("MongoDB connected");
    } catch (err) {
        console.log(err);
    }
};
connected();
