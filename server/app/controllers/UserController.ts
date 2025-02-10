import { AppDataSource } from "../config/database"
import { User } from "../models/User"

export class UserController {
    private userRepository = AppDataSource.getRepository(User)

    async getAllUsers() {
        return await this.userRepository.find()
    }

    async getUserById(id: number) {
        return await this.userRepository.findOneBy({ id })
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOneBy({ email })
    }

    async createUser(userData: Partial<User>) {
        const user = this.userRepository.create(userData)
        return await this.userRepository.save(user)
    }

    async updateUser(id: number, userData: Partial<User>) {
        await this.userRepository.update(id, userData)
        return await this.userRepository.findOneBy({ id })
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete(id)
    }
} 