<!-- components/atoms/BaseAction.vue -->
<script setup lang="ts">
/**
 * ActionButton - Renders a button, anchor, or router-link.
 * Props:
 * - `as`: defines the tag type ('button', 'a', or 'router-link')
 * - `type`: button type if rendered as <button>
 * - `href`: external URL if rendered as <a>
 * - `to`: internal route if rendered as <router-link>
 * - `label`: text inside the button
 * - `variant`: styling variant (primary or secondary)
 * - `disabled`: disabled state (only for button)
 */
import { RouterLink, type RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  as?: 'button' | 'a' | 'router-link'
  type?: 'button' | 'submit' | 'reset'
  href?: string
  to?: string | RouteLocationRaw
  label: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}>()

const isButton = props.as === 'button' || !props.as
const isLink = props.as === 'a'
const isRouterLink = props.as === 'router-link'
</script>

<template>
  <component
    :is="isRouterLink ? RouterLink : as || 'button'"
    :type="isButton ? type || 'button' : undefined"
    :href="isLink ? href : undefined"
    :to="isRouterLink ? to : undefined"
    :disabled="isButton ? disabled : undefined"
    :class="['action', variant]"
    role="button"
  >
    <span>{{ label }}</span>
  </component>
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

.action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 3rem;
  height: 3rem;
  min-height: 3rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  text-decoration: none;

  font-family: var(--font-secondary);
  font-weight: var(--font-semibold);
  font-size: fn-rem(20);
  letter-spacing: 0.05rem;
  text-transform: uppercase;

  transition:
    transform 0.2s ease,
    filter 0.2s ease,
    background-color 0.2s ease;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease;
  }

  &:hover,
  &:focus {
    transform: scale(1.1);
  }

  &:hover span,
  &:focus span {
    transform: scale(1.1);
  }

  &:active {
    animation: shrink 120ms ease-in-out;
  }

  &:focus-visible {
    outline: 2px solid var(--color-action-focus-outline, white);
    outline-offset: 0.2rem;
  }

  &:disabled {
    background-color: var(--color-action-disabled);
    color: var(--color-black);
  }

  &.primary {
    background-color: var(--color-action-primary);
    color: var(--color-text-dark);

    &:hover {
      background-color: var(--color-action-primary-hover);
    }

    &:focus-visible {
      background-color: var(--color-action-primary-hover);
      outline-color: var(--color-action-primary-focus);
    }
  }

  &.secondary {
    background-color: var(--color-action-secondary);
    color: var(--color-text-light);

    &:hover {
      background-color: var(--color-action-secondary-hover);
    }

    &:focus-visible {
      background-color: var(--color-action-secondary-hover);
      outline-color: var(--color-action-secondary-focus);
    }
  }
}
</style>
