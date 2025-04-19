import { Permission } from "../models/Permission";
import { AppDataSource } from "../config/database";

export class PermissionController {
  private permissionRepository = AppDataSource.getRepository(Permission)

  async getCurrentUserPermissions(userId: number) {
    const permissions = await this.permissionRepository.find({
      select: {
        create: true,
        read: true,
        update: true,
        delete: true,
        ressource: {
          name: true
        }
      },
      relations: {
        team: false,
        ressource: true
      },
      where: {
        team: {
          users: {
            id: userId
          }
        }
      }
    })

    if (permissions.length === 0) {
      throw new Error("User not found")
    }

    return permissions

    // if (req.authUser === null) {
    //   return res.status(401).send({ error: "You are not authorized to make this request" });
    // }
    // const id = req.authUser.id;
    // Permission.findByUserId(id, (err, data) => {
    //   if (err)
    //     res.status(500).send({
    //       message:
    //         err.message ||
    //         `Some error occurred while retrieving Permission with id ${id}.`,

    //     });
    //   else res.send(data);
    // });
  }
}
