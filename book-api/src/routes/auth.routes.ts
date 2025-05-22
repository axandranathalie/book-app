// src/routes/auth.routes.ts

// === IMPORTS ===
import { Router, Request, Response } from 'express'

// === Controller functions ===
import { 
  registerNewUser, 
  loginUser, 
  logoutUser
  } from '../controllers/auth.controller.js'

// === Create auth router ===
const router = Router()

// === Routes ===

// Test placeholder
router.get('/', (_req: Request, res: Response) => {
  res.send('You are on the auth route!')
})

// Register route
router.post('/register', registerNewUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

export default router
