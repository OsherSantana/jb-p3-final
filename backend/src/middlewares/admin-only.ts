import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "../errors/app-error";

export default function adminOnly(req: Request, res: Response, next: NextFunction) {
    if (req.userRole !== 'admin') {
        return next(new AppError(StatusCodes.FORBIDDEN, 'Access denied: Admin rights required'));
    }
    next();
}
