<!-- components/global/BrandLogo.vue -->
<script setup lang="ts">
/**
 * BrandLogo.vue
 *
 * A reusable logo component used in hero and header sections.
 * Props:
 * - `variant`: 'hero' | 'header' – Determines size and image.
 * - `link`: boolean – If true, wraps logo in a <RouterLink> to home.
 */
import { RouterLink } from 'vue-router'

const props = defineProps<{
  variant: 'hero' | 'header'
  link?: boolean
}>()

const logoSrc =
  props.variant === 'hero'
    ? new URL('@/assets/logotype/logotype-large-dark.svg', import.meta.url).href
    : new URL('@/assets/logotype/logotype-small-dark.svg', import.meta.url).href

const altText =
  props.variant === 'hero'
    ? 'Peach Pages logo with slogan "review the book, not just the story"'
    : 'Peach Pages text with an open book'
</script>

<template>
  <component
    :is="link ? RouterLink : 'div'"
    :to="link ? { name: 'home' } : undefined"
    :aria-label="link ? 'Go to homepage' : undefined"
    class="brand-logo"
    :class="`brand-logo--${variant}`"
  >
    <img :src="logoSrc" :alt="altText" class="brand-logo__img" loading="lazy" />
  </component>
</template>

<style scoped lang="scss">
.brand-logo {
  display: block;

  &--hero {
    object-fit: contain;
    width: 100%;
    height: auto;
    min-width: fn-rem(250);
    max-width: fn-rem(450);
    padding: 1rem;
  }

  &--header {
    height: 100%;
    width: 100%;
    max-width: fn-rem(280);
    aspect-ratio: 13 / 4;
    border-radius: 0.25rem;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }

    &:focus-visible {
      outline: 1px solid var(--color-logo);
      outline-offset: fn-rem(3);
      transform: scale(1.05);
      animation: shrink 120ms ease-in-out;
    }
  }

  &__img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
</style>
