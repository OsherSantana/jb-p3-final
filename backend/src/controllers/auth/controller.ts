// backend/controllers/auth/controller.ts
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import config from 'config';
import { StatusCodes } from "http-status-codes";
import User from "../../models/user";
import AppError from "../../errors/app-error";

// Hash passwords with bcryptjs to match the sample data
async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export async function login(
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response,
    next: NextFunction
) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return next(new AppError(StatusCodes.UNAUTHORIZED, 'Invalid email or password'));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(new AppError(StatusCodes.UNAUTHORIZED, 'Invalid email or password'));
        }

        const userData = user.get({ plain: true });
        delete userData.password;

        const jwt = sign(userData, config.get<string>('app.jwtSecret'));
        res.json({ jwt, user: userData });
    } catch (e) {
        next(e);
    }
}

export async function signup(
    req: Request<{}, {}, { firstName: string; lastName: string; email: string; password: string }>,
    res: Response,
    next: NextFunction
) {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            firstName,
            lastName,
            email,
            role: 'user',
            password: hashedPassword
        });

        const userData = user.get({ plain: true });
        delete userData.password;

        const jwt = sign(userData, config.get<string>('app.jwtSecret'));
        res.status(StatusCodes.CREATED).json({ jwt, user: userData });
    } catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            return next(
                new AppError(
                    StatusCodes.CONFLICT,
                    `Email ${email} already exists. Please use a different email.`
                )
            );
        }
        next(e);
    }
}

export async function getProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;
        const user = await User.findByPk(userId);

        if (!user) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'User not found'));
        }

        const userData = user.get({ plain: true });
        delete userData.password;

        res.json(userData);
    } catch (e) {
        next(e);
    }
}
