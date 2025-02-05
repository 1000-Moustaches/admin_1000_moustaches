import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { HostFamilyKind } from "./HostFamilyKind"
import { Animal } from "./Animal"
import { AnimalHostFamily } from "./AnimalHostFamily"

@Entity()
export class HostFamily {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    firstname: string

    @Column({ nullable: true, default: () => 'NULL' })
    phone: string

    @Column({ nullable: true, default: () => 'NULL' })
    mail: string

    @Column({ nullable: true, default: () => 'NULL' })
    socialNetworkAlias: string

    @Column({ nullable: true, default: () => 'NULL' })
    driverLicense: boolean

    @Column({ nullable: true, default: () => 'NULL' })
    nbChildren: number

    @Column({ nullable: true, default: () => 'NULL' })
    childrenInfos: string

    @Column({ nullable: true, default: () => 'NULL' })
    animalsInfos: string

    @Column({ nullable: true, default: () => 'NULL' })
    canProvideVeterinaryCare: boolean

    @Column({ nullable: true, default: () => 'NULL' })
    canProvideSociabilisation: boolean

    @Column({ nullable: true, default: () => 'NULL' })
    canHostDisableAnimal: boolean

    @Column({ nullable: true, default: () => 'NULL' })
    canProvideNightCare: boolean

    @Column({ nullable: true, default: () => 'NULL' })
    observations: string

    @Column({ nullable: true, default: () => 'NULL' })
    housingInformations: string

    @Column({ nullable: true, default: () => 'NULL' })
    address: string

    @Column({ nullable: true, default: () => 'NULL' })
    latitude: number

    @Column({ nullable: true, default: () => 'NULL' })
    longitude: number

    @Column({ nullable: true, default: () => 'NULL' })
    hostConditions: string

    @Column({ nullable: true, default: () => 'FALSE' })
    onBreak: boolean

    @Column({ nullable: true, default: () => 'FALSE' })
    membershipUpToDate: boolean

    @Column({ nullable: true, default: () => 'NULL' })
    referentId: number

    @Column({ nullable: true, default: () => 'FALSE' })
    isTemporary: boolean

    @Column({ nullable: true, default: () => 'NULL' })
    hasVehicule: boolean

    @Column({ nullable: true, default: () => 'NULL' })
    canIsolate: string

    @Column({ nullable: true, default: () => 'NULL' })
    situation: string

    @ManyToMany(() => HostFamilyKind)
    @JoinTable({
        name: "host_family_to_host_family_kinds"
    })
    hostFamilyKinds: HostFamilyKind[]

    @OneToMany(() => AnimalHostFamily, relation => relation.hostFamily)
    animalRelations: AnimalHostFamily[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date
}