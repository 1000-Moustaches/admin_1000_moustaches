import { AppDataSource } from "../config/database"
import { Veterinarian } from "../models/Veterinarian"

export class VeterinarianController {
    private veterinarianRepository = AppDataSource.getRepository(Veterinarian)

    async getAllVeterinarians() {
        return await this.veterinarianRepository.find({
            relations: ['interventions']
        })
    }

    async getVeterinarianById(id: number) {
        return await this.veterinarianRepository.findOne({
            where: { id },
            relations: ['interventions']
        })
    }

    async createVeterinarian(vetData: Partial<Veterinarian>) {
        const vet = this.veterinarianRepository.create(vetData)
        return await this.veterinarianRepository.save(vet)
    }

    async updateVeterinarian(id: number, vetData: Partial<Veterinarian>) {
        await this.veterinarianRepository.update(id, vetData)
        return await this.getVeterinarianById(id)
    }

    async deleteVeterinarian(id: number) {
        return await this.veterinarianRepository.delete(id)
    }
} 