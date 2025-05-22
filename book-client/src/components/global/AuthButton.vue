<!-- components/global/AuthButton.vue -->
<script setup lang="ts">
/**
 * AuthButton.vue
 *
 * A navigation button for authentication.
 * - If user is **not logged in**, it links to the login page.
 * - If user **is logged in**, it links to the user account page.
 *
 * Uses `useAuthStore()` to check login status.
 */
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// Reactive state: true if token exists
const isLoggedIn = computed(() => auth.isLoggedIn)
</script>

<template>
  <router-link
    :to="isLoggedIn ? { name: 'user' } : { name: 'login' }"
    class="auth-button"
    :aria-label="isLoggedIn ? 'Go to account' : 'Log in to your account'"
  >
    <span class="material-symbols-outlined auth-button__icon">person</span>
    <span class="auth-button__text">
      {{ isLoggedIn ? 'Account' : 'Log in' }}
    </span>
  </router-link>
</template>

<style scoped lang="scss">
@keyframes shrink {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.auth-button {
  @include mix-flex-center(column);
  min-width: fn-rem(48);
  min-height: fn-rem(48);
  padding: 0.25rem 0.5rem;
  border-radius: fn-rem(4);
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;

  &__icon {
    font-size: fn-rem(25);
    transition: transform 0.2s ease;
  }

  &__text {
    font-size: fn-rem(14);
    @include mix-visually-hidden();

    @include mix-media(mobile) {
      @include mix-unhide;
    }

    @include mix-media(tablet) {
      font-size: fn-rem(16);
    }
  }

  &:hover {
    background-color: var(--color-nav-light);
    color: var(--color-nav-dark);

    .auth-button__icon {
      transform: scale(1.1);
    }

    .auth-button__text {
      transform: scale(1.1);
      font-weight: var(--font-weight-semibold);
    }
  }

  &:focus-visible {
    outline: 1px solid var(--color-nav-light);
    outline-offset: fn-rem(3);
    background-color: var(--color-nav-light);
    color: var(--color-nav-dark);

    .auth-button__icon,
    .auth-button__text {
      transform: scale(1.1);
      font-weight: var(--font-weight-semibold);
    }
  }

  &:active {
    animation: shrink 120ms ease-in-out;
  }
}
</style>
