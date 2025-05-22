// src/types/IUser.ts

/**
 * Raw User document type used in backend (e.g. from MongoDB).
 * Matches the schema used in the Mongoose model.
 */
export interface IUser {
  username: string
  password: string
  is_admin: boolean
  created_at: Date
}
