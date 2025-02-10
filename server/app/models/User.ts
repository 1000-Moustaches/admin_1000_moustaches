import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Animal } from "./Animal"
import { HostFamily } from "./HostFamily"

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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date
} 