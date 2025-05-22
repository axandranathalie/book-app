<!-- src/views/AccountView.vue -->
<script setup lang="ts">
/**
 * AccountView.vue
 *
 * Placeholder wrapper for authenticated user routes.
 * Renders child routes using <router-view>.
 */
</script>

<template>
  <section class="account">
    <router-view />
  </section>
</template>

<style scoped lang="scss">
.account {
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  padding: 1rem;
}
</style>
