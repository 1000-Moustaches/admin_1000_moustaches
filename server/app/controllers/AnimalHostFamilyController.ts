import { AppDataSource } from "../config/database"
import { AnimalHostFamily } from "../models/AnimalHostFamily"
import { HostFamily } from "../models/HostFamily"

export class AnimalHostFamilyController {
  private animalHostFamilyRepository = AppDataSource.getRepository(AnimalHostFamily)

  async getAnimalHostFamilyById(id: number) {
    return await this.animalHostFamilyRepository.findOne({
      where: {
        id
      },
      relations: {
        hostFamily: true,
        animal: true
      }
    })
  }

  async getWithAnimalId(animalId: number) {
    return await this.animalHostFamilyRepository.find({
      relations: {
        hostFamily: true,
        animal: true
      },
      where: {
        animal: {
          id: animalId
        }
      }
    })
  }

  async getWithHostFamilyId(hostFamilyId: number) {
    return await this.animalHostFamilyRepository.findOne({
      relations: {
        hostFamily: true,
        animal: true
      },
      where: {
        hostFamily: {
          id: hostFamilyId
        }
      }
    })
  }

  async createAnimalHostFamily(animalHostFamilyData: Partial<AnimalHostFamily>) {
    const animalHostFamily = this.animalHostFamilyRepository.create(animalHostFamilyData)
    return await this.animalHostFamilyRepository.save(animalHostFamily)
  }

  async updateAnimalHostFamily(id: number, hostFamilyData: Partial<HostFamily>) {
    await this.animalHostFamilyRepository.update(id, hostFamilyData)
    return await this.getAnimalHostFamilyById(id)
  }

  async deleteAnimalHostFamily(id: number) {
    return await this.animalHostFamilyRepository.delete(id)
  }
} 