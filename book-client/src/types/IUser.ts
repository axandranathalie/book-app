/**
 * User object received from the API (already formatted).
 * - `password` is a hashed string
 * - `created_at` may be a Date object or a formatted string
 */
export interface IUser {
  id: string
  username: string
  password: string
  is_admin: boolean
  created_at: Date | string
}
