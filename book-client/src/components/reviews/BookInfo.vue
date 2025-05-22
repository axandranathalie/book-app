<script setup lang="ts">
/**
 * BookInfo - Shows book metadata and average rating.
 */
import StarRating from '@/components/reviews/StarRating.vue'

const { title, author, published_year, rating, description } = defineProps<{
  title: string
  author: string
  published_year: number
  rating: number
  description: string
}>()
</script>

<template>
  <div class="info">
    <h2 class="info__title">{{ title }}</h2>
    <p class="info__author-published">
      <span>Author: {{ author }}</span>
      <span>Published: {{ published_year }}</span>
    </p>
    <div class="info__rating">
      <StarRating :rating="rating" />
    </div>

    <p class="info__description">{{ description }}</p>
  </div>
</template>

<style scoped lang="scss">
.info {
  width: 100%;
  margin: 0;
  text-align: center;

  &__rating {
    padding-bottom: fn-rem(32);
  }

  &__title {
    font-size: fn-rem(24);
    margin-bottom: fn-rem(16);

    @include mix-media(tablet) {
      font-size: fn-rem(28.8);
    }

    @include mix-media(laptop) {
      font-size: fn-rem(35.2);
    }
  }

  &__author-published {
    font-size: fn-rem(14.4);
    margin-bottom: fn-rem(16);

    span {
      display: block;
      margin-bottom: fn-rem(8);
    }
  }

  &__description {
    font-size: fn-rem(16);
    line-height: 1.6;
    text-align: center;
    max-width: 65ch;
    margin: 0 auto fn-rem(24);
    hyphens: auto;
    word-break: break-word;

    @include mix-media(tablet) {
      font-size: fn-rem(17.6);
    }

    @include mix-media(laptop) {
      font-size: fn-rem(19.2);
    }
  }
}
</style>
