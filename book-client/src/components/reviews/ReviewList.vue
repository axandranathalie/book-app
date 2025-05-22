<!-- components/reviews/ReviewList.vue -->
<script setup lang="ts">
/**
 * ReviewList - Loads and displays a list of reviews for a book.
 */
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import StarRating from '@/components/reviews/StarRating.vue'

const { API_URL } = useApi()

interface Review {
  _id: string
  rating: number
  created_at: string
  name: string
  content: string
}

const props = defineProps<{
  bookId: string
}>()

const reviews = ref<Review[]>([])

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/reviews/book/${props.bookId}`)
    if (!res.ok) throw new Error('Failed to fetch reviews')
    reviews.value = await res.json()
  } catch (error) {
    console.error('Error fetching reviews:', error)
  }
})

/**
 * Format date string to Swedish locale.
 */
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('sv-SE')
}
</script>

<template>
  <div class="review">
    <h2 id="reviews-title" class="review__title">Reviews from readers</h2>

    <div class="review__list" role="list" :aria-labelledby="'reviews-title'">
      <div v-if="reviews.length === 0" class="review__empty">No reviews</div>

      <div v-for="review in reviews" :key="review._id" class="review__card" role="listitem">
        <div class="review__header">
          <StarRating :rating="review.rating" />
          <time class="review__date" :datetime="review.created_at">
            {{ formatDate(review.created_at) }}
          </time>
        </div>

        <strong class="review__name">{{ review.name }}</strong>
        <p class="review__content">{{ review.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.review {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__title {
    font-size: fn-rem(32);
    margin: fn-rem(20) 0;
    text-align: center;
  }

  &__list {
    margin-top: fn-rem(32);
    width: 100%;
    max-width: fn-rem(600);
  }

  &__empty {
    text-align: center;
    font-style: italic;
    padding: fn-rem(32) 0;
  }

  &__card {
    padding: fn-rem(24) fn-rem(16);
    margin-bottom: fn-rem(24);
    border-radius: fn-rem(8);
    text-align: left;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: fn-rem(24);
    margin-bottom: fn-rem(8);
  }

  &__date {
    font-size: fn-rem(12.8);
    white-space: nowrap;
  }

  &__name {
    display: block;
    font-weight: bold;
    margin-bottom: fn-rem(4);
  }

  &__content {
    margin: 0;
    font-size: fn-rem(16);
    line-height: 1.4;
  }
}
</style>
