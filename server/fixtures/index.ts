// This file is used to load fixtures into the database
// It is used to populate the database with data for development purposes
// It is not used in production
import * as dotenv from "dotenv";
import path from "path";

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in the server directory
  // Usefull for windows local development
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

import { AppDataSource } from "../app/config/database";
import { createUsers } from "./users";
import { createAnimals } from "./animals";
import { createHostFamilies } from "./hostFamilies";

const loadFixtures = async () => {
  AppDataSource.initialize().then(async () => {
    await createUsers(AppDataSource);
    await createAnimals(AppDataSource);
    await createHostFamilies(AppDataSource);
    // TODO: Add other fixtures here
  });
};

loadFixtures();
