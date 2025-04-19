import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { HostFamily } from "./HostFamily"
import { Team } from "./Team"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true, default: () => 'NULL' })
  name: string

  @Column({ nullable: true, default: () => 'NULL' })
  firstname: string

  @Column({ nullable: true, default: () => 'NULL' })
  email: string

  @Column({ nullable: true, default: () => 'FALSE' })
  isReferent: boolean

  @OneToMany(() => HostFamily, hostFamily => hostFamily.referent)
  hostFamilies: HostFamily[]

  @ManyToMany(() => Team, team => team.users)
  @JoinTable()
  teams: Team[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
} 