import { ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Column } from "typeorm";

import { Entity } from "typeorm";
import { Ressource } from "./Ressource";
import { Team } from "./Team";

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