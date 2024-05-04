import {Router} from "express";
import {cityController, tagController, userController} from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = new Router();

router.get("/cities", cityController.getAllCities);
router.get("/regions", cityController.getAllRegions);
router.get("/regions/:region", cityController.getCitiesByRegion);

router.get("/tags", tagController.getAllTags);
router.get("/tags/:id", tagController.getTagById);
router.post("/tags", tagController.createTag);

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/logout", authMiddleware, userController.logout);
router.get("/users", authMiddleware, userController.getAllUsers);
router.get("/users/:id", authMiddleware, userController.getUserById);
router.get("/users/email/:email", authMiddleware, userController.getUserByEmail);
// router.post("/users", userController.createUser);
router.put("/users/:id", authMiddleware, userController.updateUser);
router.delete("/users/:id", authMiddleware, userController.deleteUser);

export default router;
