<!-- src/views/BookshelfView.vue -->
<script setup lang="ts">
/**
 * BookshelfView.vue
 *
 * Displays all books as cards with optional navigation.
 */
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'

import BookCard from '@/components/books/BookCard.vue'
import BackButton from '@/components/global/BackButton.vue'
import { useRouter } from 'vue-router'

const { API_URL } = useApi()
const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push({ name: 'home' })
  }
}

export interface Book {
  _id: string
  title: string
  author: string
  genres: string[]
  image: string
  published_year: number
  averageRating: number
  reviews: Array<any>
}

const books = ref<Book[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/books`)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data = await res.json()
    books.value = data
  } catch (error) {
    console.error('Error fetching books:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="books" role="region" aria-labelledby="bookshelf-title">
    <BackButton class="books__return" @click="goBack" />
    <h2 id="bookshelf-title" class="books__title">Bookshelf</h2>

    <div v-if="loading" class="books__status" aria-live="polite">Loading books...</div>

    <div v-else-if="books.length === 0" class="books__status" aria-live="polite">
      Bookshelf is empty.
    </div>

    <div v-else class="books__grid">
      <BookCard class="books__book" v-for="book in books" :key="book._id" :book="book" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.books {
  width: 95%;
  @include mix-flex-center(column);

  @include mix-media(laptop) {
    max-width: 85%;
  }

  @include mix-media(desktop) {
    max-width: 90%;
  }

  &__return {
    margin-right: auto;
  }

  &__title {
    text-transform: uppercase;
    text-align: center;
    font-size: fn-rem(36);
    margin-bottom: fn-rem(16);
    border-bottom: fn-rem(2) solid var(--color-action-primary);
    padding-bottom: fn-rem(24);
    width: 100%;

    @include mix-media(laptop) {
      font-size: fn-rem(48);
    }

    @include mix-media(desktop) {
      font-size: fn-rem(64);
    }
  }

  &__status {
    font-style: italic;
    text-align: center;
    margin-bottom: fn-rem(16);
  }

  &__grid {
    display: flex;
    flex-direction: column;
    gap: fn-rem(16);
    width: 100%;
    max-width: fn-rem(600);

    @include mix-media(laptop) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: fn-rem(24);
      max-width: 100%;
    }

    @include mix-media(desktop) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
