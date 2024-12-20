import { User } from "../../domain/entities";
import { UserRepository } from "../../domain/interfaces";

export class InMemoryUserRepository implements UserRepository {
  private users: Map<number, User> = new Map();

  findById(id: number): User | null {
    return this.users.get(id) || null;
  }

  findByEmail(email: string): User | null {
    return Array.from(this.users.values()).find(user => user.email === email) || null;
  }
}
