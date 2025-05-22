<!-- components/reviews/StarRating.vue -->
<script setup lang="ts">
/**
 * StarRating - Interactive or static star-based rating component.
 */
import { ref } from 'vue'

const props = defineProps<{
  rating: number
  interactive?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:rating', value: number): void
}>()

const hoverRating = ref(0)

const setHover = (value: number) => {
  if (props.interactive) hoverRating.value = value
}

const clearHover = () => {
  if (props.interactive) hoverRating.value = 0
}

const setRating = (value: number) => {
  if (props.interactive) emit('update:rating', value)
}
</script>

<template>
  <div
    class="starrating"
    :class="{ interactive: interactive }"
    :role="interactive ? 'radiogroup' : undefined"
    aria-label="Rating"
  >
    <span
      v-for="n in 5"
      :key="n"
      class="starrating__star"
      :class="{
        filled: n <= Math.floor(hoverRating || rating),
        half: n > Math.floor(hoverRating || rating) && n - 0.5 <= (hoverRating || rating),
      }"
      :role="interactive ? 'radio' : undefined"
      :aria-checked="interactive ? rating === n : undefined"
      :tabindex="interactive ? 0 : -1"
      :aria-label="`${n} out of 5 stars`"
      @click="setRating(n)"
      @mouseover="setHover(n)"
      @mouseleave="clearHover"
      @keydown.enter.prevent="setRating(n)"
      @keydown.space.prevent="setRating(n)"
    >
      ★
    </span>
  </div>
</template>

<style scoped lang="scss">
.starrating {
  display: flex;
  gap: fn-rem(5);
  font-size: fn-rem(24);
  justify-content: center;

  &__star {
    color: var(--color-ratingstar-empty);
    transition: color 0.2s;
  }

  &.interactive &__star {
    cursor: pointer;

    &:hover {
      filter: brightness(1.2);
    }
  }

  .filled {
    color: var(--color-ratingstar-filled);
  }
}
</style>
s
