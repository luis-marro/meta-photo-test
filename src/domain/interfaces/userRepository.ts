import { User } from "../entities"

export interface UserRepository {
    findById(id: number): User | null
    findByEmail(email: string): User | null
 }
