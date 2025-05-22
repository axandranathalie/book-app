// src/modes/user.ts

// === IMPORTS ===
import mongoose from 'mongoose'
import { IUser } from '../types/IUser.js'

// Mongoose schema for User
const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_admin: { type: Boolean, default: false },
  created_at: { type: Date, default: () => new Date() },
})

export default mongoose.model('User', userSchema)
