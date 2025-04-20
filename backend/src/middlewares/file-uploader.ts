// backend/middlewares/file-uploader.ts
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import config from 'config';

// Extend Express Request type to include imageFileName
declare global {
    namespace Express {
        interface Request {
            imageFileName?: string;
        }
    }
}

export default async function fileUploader(req: Request, res: Response, next: NextFunction) {
    if (!req.files || !req.files.image) {
        return next();
    }

    const image = req.files.image as UploadedFile;
    const fileExt = path.extname(image.name);
    const fileName = `${uuidv4()}${fileExt}`;

    // Store locally for this implementation
    const uploadsDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    await image.mv(path.join(uploadsDir, fileName));

    req.imageFileName = fileName;
    next();
}