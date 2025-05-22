// @/composables/useRegister.ts

import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = import.meta.env.VITE_API_URL

/**
 * useRegister
 *
 * Handles user registration using a reactive state object.
 * - Sends POST request to `${VITE_API_URL}/auth/register`
 * - Tracks loading, error, and success state
 * - On success: alerts and redirects to login page
 */
export function useRegister() {
  const router = useRouter()

  const state = reactive({
    error: '',
    success: false,
    loading: false,
  })

  async function registerWithCredentials(username: string, password: string) {
    state.error = ''
    state.success = false
    state.loading = true

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()
      console.log('➡️ Sending to API:', { username, password }) // ⚠️ DEBUG ONLY

      if (res.status === 409) {
        state.error = data?.error || 'Username already exists.'
        return
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Registration failed.')
      }

      state.success = true

      // ✅ Show success alert and redirect after short delay
      alert('🎉 Successfully registered! Redirecting to login...')
      router.push({ name: 'login' })
    } catch (error: unknown) {
      if (typeof error === 'string') {
        state.error = error
      } else if (error instanceof Error) {
        state.error = error.message
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        state.error = String((error as any).message)
      } else {
        state.error = 'An unexpected error occurred during registration.'
      }
    } finally {
      state.loading = false
    }
  }

  return {
    ...state,
    registerWithCredentials,
  }
}
