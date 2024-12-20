import { InternalAlbumService } from "./internalAlbumService"
import { InternalUserService } from "./internalUserService"
import { InternalPhotoService } from "./internalPhotoService"


export class EnrichedPhotoService {
  photoService = new InternalPhotoService()
  albumService = new InternalAlbumService()
  userService = new InternalUserService()

    /**
   * Fetch photo, album, and user details in a single enriched response.
   */
  async getEnrichedPhoto(photoId: number): Promise<any> {
    const photo = await this.photoService.getPhotoById(photoId)
    const album = await this.albumService.getAlbumById(photo.albumId)
    const user = await this.userService.getUserById(album.userId)

    return {
      photo: {
        id: photo.id,
        title: photo.title,
        url: photo.url,
        thumbnailUrl: photo.thumbnailUrl,
      },
      album: {
        id: album.id,
        title: album.title,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          address: user.address,
          phone: user.phone,
          website: user.website,
          company: user.company,
        }
      }
    }
  }
}