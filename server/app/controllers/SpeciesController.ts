import { AppDataSource } from "../config/database"
import { Species } from "../models/Species"

export class SpeciesController {
    private speciesRepository = AppDataSource.getRepository(Species)

    async getAllSpecies() {
        return await this.speciesRepository.find()
    }

    async getSpeciesById(id: number) {
        return await this.speciesRepository.findOneBy({ id })
    }

    async createSpecies(speciesData: Partial<Species>) {
        const species = this.speciesRepository.create(speciesData)
        return await this.speciesRepository.save(species)
    }

    async updateSpecies(id: number, speciesData: Partial<Species>) {
        await this.speciesRepository.update(id, speciesData)
        return await this.speciesRepository.findOneBy({ id })
    }

    async deleteSpecies(id: number) {
        return await this.speciesRepository.delete(id)
    }
} 