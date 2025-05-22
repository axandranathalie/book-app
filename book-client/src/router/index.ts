import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/account',
      component: () => import('@/views/AccountView.vue'),
      children: [
        {
          path: '',
          redirect: 'login',
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/components/auth/LoginUser.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/components/auth/RegisterUser.vue'),
        },
        {
          path: 'logout',
          name: 'logout',
          component: () => import('@/components/auth/LogoutUser.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('@/views/BookshelfView.vue'),
    },
    {
      path: '/books/:id',
      name: 'book-review',
      component: () => import('@/views/BookReviewsView.vue'),
      props: true,
    },
  ],
  linkActiveClass: 'active',
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    window.alert('You must be logged in to access this page.')
    return next('/account/login')
  }

  if (to.meta.requiresAdmin && !auth.isAdmin) {
    window.alert('You do not have permission to access that page.')
    return next(from.fullPath)
  }

  next()
})

export default router
