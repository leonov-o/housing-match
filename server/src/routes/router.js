import {Router} from "express";
import {cityController} from "../controllers/index.js";


const router = new Router();

router.get("/cities", cityController.getAll);

export default router;
