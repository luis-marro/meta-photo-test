import { Router } from "express"
import { EnrichedController } from "../controllers"

const enrichedRoutes = Router()

// Route: /api/enriched/photos/:id
enrichedRoutes.get("/enriched/photos/:id", EnrichedController.getEnrichedPhoto)

export { enrichedRoutes }
