import axios from "axios";
import { Photo } from "../../domain/entities"

export class InternalPhotoService {
    /**
   * Fetch a photo by ID and return a Photo entity.
   */
  async getPhotoById(photoId: number): Promise<Photo> {
    const response = await axios.get(`${process.env.INTERNAL_API_BASE_URL}/photos/${photoId}`)
    const data = response.data

    return new Photo(data.id, data.title, data.url, data.thumbnailUrl, data.albumId)
  }
}
