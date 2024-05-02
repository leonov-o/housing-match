import {Router} from "express";
import {cityController} from "../controllers/index.js";


const router = new Router();

router.get("/cities", cityController.getAllCities);
router.get("/regions", cityController.getAllRegions);
router.get("/regions/:region", cityController.getCitiesByRegion);

export default router;
