import { AppDataSource } from "../config/database"
import { Species } from "../models/Species"

export class AnimalsCountController {
  private speciesRepository = AppDataSource.getRepository(Species)

  private async getCountAnimals({ adopted }: { adopted: boolean }) {
    return await this.speciesRepository.find({
      relations: {
        animals: true
      },
      where: {
        animals: {
          adopted: adopted
        }
      }
    })
      .then(species => {
        return species.map(species => {
          return {
            id: species.id,
            name: species.name,
            count: species.animals.filter(animal => animal.adopted).length
          }
        })
      })
      .then(speciesCount => {
        const total = speciesCount.reduce((acc, species) => acc + species.count, 0)
        return {
          total,
          species: speciesCount
        }
      })
  }

  async getCountAnimalsAdopted() {
    return await this.getCountAnimals({ adopted: true })
  }

  async getCountAnimalsNonAdopted() {
    return await this.getCountAnimals({ adopted: false })
  }
}
