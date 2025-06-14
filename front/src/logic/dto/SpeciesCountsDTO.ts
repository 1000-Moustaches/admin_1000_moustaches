import SpeciesCounts, { CountBySpecies as CountBySpecies } from "../entities/SpeciesCounts";

class SpeciesCountsDTO {
    total: number | undefined;
    species: CountBySpeciesDTO[] | undefined;

    constructor(animalsCount: any) {
        this.total = animalsCount.total;
        this.species = animalsCount.species;
    }

    toEntity(): SpeciesCounts {
        return {
            total: this.total ?? 0,
            species: this.species?.map((species) => new CountBySpecies(species.id, species.name, species.count)) ?? [],
        };
    }
}

class CountBySpeciesDTO {
    id: number;
    name: string;
    count: number;

    constructor(id: number, name: string, count: number) {
        this.id = id;
        this.name = name;
        this.count = count;
    }
}
export default SpeciesCountsDTO;
