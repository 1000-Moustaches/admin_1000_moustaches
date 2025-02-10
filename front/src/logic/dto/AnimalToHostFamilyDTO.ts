import Animal from "../entities/Animal";
import AnimalToHostFamily from "../entities/AnimalToHostFamily";
import HostFamily from "../entities/HostFamily";
import AnimalDTO from "./AnimalDTO";
import HostFamilyDTO from "./HostFamilyDTO";

class HostFamilyRelationDTO {
    id: number;
    animal?: AnimalDTO;
    hostFamily?: HostFamilyDTO;
    entryDate: string;
    exitDate: string;

    constructor(animalToHostFamily: any, animal?: AnimalDTO, hostFamily?: HostFamilyDTO) {
        this.id = animalToHostFamily.id;
        this.animal = animal;
        if (this.animal === undefined && animalToHostFamily.animal !== undefined) {
            this.animal = new AnimalDTO(animalToHostFamily.animal);
        }
        this.hostFamily = hostFamily
        if (this.hostFamily === undefined && animalToHostFamily.hostFamily !== undefined) {
            this.hostFamily = new HostFamilyDTO(animalToHostFamily.hostFamily)
        }
        this.entryDate = animalToHostFamily.entryDate?.substring(0, 10);
        this.exitDate = animalToHostFamily.exitDate?.substring(0, 10);
    }

    toEntity(animal?: Animal, hostFamily?: HostFamily): AnimalToHostFamily {
        return new AnimalToHostFamily(this.id, animal ?? this.animal?.toEntity(), hostFamily ?? this.hostFamily?.toEntity(), this.entryDate, this.exitDate);
    }
}

export default HostFamilyRelationDTO;