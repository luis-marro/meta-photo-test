import axios from "axios";
import { Album } from "../../domain/entities"

export class InternalAlbumService {
    /**
   * Fetch an album by ID and return an Album entity.
   */
  async getAlbumById(albumId: number): Promise<Album> {
    const response = await axios.get(`${process.env.INTERNAL_API_BASE_URL}/albums/${albumId}`)
    const data = response.data

    return new Album(data.id, data.title, data.userId)
  }
}
