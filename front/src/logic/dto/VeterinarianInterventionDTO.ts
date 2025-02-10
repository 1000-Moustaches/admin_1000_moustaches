import VeterinarianIntervention from "../entities/VeterinarianIntervention";

class VeterinarianInterventionDTO {
    id: number;
    veterinarian_id: number;
    date: string;
    description: string;
    animalId: number;

    constructor(vetInter: any) {
        this.id = vetInter.id;
        this.veterinarian_id = vetInter.veterinarian_id;
        this.date = vetInter.date?.substring(0, 10);
        this.description = vetInter.description;
        this.animalId = vetInter.animalId;
    }

    toEntity() {
        return new VeterinarianIntervention(
            this.id,
            this.veterinarian_id,
            this.date,
            this.description,
            this.animalId
        );
    }
}

export default VeterinarianInterventionDTO;