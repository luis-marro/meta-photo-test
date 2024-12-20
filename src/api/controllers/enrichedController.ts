import { Request, Response } from "express"
import { EnrichedPhotoService } from "../../application/services"

const enrichedPhotoService = new EnrichedPhotoService()

export class EnrichedController {
  static async getEnrichedPhoto(req: Request, res: Response): Promise<void> {
    try {
      const photoId = parseInt(req.params.id)

      if (isNaN(photoId)) {
        res.status(400).json({ error: "Invalid photo ID" })
        return
      }

      const result = await enrichedPhotoService.getEnrichedPhoto(photoId)
      res.json(result)
    } catch (error: any) {
      console.error("Error:", error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
