import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Animal } from "./Animal"
import { HostFamily } from "./HostFamily"

@Entity('animals_to_host_families')
export class AnimalHostFamily {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Animal, animal => animal.hostFamilyRelations)
    animal: Animal

    @ManyToOne(() => HostFamily, hostFamily => hostFamily.animalRelations)
    hostFamily: HostFamily

    @Column({ type: 'timestamp', nullable: true, default: () => 'NULL' })
    entryDate: Date
} 