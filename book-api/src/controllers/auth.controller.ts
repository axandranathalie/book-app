// src/controllers/auth.controller.ts
 
// === IMPORTS ===
 
// == Types ==
import { Request, Response } from 'express'
 
// == Security libraries ==
import bcrypt from 'bcryptjs' // For hashing and comparing passwords
import jwt from 'jsonwebtoken' // For generating JSON Web Tokens
 
// == Utils ==
import { validateCredentials } from '../utils/validate.auth.js'
 
// == Database model ==
import User from '../models/user.js'
 
// == Config ==
const isProduction = process.env.NODE_ENV === 'production'
 
/**
 * === REGISTER NEW USER ===
 *
 * Handles registration of a new user:
 * - Validates input credentials
 * - Checks if the username is already taken
 * - Hashes the password securely
 * - Saves the user to the database
 *
 * @route POST /auth/register
 * @param req - Express request object (expects `username` and `password`)
 * @param res - Express response object
 * @returns 201 on success, 400 if validation fails, 409 if user exists, 500 on server error
 */
export async function registerNewUser(req: Request, res: Response) {
  const { username, password } = req.body
 
  const validationError = validateCredentials(username, password)
  if (validationError) {
    res.status(400).json({ error: validationError })
    return
  }
 
  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      res.status(409).json({ error: 'Username already exists' })
      return
    }
 
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()
 
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('❌ Registration error:', error)
    res.status(500).json({ error: 'Registration failed' })
  }
}
 
/**
 * === LOG IN USER ===
 *
 * Authenticates a user and issues a JWT token:
 * - Validates credentials
 * - Verifies user exists
 * - Compares password using bcrypt
 * - Issues JWT token valid for 1 hour
 * - Sends token in secure httpOnly cookie
 *
 * @route POST /auth/login
 * @param req - Express request object (expects `username` and `password`)
 * @param res - Express response object
 * @returns 200 on success, 400 on validation fail, 401/409 on auth error, 500 on server error
 */
export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body
 
  const validationError = validateCredentials(username, password)
  if (validationError) {
    res.status(400).json({ error: validationError })
    return
  }
 
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.status(409).json({ error: 'No user with this username exists' })
      return
    }
 
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid username or password' })
      return
    }
 
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        is_admin: user.is_admin,
      },
      process.env.JWT_SECRET || '',
      { expiresIn: '1h' }
    )
 
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 60 * 60 * 1000, // 1 hour
    })
 
    res.status(200).json({
      message: 'You are logged in',
      token: accessToken,
    })
  } catch (error) {
    console.error('❌ Login error:', error)
    res.status(500).json({ error: 'Server error during login' })
  }
}
 
/**
 * === LOG OUT USER ===
 *
 * Clears the user's authentication cookie:
 * - Removes `accessToken` from browser
 *
 * @route POST /auth/logout
 * @param _req - Express request object (not used)
 * @param res - Express response object
 * @returns 200 on success
 */
export function logoutUser(_req: Request, res: Response) {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  })
 
  res.status(200).json({ message: 'User logged out' })
}