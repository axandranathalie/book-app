<!-- components/reviews/BookHeader.vue -->
<script setup lang="ts">
/**
 * BookHeader - Displays the book cover and title.
 */
const props = defineProps<{
  image: string
  title: string
}>()
</script>
<template>
  <div class="bookheader">
    <img :src="image" :alt="`Cover of the book ${title}`" class="bookheader__cover" />
  </div>
</template>

<style scoped lang="scss">
.bookheader {
  @include mix-flex-center();
  width: 90%;
  max-width: 300px;
  margin: 0 auto;

  &__cover {
    width: 90%;
    height: auto;
    object-fit: contain;
    aspect-ratio: 2 / 3;
    margin-bottom: fn-rem(48);
  }
}
</style>
