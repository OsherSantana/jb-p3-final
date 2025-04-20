import Vacation from "../../models/vacation";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Op, literal } from "sequelize";
import User from "../../models/user";
import AppError from "../../errors/app-error";
import sequelize from "../../db/sequelize";
import { Literal } from "sequelize/types/utils";

// Utility: Include tag count per vacation
function getVacationIncludesWithTagCount() {
    return {
        include: [
            {
                model: User,
                as: "taggedByUsers",
                attributes: ["id"],
                through: { attributes: [] }
            }
        ],
        attributes: {
            include: [
                [
                    literal(
                        "(SELECT COUNT(*) FROM vacation_tags WHERE vacation_tags.vacation_id = Vacation.id)"
                    ),
                    "tagCount"
                ] as [string | Literal, string]
            ]
        }
    };
}

export async function getAllVacations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const {
            minPrice,
            maxPrice,
            startDate,
            endDate,
            destination,
            followedOnly,
            activeOnly,
            upcomingOnly,
            page = "1"
        } = req.query;

        const where: any = {};
        const now = new Date();

        if (minPrice) where.price = { [Op.gte]: +minPrice };
        if (maxPrice) where.price = { ...(where.price || {}), [Op.lte]: +maxPrice };
        if (startDate) where.startDate = { [Op.gte]: new Date(startDate as string) };
        if (endDate) where.endDate = { ...(where.endDate || {}), [Op.lte]: new Date(endDate as string) };
        if (destination) where.destination = { [Op.like]: `%${destination}%` };

        if (activeOnly === "true") {
            where.startDate = { [Op.lte]: now };
            where.endDate = { [Op.gte]: now };
        }

        if (upcomingOnly === "true") {
            where.startDate = { [Op.gt]: now };
        }

        const pageNumber = parseInt(page as string);
        const pageSize = 10;
        const offset = (pageNumber - 1) * pageSize;

        if (followedOnly === "true" && (req as any).userId) {
            const user = await User.findByPk((req as any).userId, {

                include: ["followedVacations"]
            });

            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const followedIds = (user as any).followedVacations.map((v: any) => v.id);
            where.id = { [Op.in]: followedIds };
        }

        const vacations = await Vacation.findAll({
            where,
            ...getVacationIncludesWithTagCount(),
            limit: pageSize,
            offset,
            subQuery: false,
            order: [["startDate", "ASC"]]
        });
        res.json(vacations);
        return;
    } catch (e) {
        next(e);
    }
}

// TODO: Re-implement these (or paste your existing implementations below)

export async function getVacationById(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id = req.params.id;
        const vacation = await Vacation.findByPk(id, getVacationIncludesWithTagCount());

        if (!vacation) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Vacation not found" });
        }

        res.json(vacation);
    } catch (e) {
        next(e);
    }
}

export async function createVacation(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const { destination, description, startDate, endDate, price } = req.body;

        if (!req.imageFileName) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Image is required" });
        }

        const vacation = await Vacation.create({
            destination,
            description,
            startDate,
            endDate,
            price,
            imageFileName: req.imageFileName
        });

        res.status(StatusCodes.CREATED).json(vacation);
    } catch (e) {
        next(e);
    }
}

export async function updateVacation(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id = req.params.id;
        const vacation = await Vacation.findByPk(id);

        if (!vacation) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Vacation not found" });
        }

        const { destination, description, startDate, endDate, price } = req.body;
        const updatedData: any = {
            destination,
            description,
            startDate,
            endDate,
            price
        };

        if (req.imageFileName) {
            updatedData.imageFileName = req.imageFileName;
        }

        await vacation.update(updatedData);
        res.json(vacation);
    } catch (e) {
        next(e);
    }
}

export async function deleteVacation(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id = req.params.id;
        const vacation = await Vacation.findByPk(id);

        if (!vacation) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Vacation not found" });
        }

        await vacation.destroy();
        res.json({ message: "Vacation deleted successfully" });
    } catch (e) {
        next(e);
    }
}
