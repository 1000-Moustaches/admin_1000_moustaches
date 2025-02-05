import { AppDataSource } from "../config/database"
import { Animal } from "../models/Animal"

export class AnimalController {
    private animalRepository = AppDataSource.getRepository(Animal)

    async getAllAnimals() {
        return await this.animalRepository.find({
            relations: ['species', 'hostFamilyRelations']
        })
    }

    async getAnimalById(id: number) {
        return await this.animalRepository.findOne({
            where: { id },
            relations: ['species', 'hostFamilyRelations']
        })
    }

    async createAnimal(animalData: Partial<Animal>) {
        const animal = this.animalRepository.create(animalData)
        return await this.animalRepository.save(animal)
    }

    async updateAnimal(id: number, animalData: Partial<Animal>) {
        await this.animalRepository.update(id, animalData)
        return await this.getAnimalById(id)
    }

    async deleteAnimal(id: number) {
        return await this.animalRepository.delete(id)
    }
} 