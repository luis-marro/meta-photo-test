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
      const { title, "album.title": albumTitle, "album.user.email": albumUserEmail } = req.query;

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

      res.json(filteredPhotos)
    } catch (error: any) {
      console.error("Error:", error.message)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
