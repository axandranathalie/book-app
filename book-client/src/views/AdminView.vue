<!-- src/views/AdminView.vue -->
<script setup lang="ts">
/**
 * AdminView.vue
 *
 * Displays admin dashboard with book/user management tools.
 */
import AddNewBook from '@/components/admin/AddNewBook.vue'
import BooksTable from '@/components/admin/BooksTable.vue'
import UsersTable from '@/components/admin/UsersTable.vue'
</script>

<template>
  <section class="admin" role="main" aria-labelledby="adminview-title">
    <h2 class="admin__title">Admin dashboard</h2>

    <div class="admin__intro">
      <h3 class="admin__heading">Welcome back!</h3>
      <p class="admin__text">This page is under construction</p>
    </div>
    <div class="admin__board">
      <UsersTable class="admin__panel" />
      <BooksTable class="admin__panel" />
      <AddNewBook class="admin__panel" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.admin {
  width: 100%;
  max-width: 1050px;
  @include mix-flex-center(column, 2rem);
  min-height: 100dvh;
  padding: 1rem 0;

  &__intro {
    text-align: center;
  }

  &__title {
    @include mix-visually-hidden();
  }
  &__board {
    background-color: var(--color-background-darker);
    padding: 3rem 1rem;
    border-radius: 0.5rem;
    @include mix-flex-center(column, 2rem);
    width: 100%;
    max-width: 1200px;
  }

  &__panel {
    background-color: var(--color-background);
    border-radius: 0.5rem;
    width: 100%;
    padding: 1rem;
  }

  &__heading {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  &__text {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>
