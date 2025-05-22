<script setup lang="ts">
/**
 * App.vue
 *
 * Root component of the application.
 * - Renders <AppHeader /> globally
 * - Wraps routed views in a <main> tag
 * - Includes placeholder <footer>
 */
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <AppHeader />

  <!-- Routed content -->
  <main class="main">
    <RouterView />
  </main>

  <!-- Global footer (optional) -->
  <footer class="footer">
    <!-- If footer is used, mount globally via index.ts -->
  </footer>
</template>

<style lang="scss">
html {
  background-color: var(--color-background);
  color: var(--color-text-dark);
  font-family: var(--font-primary);
}

.main {
  height: 2000px;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  @include mix-flex-center(column);
}

.footer {
  position: fixed;
  bottom: 0;
}
</style>
