import { ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Column } from "typeorm";

import { Entity } from "typeorm";
import { Ressource } from "./Ressource";
import { Team } from "./Team";

/*
const sql = require("./db.js");

// constructor
const Permission = function () {};

Permission.findByUserId = (id, result) => {
  sql.connect((connection) =>
    connection.query(
      

      (err, res) => {
        connection.end();
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log(`findById(${id}) : permission : `, res[0]);
          result(null, res);
          return;
        }

        // not found entity with the id
        result({ kind: "not_found" }, null);
      }
    )
  );
};

module.exports = Permission;
*/

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  create: boolean

  @Column()
  read: boolean

  @Column()
  update: boolean

  @Column()
  delete: boolean

  @ManyToOne(() => Ressource, ressource => ressource.permissions)
  ressource: Ressource

  @ManyToOne(() => Team, team => team.permissions)
  team: Team

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}