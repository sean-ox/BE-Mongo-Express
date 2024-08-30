import users from "../model/userModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

export const protectedMiddleware = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await users.findById(decode.id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("not Authorized, token fail");
        }
    } else {
        res.status(401);
        throw new Error("not Authorized, not token");
    }
});

export const adminMiddleware = async (req, res, next) => {
    if (req.user && req.user.role === "owner") {
        next();
    } else {
        res.status(404);
        throw new Error("Not Authorized as Owner");
    }
};
