import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date
} 