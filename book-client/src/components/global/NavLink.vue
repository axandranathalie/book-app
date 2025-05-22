<!-- components/global/NavLink.vue -->
<script setup lang="ts">
/**
 * NavLink.vue
 *
 * A reusable navigation link with an accessible label.
 * Props:
 * - `to`: Route destination (name/path).
 * - `label`: Link text and ARIA label.
 */

import { RouterLink, type RouteLocationRaw } from 'vue-router'

defineProps<{
  to: RouteLocationRaw
  label: string
}>()
</script>

<template>
  <RouterLink :to="to" class="navlink" :aria-label="label">
    <span class="navlink__label">{{ label }}</span>
  </RouterLink>
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

.navlink {
  border-radius: fn-rem(4);
  outline: none;
  min-width: fn-rem(48);
  min-height: fn-rem(48);
  padding: 0.1rem 0.5rem;
  @include mix-flex-center();
  text-transform: uppercase;
  transition:
    transform 0.2s ease,
    filter 0.2s ease,
    background-color 0.2s ease;

  &__label {
    font-size: fn-rem(14);
    transition: transform 0.2s ease;
  }
}

.active {
  background-color: var(--color-header-link-light);
  color: var(--color-header-link-dark);
  animation: shrink 120ms ease-in-out;

  .navlink__label {
    animation: shrink 120ms ease-in-out;
    font-weight: var(--font-weight-semibold);
  }
}

.navlink:focus-visible {
  outline-offset: 0.2rem;
  outline: 1px solid var(--color-nav-light);
  background-color: var(--color-nav-light);
  color: var(--color-nav-dark);

  .navlink__label {
    font-weight: var(--font-weight-semibold);
    transform: scale(1.1);
  }
}

.navlink:hover {
  background-color: var(--color-nav-light);
  color: var(--color-nav-dark);

  .navlink__label {
    font-weight: var(--font-weight-semibold);
    transform: scale(1.1);
  }
}
</style>
