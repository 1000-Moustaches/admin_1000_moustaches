import Animal from "./Animal";
import DateObject from "./DateObject";
import HostFamily from "./HostFamily";

class AnimalToHostFamily {
    id?: number;
    animal?: Animal;
    hostFamily?: HostFamily;
    entryDate?: string;
    exitDate?: string;

    entryDateObject: DateObject;
    exitDateObject: DateObject;

    static copy(athf: AnimalToHostFamily): AnimalToHostFamily {
        let newATHF = new AnimalToHostFamily(athf.id, athf.animal, athf.hostFamily, athf.entryDate, athf.exitDate);
        return newATHF;
    }

    constructor(id?: number, animal?: Animal, hostFamily?: HostFamily, entryDate?: string, exitDate?: string) {
        this.id = id;
        this.animal = animal;
        this.hostFamily = hostFamily;
        this.entryDate = entryDate?.substring(0, 10);
        this.exitDate = exitDate?.substring(0, 10);

        this.entryDateObject = new DateObject();
        this.setEntryDate(this.entryDate);

        this.exitDateObject = new DateObject();
        this.setExitDate(this.exitDate);
    }

    setEntryDate = (date?: string) => {
        this.entryDate = date;
        this.entryDateObject.setDate(date);
    };

    setExitDate = (date?: string) => {
        this.exitDate = date;
        this.exitDateObject?.setDate(date);
    };
}

export default AnimalToHostFamily;
