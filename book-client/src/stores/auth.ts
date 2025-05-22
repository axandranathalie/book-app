import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    /** JSON Web Token (JWT) for authenticated session */
    token: null as string | null,

    /** Indicates whether the user has admin privileges */
    isAdmin: false,
  }),

  getters: {
    /**
     * Indicates whether a user is logged in
     * @returns {boolean}
     */
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    /**
     * Attempts to log in a user using provided credentials.
     * On success, stores token and admin status in state and localStorage.
     *
     * @param username - The user's username
     * @param password - The user's password
     * @throws {Error} if login fails
     */
    async login(username: string, password: string) {
      // console.log('🔐 Login attempt:', { username })

      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username, password }),
        })

        // console.log('🌐 Response status:', response.status)
        const data = await response.json()
        // console.log('📦 Response data:', data)

        if (!response.ok) throw new Error(data.error || 'Login failed')

        this.token = data.token
        this.isAdmin = this.decodeIsAdminFromToken(data.token)

        // console.log('✅ Login success:', {
        //   token: this.token,
        //   isAdmin: this.isAdmin,
        // })

        localStorage.setItem('token', data.token)
      } catch (err: any) {
        // console.error('❌ Login failed:', err.message)
        throw err
      }
    },

    /**
     * Logs out the current user by clearing token and state.
     * Sends logout request to backend and removes token from localStorage.
     */
    logout() {
      // console.log('🚪 Logging out...')

      fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      }).catch((err) => {
        // console.error('⚠️ Logout error:', err)
      })

      this.token = null
      this.isAdmin = false
      localStorage.removeItem('token')

      // console.log('✅ Logout complete. Token cleared.')
    },

    /**
     * Decodes JWT token and extracts is_admin flag.
     *
     * @param token - A valid JWT string
     * @returns {boolean} True if user is admin, otherwise false
     */
    decodeIsAdminFromToken(token: string): boolean {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        // console.log('🧠 Decoded token payload:', payload)
        return payload.is_admin === true
      } catch (err) {
        // console.error('❌ Failed to decode token:', err)
        return false
      }
    },

    /**
     * Attempts to restore session by reading token from localStorage.
     * If found, updates token and isAdmin in store.
     */
    restoreSession() {
      const storedToken = localStorage.getItem('token')
      // console.log('🔁 Trying to restore session...')

      if (storedToken) {
        this.token = storedToken
        this.isAdmin = this.decodeIsAdminFromToken(storedToken)

        // console.log('✅ Session restored:', {
        //   token: this.token,
        //   isAdmin: this.isAdmin,
        // })
      } else {
        // console.log('ℹ️ No token found in localStorage.')
      }
    },

    /**
     * Fake login method for local development only.
     * Sets a mock token and admin status manually.
     *
     * @param asAdmin - If true, sets isAdmin to true
     */
    fakeLogin(asAdmin: boolean) {
      // console.log(`🧪 Fake login as ${asAdmin ? 'admin' : 'user'}`)

      this.token = 'mock.token.value'
      this.isAdmin = asAdmin
      localStorage.setItem('token', this.token)

      // console.log('✅ Fake login complete.', {
      //   token: this.token,
      //   isAdmin: this.isAdmin,
      // })
    },
  },
})
