<!-- components/reviews/ReviewForm.vue -->
<script setup lang="ts">
/**
 * ReviewForm - Form for submitting a new review.
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
import BaseInput from '@/components/global/BaseInput.vue'
import BaseAction from '@/components/global/BaseAction.vue'
import StarRating from '@/components/reviews/StarRating.vue'

const { API_URL } = useApi()

const props = defineProps<{
  bookId: string
}>()

const name = ref('')
const content = ref('')
const rating = ref(0)
const hoverRating = ref(0)
const router = useRouter()

const setRating = (n: number) => {
  rating.value = n
}

const setHover = (n: number) => {
  hoverRating.value = n
}

const clearHover = () => {
  hoverRating.value = 0
}

/**
 * Submit review and reload page on success.
 */
const submitReview = async () => {
  const review = {
    name: name.value,
    content: content.value,
    rating: rating.value,
    book: props.bookId,
  }

  try {
    await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    })

    name.value = ''
    content.value = ''
    rating.value = 0
    router.go(0)
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<template>
  <div class="reviewform">
    <h2 class="reviewform__title" id="review-title">Reviews & rating</h2>

    <form @submit.prevent="submitReview" class="reviewform__form" aria-labelledby="review-title">
      <BaseInput
        id="name"
        name="Name"
        v-model="name"
        placeholder="Your name"
        info="Enter your name"
        :center-label="true"
        :validate="(val) => (val.length < 2 ? 'Name too short' : null)"
      />

      <BaseInput
        id="content"
        name="Review"
        v-model="content"
        type="textarea"
        placeholder="Write your review"
        info="At least 2 characters"
        :center-label="true"
        :validate="(val) => (val.length < 2 ? 'Review too short' : null)"
      />

      <div class="reviewform__label" id="rating-label">Your rating:</div>
      <div class="reviewform__stars" role="radiogroup" :aria-labelledby="'rating-label'">
        <StarRating v-model:rating="rating" :interactive="true" />
      </div>

      <BaseAction label="Send" variant="primary" type="submit" />
    </form>
  </div>
</template>

<style scoped lang="scss">
.reviewform {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  &__title {
    font-size: fn-rem(32);
    margin: fn-rem(20) 0 fn-rem(70);
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: fn-rem(24);
    width: 100%;
    align-items: center;

    @include mix-media(desktop) {
      max-width: 100%;
      padding: 0 fn-rem(32);
    }

    .inputfield {
      width: 100%;
      max-width: fn-rem(350);
    }

    .inputfield__field {
      max-width: 100%;
    }

    button,
    .base-action {
      max-width: fn-rem(200);
      width: 100%;
      align-self: center;
      margin-bottom: fn-rem(20);
    }
  }

  &__label {
    font-size: fn-rem(18);
    font-weight: 600;
    text-align: center;
  }

  &__stars {
    display: flex;
    justify-content: center;
    gap: fn-rem(8);
  }
}
</style>
