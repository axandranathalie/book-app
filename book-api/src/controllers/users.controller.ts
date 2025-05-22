// src/controllers/users.controller.ts

// === IMPORTS ===

// == Types ==
import { Request, Response } from 'express'

// == Security libraries ==
import bcrypt from 'bcryptjs'

// == Utils ==
import { formatUser } from '../utils/formatUser.js'

// == Database model ==
import User from '../models/user.js'

/** === GET ALL USERS ===
 * - Fetches all users from the database
 * - Returns formatted user list
 */
export async function getAllUsers(_req: Request, res: Response) {
  try {
    const users = await User.find()
    const formatted = users.map(formatUser)

    res.status(200).json(formatted)
  } catch (error) {
    console.error('❌ Error fetching users:', error)
    res.status(500).json({ error: 'Server failed to fetch users' })
  }
}

/** === GET USER BY ID ===
 * - Finds user by ID and returns formatted result
 */
export async function getUserById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.status(200).json(formatUser(user))
  } catch (error) {
    console.error('❌ Error fetching user by ID:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

/** === UPDATE USER BY ID ===
 * - Updates username and/or password
 * - Returns formatted updated user
 */
export async function updateUserById(req: Request, res: Response) {
  const { id } = req.params
  const { username, password } = req.body

  try {
    const user = await User.findById(id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    if (username) user.username = username
    if (password) user.password = await bcrypt.hash(password, 10)

    await user.save()

    res.status(200).json({
      message: 'User updated successfully',
      user: formatUser(user),
    })
  } catch (error) {
    console.error('❌ Error updating user:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

/** === DELETE USER BY ID ===
 * - Deletes user by ID
 */
export async function deleteUserById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    await User.findByIdAndDelete(id)

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('❌ Error deleting user:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
