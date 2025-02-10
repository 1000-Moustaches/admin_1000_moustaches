import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Veterinarian } from "./Veterinarian"
import { Animal } from "./Animal"

@Entity()
export class VeterinarianIntervention {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @Column({ nullable: true, default: () => 'NULL' })
    description: string

    @ManyToOne(() => Veterinarian, veterinarian => veterinarian.interventions)
    veterinarian: Veterinarian

    @ManyToOne(() => Animal)
    animal: Animal

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date
} 