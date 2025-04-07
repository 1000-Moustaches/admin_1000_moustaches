class SpeciesCounts {
    total: number;
    species: CountBySpecies[];

    constructor(total: number, species: CountBySpecies[]) {
        this.total = total;
        this.species = species;
    }
}

export class CountBySpecies {
    id: number;
    name: string;
    count: number;

    constructor(id: number, name: string, count: number) {
        this.id = id;
        this.name = name;
        this.count = count;
    }
}

export default SpeciesCounts;
