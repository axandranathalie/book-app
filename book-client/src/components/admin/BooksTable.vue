<!-- components/admin/BooksTable.vue -->
<script setup lang="ts">
/**
 * BooksTable - Fetches and displays all books in a table.
 */
import { ref, onMounted, computed } from 'vue'
import { useApi } from '@/composables/useApi'
import BaseTable from '@/components/admin/BaseTable.vue'

interface Book {
  _id: string
  title: string
  author: string
  genres: string[] | string
  created_at: string
}

const { API_URL } = useApi()
const books = ref<Book[]>([])

/**
 * Fetch books from the API and populate the books ref.
 */
const fetchBooks = async () => {
  try {
    const res = await fetch(`${API_URL}/books`)
    const raw = await res.json()
    books.value = raw
  } catch (err) {
    console.error('Failed to fetch books:', err)
  }
}

onMounted(fetchBooks)

const columns = [
  { label: 'Title', key: 'title', breakable: true },
  { label: 'Author', key: 'author', breakable: true },
  { label: 'Genres', key: 'genres', breakable: true },
  { label: 'Created at', key: 'createdAt' },
]

/**
 * Format genres for display if they are arrays.
 */
const formattedBooks = computed(() =>
  books.value.map((book) => ({
    ...book,
    genres: Array.isArray(book.genres) ? book.genres.join(', ') : book.genres,
  })),
)
</script>

<template>
  <section class="booktable">
    <h2>Manage books</h2>
    <BaseTable :columns="columns" :items="formattedBooks" rowKey="_id" />
  </section>
</template>

<style scoped lang="scss">
.booktable {
  min-width: 300px;
  margin: 0 auto;

  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}
</style>
