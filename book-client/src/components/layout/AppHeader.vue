<!-- components/layout/AppHeader.vue -->
<script setup lang="ts">
/**
 * AppHeader.vue
 *
 * Main header component displayed across all pages.
 * - Shows brand logo and authentication button
 * - Renders different nav links depending on user type:
 *   - Visitor: "Books"
 *   - Logged-in User: "Books", "Logout"
 *   - Admin: "Books", "Logout"
 *
 * Uses `useAuthStore()` to determine login and admin state.
 */
import { useAuthStore } from '@/stores/auth'
import BrandLogo from '@/components/global/BrandLogo.vue'
import AuthButton from '@/components/global/AuthButton.vue'
import LogoutButton from '@/components/global/LogoutButton.vue'
import NavLink from '@/components/global/NavLink.vue'
import { useLogout } from '@/composables/useLogout'

const auth = useAuthStore()
const { handleLogout, loading } = useLogout()
</script>

<template>
  <header class="header" role="banner">
    <div class="header__app">
      <BrandLogo variant="header" link />
      <AuthButton />
    </div>

    <h1 class="header__title">Welcome to Peach Pages</h1>
    <div class="header__nav-wrap">
      <nav
        class="header__nav"
        :aria-label="
          auth.isAdmin
            ? 'Admin navigation'
            : auth.isLoggedIn
              ? 'User navigation'
              : 'Visitor navigation'
        "
      >
        <!-- Visitor nav -->
        <template v-if="!auth.isLoggedIn">
          <NavLink :to="{ name: 'books' }" label="Books" />
        </template>

        <!-- User nav -->
        <template v-else-if="auth.isLoggedIn && !auth.isAdmin">
          <NavLink :to="{ name: 'books' }" label="Books" />
          <LogoutButton :onClick="handleLogout" :loading="loading" />
        </template>

        <!-- Admin nav -->
        <template v-else-if="auth.isLoggedIn && auth.isAdmin">
          <NavLink :to="{ name: 'books' }" label="Books" />
          <LogoutButton :onClick="handleLogout" :loading="loading" />
        </template>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color: var(--color-header-bg);
  color: var(--color-header-text);

  &__app {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0.5rem 1rem;
  }

  &__title {
    @include mix-visually-hidden();
  }

  &__nav-wrap {
    margin-top: 0.5rem;
    background-color: var(--color-nav-bg);
    color: var(--color-text-dark);
  }

  &__nav {
    width: 100%;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding: 0.5rem 1rem;
  }
}
</style>
