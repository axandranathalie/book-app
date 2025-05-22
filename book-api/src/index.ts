// src/index.ts

// === IMPORTS ===
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// === ROUTES ===
import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/users.routes.js'
import bookRoutes from './routes/books.routes.js'
import reviewRoutes from './routes/review.routes.js'

// === LOAD ENVIRONMENT VARIABLES ===
dotenv.config()

// === APP CONFIG ===
const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || ''
const isProduction = process.env.NODE_ENV === 'production'

// === ALLOWED CLIENT ORIGINS ===
// Read comma-separated list from .env file
const allowedOrigins = (process.env.CLIENT_URL || '').split(',')

/**
 * === CORS CONFIGURATION ===
 *
 * Enables cross-origin requests only from known client URLs.
 * Includes credentials (cookies).
 */
app.use(cors({

  // origin: (origin, callback) => {
  //   if (!origin || allowedOrigins.includes(origin)) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error(`❌ CORS blocked for origin: ${origin}`))
  //   }
  // }
  origin: "https://book-client-zeta.vercel.app",
  credentials: true
}))

// === MIDDLEWARE ===
app.use(express.json())        // Parse JSON bodies
app.use(cookieParser())        // Enable cookie parsing

// === API ROUTES ===
app.use('/auth', authRoutes)      // Authentication
app.use('/users', usersRoutes)    // User management
app.use('/books', bookRoutes)     // Book management
app.use('/reviews', reviewRoutes) // Book reviews

/**
 * === CONNECT TO DATABASE AND START SERVER ===
 * If connection to MongoDB is successful, starts Express server
 */
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('🎉 Connected to MongoDB')
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    )
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error)
  })
