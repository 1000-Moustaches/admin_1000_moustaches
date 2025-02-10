import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../models/User"
import { Species } from "../models/Species"
import { Animal } from "../models/Animal"
import { HostFamily } from "../models/HostFamily"
import { HostFamilyKind } from "../models/HostFamilyKind"
import { Veterinarian } from "../models/Veterinarian"
import { VeterinarianIntervention } from "../models/VeterinarianIntervention"
import { AnimalHostFamily } from "../models/AnimalHostFamily"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_DATABASE || "moustaches",
    synchronize: false,
    logging: true,
    entities: [
        User,
        Species,
        Animal,
        HostFamily,
        HostFamilyKind,
        Veterinarian,
        VeterinarianIntervention,
        AnimalHostFamily
    ],
    subscribers: [],
    migrations: ["dist/migrations/*.js"],
    migrationsTableName: "migrations",
    migrationsRun: true
}) 