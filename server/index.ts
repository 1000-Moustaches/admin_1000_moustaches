import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { AppDataSource } from './app/config/database'
import routes from './app/routes'
import * as functions from 'firebase-functions'

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

// Initialize TypeORM
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch((error) => {
        console.error("Error during Data Source initialization:", error)
    })

// Export for Firebase Functions
export const api = functions.https.onRequest(app)