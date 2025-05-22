// @/composables/authValidation.ts
export function validateUsername(val: string): string | null {
  const regex = /^[a-z0-9_-]{3,20}$/
  if (!val) return 'Username is required'
  if (!regex.test(val)) return 'Use 3–20 lowercase letters, numbers, - or _'
  return null
}

export function validatePassword(val: string): string | null {
  if (!val) return 'Password is required'
  if (val.length < 8 || val.length > 20) return '8–20 characters required'
  if (!/[A-Z]/.test(val)) return 'Include at least one uppercase letter'
  if (!/[^A-Za-z0-9]/.test(val)) return 'Include at least one special character'
  return null
}
