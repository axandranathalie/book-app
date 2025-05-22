/**
 * === VALIDATE USERNAME ===
 *
 * - Required
 * - 3–20 characters
 * - Lowercase letters, numbers, "-" or "_"
 *
 * @param username - The username string to validate
 * @returns Error message as string if invalid, otherwise null
 */
export const validateUsername = (username: string): string | null => {
  if (!username) return 'Username is required'

  const regex = /^[a-z0-9_-]{3,20}$/
  if (!regex.test(username)) {
    return 'Use 3–20 lowercase letters, numbers, - or _'
  }

  return null
}

/**
 * === VALIDATE PASSWORD ===
 *
 * - Required
 * - 8–20 characters
 * - Must include at least one uppercase letter
 * - Must include at least one special character
 *
 * @param password - The password string to validate
 * @returns Error message as string if invalid, otherwise null
 */
export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required'

  if (password.length < 8 || password.length > 20) {
    return '8–20 characters required'
  }

  if (!/[A-Z]/.test(password)) {
    return 'Include at least one uppercase letter'
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return 'Include at least one special character'
  }

  return null
}

/**
 * === VALIDATE CREDENTIALS ===
 *
 * - Validates both `username` and `password` using shared rules
 * - Returns first validation error found
 *
 * @param username - The username string
 * @param password - The password string
 * @returns Error message as string if invalid, otherwise null
 */
export const validateCredentials = (
  username: string,
  password: string
): string | null => {
  const usernameError = validateUsername(username)
  if (usernameError) return usernameError

  const passwordError = validatePassword(password)
  if (passwordError) return passwordError

  return null
}
