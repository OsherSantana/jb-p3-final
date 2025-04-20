import { NextFunction, Request, Response } from "express";
import AppError from "../errors/app-error";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";
import config from 'config';
import User from "../models/user";

declare global {
    namespace Express {
        interface Request {
            userId: string;
            userRole?: 'user' | 'admin';
        }
    }
}

export default function enforceAuth(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return next(new AppError(StatusCodes.UNAUTHORIZED, 'Missing authorization header'));
    }

    const parts = authorizationHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return next(new AppError(StatusCodes.UNAUTHORIZED, 'Bad authorization header'));
    }

    try {
        const user = verify(parts[1], config.get<string>('app.jwtSecret')) as User;
        req.userId = user.id;
        req.userRole = user.role;
        next();
    } catch (e) {
        next(new AppError(StatusCodes.UNAUTHORIZED, 'Invalid JWT'));
    }
}