// @/composables/useLogin.ts

import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

/**
 * useLogin
 *
 * Handles user login using a reactive state object.
 * - Calls the auth store to perform login
 * - Tracks loading, error, and success state
 * - Redirects based on user role (admin or user)
 */
export function useLogin() {
  const authStore = useAuthStore()
  const router = useRouter()

  const state = reactive({
    error: '',
    success: false,
    loading: false,
  })

  async function loginWithCredentials(username: string, password: string) {
    state.error = ''
    state.success = false
    state.loading = true

    try {
      await authStore.login(username, password)
      state.success = true

      // ➡️ Redirect based on role
      if (authStore.isAdmin) {
        router.push({ name: 'admin' })
      } else {
        router.push({ name: 'user' })
      }
    } catch (error: unknown) {
      if (typeof error === 'string') {
        state.error = error
      } else if (error instanceof Error) {
        state.error = error.message
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        state.error = String((error as any).message)
      } else {
        state.error = 'An unexpected error occurred during login.'
      }
    } finally {
      state.loading = false
    }
  }

  return {
    ...state,
    loginWithCredentials,
  }
}
