import type { IUser } from '../types/IUser.js'

/**
 * Formats a date into "DD-MM-YY" string format.
 *
 * @param date - A Date object or ISO date string
 * @returns A formatted date string in "DD-MM-YY" format
 */
function formatDate(date: Date | string): string {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = String(d.getFullYear()).slice(-2)
  return `${day}-${month}-${year}`
}

/**
 * Transforms a raw user object from the database
 * into a formatted user object suitable for frontend use.
 *
 * @param user - The raw user object from the database
 * @returns A user object with formatted fields
 */
export function formatUser(user: IUser) {
  return {
    username: user.username,
    password: user.password,
    role: user.is_admin ? 'Admin' : 'User',
    created_at: formatDate(user.created_at),
  }
}
