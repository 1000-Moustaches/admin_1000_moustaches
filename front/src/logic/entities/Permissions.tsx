class Permissions {
    ressource_name: string;
    can_create: boolean;
    can_read: boolean;
    can_update: boolean;
    can_delete: boolean;

    constructor(
        ressource_name: string,
        can_create: boolean,
        can_read: boolean,
        can_update: boolean,
        can_delete: boolean
    ) {
        this.ressource_name = ressource_name;
        this.can_create = can_create;
        this.can_read = can_read;
        this.can_update = can_update;
        this.can_delete = can_delete;
    }

}

export default Permissions;
