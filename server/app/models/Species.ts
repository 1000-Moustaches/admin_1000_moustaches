import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Animal } from "./Animal"

@Entity()
export class Species {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Animal, animal => animal.species)
    animals: Animal[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date
} 