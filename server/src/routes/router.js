import {Router} from "express";
import {
    cityController,
    fileController,
    housingController,
    tagController,
    userController
} from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import multer from "multer";
import housing from "../models/Housing.js";

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const router = new Router();

router.get("/cities", cityController.getAllCities);
router.get("/regions", cityController.getAllRegions);
router.get("/regions/:region", cityController.getCitiesByRegion);

router.get("/tags", tagController.getAllTags);
router.get("/tags/:id", tagController.getTagById);
router.post("/tags", tagController.createTag);

router.get("/housing", housingController.getHousing);
router.get("/housing/:id", housingController.getHousingById);
router.post("/housing", authMiddleware, housingController.createHousing);
router.put("/housing/:id", authMiddleware, housingController.updateHousing);
router.delete("/housing/:id", authMiddleware, housingController.deleteHousing);


router.post("/login", userController.login);
router.post("/register", userController.register);
router.get('/activate/:link', userController.activate);
router.post("/logout", authMiddleware, userController.logout);
router.post("/refresh", userController.refresh);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.get("/users/email/:email", userController.getUserByEmail);
// router.post("/users", userController.createUser);
router.put("/users/:id", authMiddleware, userController.updateUser);
router.delete("/users/:id", authMiddleware, userController.deleteUser);

router.post("/upload", authMiddleware, upload.single('image'), fileController.uploadFile);

export default router;
