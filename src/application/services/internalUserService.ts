import axios from "axios";
import { User, Album, Photo } from "../../domain/entities";

export class InternalUserService {
  private static BASE_URL = "https://jsonplaceholder.typicode.com";

  /**
   * Fetch a user by ID and return a User entity.
   */
  async getUserById(userId: number): Promise<User> {
    const response = await axios.get(`${InternalUserService.BASE_URL}/users/${userId}`);
    const data = response.data;

    // Map raw data to User entity
    return new User(
      data.id,
      data.name,
      data.username,
      data.email,
      {
        street: data.address.street,
        suite: data.address.suite,
        city: data.address.city,
        zipcode: data.address.zipcode,
        geo: {
          lat: data.address.geo.lat,
          lng: data.address.geo.lng,
        },
      },
      data.phone,
      data.website,
      {
        name: data.company.name,
        catchPhrase: data.company.catchPhrase,
        bs: data.company.bs,
      }
    );
  }

  /**
   * Fetch an album by ID and return an Album entity.
   */
  async getAlbumById(albumId: number): Promise<Album> {
    const response = await axios.get(`${InternalUserService.BASE_URL}/albums/${albumId}`);
    const data = response.data;

    return new Album(data.id, data.title, data.userId);
  }

  /**
   * Fetch a photo by ID and return a Photo entity.
   */
  async getPhotoById(photoId: number): Promise<Photo> {
    const response = await axios.get(`${InternalUserService.BASE_URL}/photos/${photoId}`);
    const data = response.data;

    return new Photo(data.id, data.title, data.url, data.thumbnailUrl, data.albumId);
  }

  /**
   * Fetch photo, album, and user details in a single enriched response.
   */
  async getEnrichedPhoto(photoId: number): Promise<any> {
    const photo = await this.getPhotoById(photoId);
    const album = await this.getAlbumById(photo.albumId);
    const user = await this.getUserById(album.userId);

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
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        address: user.address,
        phone: user.phone,
        website: user.website,
        company: user.company,
      },
    };
  }
}
