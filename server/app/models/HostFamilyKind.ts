import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { HostFamily } from "./HostFamily"

@Entity()
export class HostFamilyKind {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => HostFamily, hostFamily => hostFamily.hostFamilyKinds)
    hostFamilies: HostFamily[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date
} 