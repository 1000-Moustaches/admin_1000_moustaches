import DateObject from "./DateObject";

class VeterinarianIntervention {
    id?: number;
    veterinarianId?: number;
    date?: string;
    description?: string;
    animalId?: number;

    dateObject: DateObject;

    static copy(vetInter: VeterinarianIntervention): VeterinarianIntervention {
        return new VeterinarianIntervention(vetInter.id, vetInter.veterinarianId, vetInter.date, vetInter.description, vetInter.animalId);
    }

    constructor(id?: number, veterinarianId?: number, date?: string, description: string = "", animalId: number = -1) {
        this.id = id;
        this.veterinarianId = veterinarianId;
        this.date = date?.substring(0, 10);
        this.description = description;
        this.animalId = animalId;

        this.dateObject = new DateObject();
        this.setDate(this.date);
    }

    setDate = (date?: string) => {
        this.date = date;
        this.dateObject.setDate(date);
    };
}

export default VeterinarianIntervention;
