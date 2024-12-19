import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

// Route: /api/externalapi/photos/:id
router.get("/externalapi/photos/:id", UserController.getEnrichedPhoto);

export { router as userRoutes };
