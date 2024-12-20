import { Router } from "express"
import { ExternalController } from "../controllers"

const externalRoutes = Router()

// Route: /api/externalapi/photos/:id
externalRoutes.get("/externalapi/photos/:id", ExternalController.getEnrichedPhoto)
externalRoutes.get("/externalapi/photos", ExternalController.getEnrichedFromFilters)

export { externalRoutes }
