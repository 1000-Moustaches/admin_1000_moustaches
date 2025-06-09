import { In } from "typeorm";
import { AppDataSource } from "../config/database";
import { HostFamily } from "../models/HostFamily";

export class HostFamilyController {
  private hostFamilyRepository = AppDataSource.getRepository(HostFamily);

  async getAllHostFamilies({ kinds }: { kinds: string[] } = { kinds: [] }) {
    return await this.hostFamilyRepository.find({
      relations: {
        hostFamilyKinds: true,
        animalRelations: false,
        referent: true,
      },
      where:
        kinds.length > 0
          ? {
              hostFamilyKinds: {
                id: In(kinds),
              },
            }
          : {},
    });
  }

  async getHostFamilyById(id: number) {
    return await this.hostFamilyRepository.findOne({
      where: { id },
      relations: {
        hostFamilyKinds: true,
        animalRelations: {
          animal: {
            species: true,
          },
        },
        referent: true,
      },
    });
  }

  async createHostFamily(hostFamilyData: Partial<HostFamily>) {
    const hostFamily = this.hostFamilyRepository.create(hostFamilyData);
    return await this.hostFamilyRepository.save(hostFamily);
  }

  async updateHostFamily(id: number, hostFamilyData: Partial<HostFamily>) {
    await this.hostFamilyRepository.update(id, hostFamilyData);
    return await this.getHostFamilyById(id);
  }

  async deleteHostFamily(id: number) {
    return await this.hostFamilyRepository.delete(id);
  }
}
