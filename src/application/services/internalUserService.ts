import axios from "axios";
import { User, Photo } from "../../domain/entities";

export class InternalUserService {
  /**
   * Fetch a user by ID and return a User entity.
   */
  async getUserById(userId: number): Promise<User> {
    const response = await axios.get(`${process.env.INTERNAL_API_BASE_URL}/users/${userId}`);
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
    )
  }
}
