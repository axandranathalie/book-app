// Import global styles
import '@/scss/style.scss'

// Import Vue core and state management
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Import root component and router
import App from '@/App.vue'
import router from '@/router'

// Import and initialize the authentication store
import { useAuthStore } from '@/stores/auth'

// Create the Vue application instance
const app = createApp(App)

// Create and use Pinia
const pinia = createPinia()
app.use(pinia)

// Use the router
app.use(router)

// Restore session
const auth = useAuthStore()
auth.restoreSession()

// Mount app
app.mount('#app')
