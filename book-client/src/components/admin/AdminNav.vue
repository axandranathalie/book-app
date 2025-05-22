<script setup lang="ts">
import NavLink from '@/components/global/NavLink.vue'
import LogoutButton from '@/components/global/LogoutButton.vue'
import { useLogout } from '@/composables/UseLogout'

const { handleLogout, loading } = useLogout()
</script>

<template>
  <nav class="nav-view admin-nav">
    <NavLink :to="{ name: 'books' }" label="Books" />
    <LogoutButton :onClick="handleLogout" :loading="loading" />
  </nav>
</template>

<style scoped lang="scss">
.nav-view {
  @include mix-flex-center(1rem);
  justify-content: flex-end;
  width: 100%;
  max-width: 1150px;
  padding: 0.5rem 1rem;
}
</style>
