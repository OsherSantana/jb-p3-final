// backend/app.ts
import express, { json } from "express";
import config from 'config';
import cors from 'cors';
import fileUpload from "express-fileupload";
import path from "path";
import sequelize from "./db/sequelize";
import authRouter from "./routers/auth";
import vacationsRouter from "./routers/vacations";
import tagsRouter from "./routers/tags";
import reportsRouter from "./routers/reports";
import errorLogger from "./middlewares/error/error-logger";
import errorResponder from "./middlewares/error/error-responder";
import notFound from "./middlewares/not-found";
import usersRouter from "./routers/users";


const port = config.get<string>('app.port');
const name = config.get<string>('app.name');
const force = config.get<boolean>('sequelize.sync.force');

const app = express();

(async () => {
    try {
        await sequelize.sync({ force });
        console.log("Database connected successfully");

        // Middlewares
        app.use(cors()); // Allow any client to use this server
        app.use(json()); // Parse JSON request bodies
        app.use(fileUpload()); // Handle file uploads

        // Serve static files from uploads directory
        app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

        // API Routes
        app.use("/users", usersRouter);
        app.use('/auth', authRouter);
        app.use('/vacations', vacationsRouter);
        app.use('/tags', tagsRouter);
        app.use('/reports', reportsRouter);


        // Serve frontend in production
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, '../frontend')));

            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
            });
        }

        // Error handling
        app.use(notFound);
        app.use(errorLogger);
        app.use(errorResponder);

        app.listen(port, () => {
            console.log(`${name} server started on port ${port}...`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
})();

