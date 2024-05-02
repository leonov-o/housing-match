import {Router} from "express";
import {cityController, tagController, userController} from "../controllers/index.js";


const router = new Router();

router.get("/cities", cityController.getAllCities);
router.get("/regions", cityController.getAllRegions);
router.get("/regions/:region", cityController.getCitiesByRegion);

router.get("/tags", tagController.getAllTags);
router.get("/tags/:id", tagController.getTagById);
router.post("/tags", tagController.createTag);

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.get("/users/email/:email", userController.getUserByEmail);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;
