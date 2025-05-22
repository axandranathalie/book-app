<!-- components/admin/UsersTable.vue -->
<script setup lang="ts">
/**
 * UsersTable - Fetches and displays user accounts in a table.
 */
import { ref, onMounted, computed } from 'vue'
import { useApi } from '@/composables/useApi'
import BaseTable from '@/components/admin/BaseTable.vue'
import type { IUser } from '@/types/IUser'

const { API_URL } = useApi()
const users = ref<IUser[]>([])

/**
 * Fetch users from the API and populate the users ref.
 */
const fetchUsers = async () => {
  try {
    const res = await fetch(`${API_URL}/users`)
    const raw = await res.json()
    users.value = raw
  } catch (err) {
    console.error('Failed to fetch users:', err)
  }
}

onMounted(fetchUsers)

const columns = [
  { label: 'Username', key: 'username' },
  { label: 'Password', key: 'password', breakable: true },
  { label: 'Role', key: 'role' },
  { label: 'Created', key: 'created_at' },
]

/**
 * Mask passwords for display.
 */
const maskedUsers = computed(() =>
  users.value.map((user) => ({
    ...user,
    password: '******',
  })),
)
</script>

<template>
  <section class="usertable">
    <h2>Manage users</h2>
    <BaseTable :columns="columns" :items="users" rowKey="id" />
  </section>
</template>

<style scoped lang="scss">
.usertable {
  min-width: 300px;
  margin: 0 auto;

  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}
</style>
