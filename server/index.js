import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './src/routes/router.js';
import cookieParser from "cookie-parser";



const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

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
