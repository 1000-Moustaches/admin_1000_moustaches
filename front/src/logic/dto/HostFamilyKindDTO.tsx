import HostFamilyKind from "../entities/HostFamilyKind";

class HostFamilyKindDTO {
    id: number;
    name: string;

    static copy(hfk: HostFamilyKindDTO): HostFamilyKindDTO {
        return new HostFamilyKindDTO(hfk);
    }

    constructor(hostFamilyKind: any) {
        this.id = hostFamilyKind.id;
        this.name = hostFamilyKind.name;
    }

    toEntity(): HostFamilyKind {
        return new HostFamilyKind(this.id, this.name);
    }
}

export default HostFamilyKindDTO;
