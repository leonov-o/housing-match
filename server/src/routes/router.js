import {Router} from "express";
import {cityController, tagController} from "../controllers/index.js";


const router = new Router();

router.get("/cities", cityController.getAllCities);
router.get("/regions", cityController.getAllRegions);
router.get("/regions/:region", cityController.getCitiesByRegion);

router.get("/tags", tagController.getAllTags);
router.get("/tags/:id", tagController.getTagById);
router.post("/tags", tagController.createTag);

export default router;
