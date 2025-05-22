<!-- src/views/UserView.vue -->
<script setup lang="ts">
/**
 * UserView.vue
 *
 * Placeholder view for user-specific content.
 */
</script>

<template>
  <section class="userview">
    <h2 class="userview__title">User account</h2>
    <h3 class="userview__welcome">Welcome back!</h3>
    <p class="userview__message">This page is under construction</p>
  </section>
</template>

<style scoped lang="scss">
.userview {
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  padding: 2rem;

  &__title {
    @include mix-visually-hidden();
  }

  &__welcome {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  &__message {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>
