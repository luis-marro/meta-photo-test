import { Request, Response } from "express"
import { ExternalPhotoService } from "../../application/services"

const externalPhotoService = new ExternalPhotoService()

export class ExternalController {
  static async getEnrichedPhoto(req: Request, res: Response): Promise<void> {
    try {
      const photoId = parseInt(req.params.id)

      if (isNaN(photoId)) {
        res.status(400).json({ error: "Invalid photo ID" })
        return
      }

      const result = await externalPhotoService.getEnrichedPhotoById(photoId)
      res.json(result)
    } catch (error: any) {
      console.error("Error:", error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  static async getEnrichedFromFilters(req: Request, res: Response): Promise<void> {
    try {
      const {
            title,
            "album.title": albumTitle,
            "album.user.email": albumUserEmail,
            limit = "25",
            offset = "0"
         } = req.query;

      const enrichedPhotos = await externalPhotoService.getEnrichedPhotos()

      // Apply filters if query parameters are provided
      const filteredPhotos = enrichedPhotos.filter((photo) => {
        let matches = true

        if (title) {
          matches = matches && photo.title.includes(title as string)
        }

        if (albumTitle) {
          matches = matches && photo.album.title.includes(albumTitle as string)
        }

        if (albumUserEmail) {
          matches = matches && photo.album.user.email === albumUserEmail
        }

        return matches
      })

      const parsedLimit = Math.max(1, parseInt(limit as string, 10) || 25); // Default to 25
      const parsedOffset = Math.max(0, parseInt(offset as string, 10) || 0); // Default to 0

      const paginatedPhotos = filteredPhotos.slice(parsedOffset, parsedOffset + parsedLimit);


      res.json(paginatedPhotos)
    } catch (error: any) {
      console.error("Error:", error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
