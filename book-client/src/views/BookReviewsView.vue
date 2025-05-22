<!-- src/views/ReviewPage.vue -->
<script setup lang="ts">
/**
 * ReviewPage.vue
 *
 * Displays a book with metadata and allows submitting/viewing reviews.
 */
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import BookHeader from '@/components/reviews/BookHeader.vue'
import BookInfo from '@/components/reviews/BookInfo.vue'
import ReviewForm from '@/components/reviews/ReviewForm.vue'
import ReviewList from '@/components/reviews/ReviewList.vue'
import BackButton from '@/components/global/BackButton.vue'

const route = useRoute()
const bookId = route.params.id
const API_URL = import.meta.env.VITE_API_URL

const book = ref({
  _id: '',
  title: '',
  author: '',
  genres: [] as string[],
  image: '',
  description: '',
  rating: 0,
  published_year: 0,
  averageRating: 0,
})

const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/books/${bookId}`)
    if (!res.ok) throw new Error('Book could not be fetched')
    book.value = await res.json()
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="reviewpage">
    <div v-if="loading">Loading...</div>

    <div class="reviewpage__header">
      <div class="reviewpage__header-inner">
        <BackButton @click="$router.push('/bookshelf')" />
        <p class="reviewpage__genre">{{ book.genres?.join(', ') || 'Genre not available' }}</p>
      </div>
    </div>

    <div v-if="book.title" class="reviewpage__book">
      <BookHeader :image="book.image" :title="book.title" :genres="book.genres" />
      <BookInfo
        :title="book.title"
        :author="book.author"
        :published_year="book.published_year"
        :rating="book.averageRating ?? 0"
        :description="book.description"
      />
    </div>

    <div v-if="book._id" class="reviewpage__review">
      <ReviewForm :bookId="book._id" />
      <ReviewList :bookId="book._id" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.reviewpage {
  @include mix-flex-center(column);
  width: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 fn-rem(16);
    max-width: fn-rem(1440);
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  &__header-inner {
    max-width: fn-rem(1100);
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-left: fn-rem(16);
    padding-right: fn-rem(16);
    box-sizing: border-box;
  }

  &__genre {
    font-weight: var(--font-weight-semibold);
    margin-top: 2rem;
  }

  &__book {
    @include mix-flex-center(column);
    padding: fn-rem(48);
    max-width: fn-rem(1100);
    width: 100%;
    margin: 0 auto;
    padding-left: fn-rem(16);
    padding-right: fn-rem(16);

    @include mix-media(laptop) {
      display: grid;
      text-align: left;
      grid-template-columns: repeat(8, 1fr);
      gap: fn-rem(48);
      align-items: start;

      > :first-child {
        grid-column: 1 / span 3;
      }

      > :nth-child(2) {
        grid-column: 4 / span 4;
      }
    }
  }

  &__review {
    display: flex;
    flex-direction: column;
    gap: fn-rem(32);
    max-width: fn-rem(1100);
    width: 100%;
    margin: 0 auto;
    padding: fn-rem(32) fn-rem(16);

    @include mix-media(desktop) {
      display: grid;
      grid-template-columns: repeat(14, 1fr);
      gap: fn-rem(48);
      align-items: start;

      > :first-child {
        grid-column: 2 / span 4;
      }

      > :nth-child(2) {
        grid-column: 7 / span 6;
      }
    }

    @include mix-media(laptop) {
      display: grid;
      grid-template-columns: repeat(14, 1fr);
      gap: fn-rem(48);
      align-items: start;

      > :first-child {
        grid-column: 2 / span 4;
      }

      > :nth-child(2) {
        grid-column: 7 / span 6;
      }
    }
  }
}
</style>
