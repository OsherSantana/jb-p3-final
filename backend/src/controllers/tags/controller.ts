import socket from "../../io/io";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Vacation from "../../models/vacation";
import VacationTag from "../../models/tag";
import User from "../../models/user";
import AppError from "../../errors/app-error";

// Get all vacations tagged by the current user
export async function getUserTags(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;

        const user = await User.findByPk(userId, {
            include: [{
                model: Vacation,
                as: 'taggedVacations',
                through: { attributes: [] } // Don't include join table
            }]
        });

        if (!user) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'User not found'));
        }

        res.json(user.taggedVacations);
    } catch (e) {
        next(e);
    }
}

// Tag a vacation
export async function tagVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;
        const { id: vacationId } = req.params;

        // Verify vacation exists
        const vacation = await Vacation.findByPk(vacationId);

        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }

        // Check if already tagged
        const existingTag = await VacationTag.findOne({
            where: {
                userId,
                vacationId
            }
        });

        if (existingTag) {
            return next(new AppError(StatusCodes.CONFLICT, 'Vacation already tagged'));
        }

        // Create new tag
        await VacationTag.create({
            userId,
            vacationId
        });

        // Get updated tag count for this vacation
        const tagCount = await VacationTag.count({
            where: { vacationId }
        });

        // Emit socket event for tagging
        socket.emit('vacationTagged', {
            vacationId,
            tagCount,
            userId
        });

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Vacation tagged successfully'
        });
    } catch (e) {
        next(e);
    }
}
// Untag a vacation
export async function untagVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;
        const { id: vacationId } = req.params;

        // Find and delete the tag
        const deleted = await VacationTag.destroy({
            where: {
                userId,
                vacationId
            }
        });

        if (deleted === 0) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation was not tagged'));
        }

        // Get updated tag count for this vacation
        const tagCount = await VacationTag.count({
            where: { vacationId }
        });

        // Emit socket event for untagging
        socket.emit('vacationUntagged', {
            vacationId,
            tagCount,
            userId
        });

        res.json({
            success: true,
            message: 'Vacation untagged successfully'
        });
    } catch (e) {
        next(e);
    }
}