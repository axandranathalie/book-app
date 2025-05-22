<!-- components/global/LogoutButton.vue -->
<script setup lang="ts">
/**
 * LogoutButton.vue
 *
 * A styled button component for logging out.
 * Props:
 * - `onClick`: Function to call on logout.
 * - `loading`: Optional boolean to disable button during logout process.
 */

defineProps<{
  onClick: () => void
  loading?: boolean
}>()
</script>

<template>
  <button class="logout-button" @click="$props.onClick()" :disabled="loading" aria-label="Log out">
    <span class="logout-button__label">Log out</span>
  </button>
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

.logout-button {
  border-radius: fn-rem(4);
  outline: none;
  min-width: fn-rem(48);
  min-height: fn-rem(48);
  padding: 0.1rem 0.5rem;
  @include mix-flex-center();
  text-transform: uppercase;
  font-size: fn-rem(14);
  font-family: var(--font-secondary);
  font-weight: var(--font-weight-regular);
  background: transparent;
  color: inherit;
  border: none;
  cursor: pointer;

  transition:
    transform 0.2s ease,
    filter 0.2s ease,
    background-color 0.2s ease;

  &__label {
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: var(--color-nav-light);
    color: var(--color-nav-dark);

    .logout-button__label {
      font-weight: var(--font-weight-semibold);
      transform: scale(1.1);
    }
  }

  &:focus-visible {
    outline: 1px solid var(--color-nav-light);
    outline-offset: fn-rem(3);
    background-color: var(--color-nav-light);
    color: var(--color-nav-dark);

    .logout-button__label {
      font-weight: var(--font-weight-semibold);
      transform: scale(1.1);
    }
  }

  &:active {
    animation: shrink 120ms ease-in-out;
  }

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
