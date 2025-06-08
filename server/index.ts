import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file in the server directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { AppDataSource } from './app/config/database'
import routes from './app/routes'
const { onRequest } = require("firebase-functions/v2/https");

const app = express()

// Middlewares
app.use(cors())
app.use(helmet())
app.use(express.json())

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// Routes
app.use('/', routes)

// Initialize TypeORM only when not in CI/CD
const isCI = process.env.CI === 'true';
if (!isCI) {
  AppDataSource.initialize()
    .then(() => {
      console.log("Database connected successfully")
    })
    .catch((error: Error) => {
      console.error("Error during Data Source initialization:", error)
    })
}

// Export for Firebase Functions
export const api = onRequest(app)