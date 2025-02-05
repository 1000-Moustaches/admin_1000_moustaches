import { AppDataSource } from "../config/database"
import { VeterinarianIntervention } from "../models/VeterinarianIntervention"

export class VeterinarianInterventionController {
    private interventionRepository = AppDataSource.getRepository(VeterinarianIntervention)

    async getAllInterventions() {
        return await this.interventionRepository.find({
            relations: ['veterinarian', 'animal']
        })
    }

    async getInterventionById(id: number) {
        return await this.interventionRepository.findOne({
            where: { id },
            relations: ['veterinarian', 'animal']
        })
    }

    async createIntervention(interventionData: Partial<VeterinarianIntervention>) {
        const intervention = this.interventionRepository.create(interventionData)
        return await this.interventionRepository.save(intervention)
    }

    async updateIntervention(id: number, interventionData: Partial<VeterinarianIntervention>) {
        await this.interventionRepository.update(id, interventionData)
        return await this.getInterventionById(id)
    }

    async deleteIntervention(id: number) {
        return await this.interventionRepository.delete(id)
    }
} 