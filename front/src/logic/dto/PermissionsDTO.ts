import Permissions from "../entities/Permissions";

class PermissionsDTO {
  create: number;
  read: number;
  update: number;
  delete: number;
  ressource: {
    name: string;
  }

  constructor(Permissions: any) {
    this.ressource = Permissions.ressource;
    this.create = Permissions.create;
    this.read = Permissions.read;
    this.update = Permissions.update;
    this.delete = Permissions.delete;
  }

  toEntity() {
    return new Permissions(
      this.ressource.name,
      this.create == 1,
      this.read == 1,
      this.update == 1,
      this.delete == 1
    );
  }
}

export default PermissionsDTO;