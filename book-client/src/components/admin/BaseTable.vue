<!-- components/admin/BaseTable.vue -->
<script setup lang="ts">
/**
 * BaseTable - Generic reusable table for listing data with dynamic columns.
 *
 * @prop columns - Defines column headers and keys
 * @prop items - Array of data rows to render
 * @prop rowKey - Property to use for :key in rows (e.g. 'id')
 */
defineProps<{
  columns: { label: string; key: string; breakable?: boolean }[]
  items: any[]
  rowKey: string
}>()
</script>

<template>
  <table class="table">
    <thead class="table__head">
      <tr class="table__row table__row--head">
        <th v-for="col in columns" :key="col.key" class="table__cell table__cell--head">
          {{ col.label }}
        </th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr v-for="item in items" :key="item[rowKey]" class="table__row">
        <td
          v-for="col in columns"
          :key="col.key"
          :class="['table__cell', { 'table__cell--breakable': col.breakable }]"
        >
          <span class="table__label" aria-hidden="true">
            {{ col.label }}
          </span>
          <span class="table__value">
            {{ item[col.key] }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  font-size: 1rem;
  border: 2px solid #ffdfd1;

  &__head {
    background-color: #fab89e;
  }

  &__row--head {
    font-weight: bold;
  }

  &__cell {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #ffdfd1;
    text-align: left;

    &--breakable .table__value {
      white-space: normal;
      word-break: break-word;
    }
  }

  &__label {
    display: none;
  }

  &__value {
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    &__head {
      display: none;
    }

    &__body,
    &__row,
    &__cell {
      display: block;
      width: 100%;
    }

    &__row {
      margin-bottom: 1rem;
      border: 1px solid #ffdfd1;
      border-radius: 0.5rem;
      background: #fff;
      padding: 0.5rem;
    }

    &__cell {
      display: flex;
      align-items: start;
      justify-content: space-evenly;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border: none;
      border-bottom: 1px solid #ffdfd1;
    }

    &__label {
      display: block;
      width: 35%;
      max-width: 200px;
      text-align: end;
      font-weight: bold;
      color: #555;
      margin-bottom: 0.25rem;
    }

    &__value {
      width: 75%;
    }
  }
}
</style>
