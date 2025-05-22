// src/routes/users.routes.ts

// === IMPORTS ===
import { Router } from 'express'

// == Helper function ==
import { verifyAccessToken } from '../middleware/verifyToken.js'

// == Controller functions ==
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
} from '../controllers/users.controller.js'

// == Create users router ==
const router = Router()

// === Routes ===
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.patch('/:id', verifyAccessToken, updateUserById)
router.delete('/:id', verifyAccessToken, deleteUserById)

export default router
