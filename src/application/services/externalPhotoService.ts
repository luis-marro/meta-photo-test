import { InternalAlbumService } from "./internalAlbumService"
import { InternalUserService } from "./internalUserService"
import { InternalPhotoService } from "./internalPhotoService"


export class ExternalPhotoService {
  photoService = new InternalPhotoService()
  albumService = new InternalAlbumService()
  userService = new InternalUserService()

    /**
   * Fetch photo, album, and user details in a single enriched response.
   */
  async getEnrichedPhotoById(photoId: number): Promise<any> {
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

  async getEnrichedPhotos(): Promise<any[]> {
    const [photos, albums, users] = await Promise.all([
      this.photoService.getPhotos(),
      this.albumService.getAlbums(),
      this.userService.getUsers()
    ])

    // Map users by ID for quick lookup
    const userMap = new Map(users.map((user) => [user.id, user]))

    // Map albums by ID, and include user info
    const albumMap = new Map(
      albums.map((album) => [
        album.id,
        {
          ...album,
          user: userMap.get(album.userId),
        },
      ])
    )

    // Enrich photos with album and user data
    return photos.map((photo) => ({
      ...photo,
      album: albumMap.get(photo.albumId),
    }))
  }
}