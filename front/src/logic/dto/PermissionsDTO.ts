import Permissions from "../entities/Permissions";


class PermissionsDTO {
    // id: number;
    user_name: string;
    team_name: string;
    ressource_name: string;
    create: number;
    read: number;
    update: number;
    delete: number;

    constructor(Permissions: any) {
        this.user_name = Permissions.user_name;
        this.team_name = Permissions.team_name;
        this.ressource_name = Permissions.ressource_name;
        this.create = Permissions.create;
        this.read = Permissions.read;
        this.update = Permissions.update;
        this.delete = Permissions.delete;
    }

    toEntity() {
        return new Permissions (
            this.user_name,
            this.team_name,
            this.ressource_name,
            this.create==1,
            this.read==1,
            this.update==1,
            this.delete==1
        );
    }
}

export default PermissionsDTO;