import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './src/routes/router.js';
import cookieParser from "cookie-parser";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import {requestLogger} from "./src/middlewares/requestLogger.js";

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger)
app.use("/api", router);
app.use(errorMiddleware);

async function startApp() {
    try {
        await mongoose.connect(process.env.DB_URI);
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}


startApp();
