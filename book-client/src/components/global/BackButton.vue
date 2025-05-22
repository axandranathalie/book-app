<!-- components/atoms/BackButton.vue -->
<script setup lang="ts">
/**
 * BackButton - Navigates back in history when clicked.
 */
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.back()
</script>

<template>
  <button @click="goBack" class="backbutton">⬅ Back</button>
</template>

<style scoped lang="scss">
.backbutton {
  margin-top: 2rem;
  @include mix-flex-center();
  background: transparent;
  border: none;
  padding-inline: fn-rem(15);
  line-height: fn-rem(40);
  min-height: fn-rem(48);
  font-size: 1.5rem;
  cursor: pointer;

  transition:
    font-size 0.2s ease,
    background-color 0.2s ease,
    border-radius 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-radius: 0.5rem;
    font-size: 1.55rem;
    background-color: var(--color-action-primary-hover);
    transform: scale(1.05);
  }

  &:focus-visible {
    border-radius: 0.5rem;
    outline-offset: 0.2rem;
    transform: scale(1.05);
    background-color: var(--color-action-primary-hover);
    outline: 2px solid var(--color-action-primary-focus);
  }

  &:active {
    animation: shrink 120ms ease-in-out;
  }

  @include mix-media(laptop) {
    font-size: 2rem;

    &:hover {
      font-size: 2.05rem;
    }
  }
}

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
</style>
