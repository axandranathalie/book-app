<!-- components/home/HomeInfo.vue -->
<script setup lang="ts">
/**
 * HomeInfo - Lists features/benefits on the home page.
 * Used in HomeView.
 */
import InfoItem from '@/components/home/InfoItem.vue'

const listData = [
  'Build your virtual bookshelf',
  'Leave honest reviews',
  'Discover hidden gems',
  'Join a growing reader community',
]
</script>

<template>
  <div class="info">
    <p class="info__text">
      Explore bookshelves, rate stories, and discover new reads through a cozy review community.
    </p>

    <ul class="info__list" role="list">
      <InfoItem v-for="(item, index) in listData" :key="index" :listinfo="item" />
    </ul>
  </div>
</template>

<style scoped lang="scss">
.info {
  @include mix-flex-center(column, 1rem);
  max-width: fn-rem(320);
  padding: 0.5rem;

  @include mix-media(mobile) {
    max-width: fn-rem(450);
    padding: 1rem;
  }

  @include mix-media(tablet) {
    max-width: fn-rem(500);
    padding: 1.5rem;
  }

  &__text {
    font-size: fn-rem(17);
    padding-bottom: 0.5rem;

    @include mix-media(mobile) {
      font-size: fn-rem(18);
    }

    @include mix-media(tablet) {
      font-size: fn-rem(19);
    }
  }

  &__list {
    align-self: center;
    max-width: 85%;
  }
}
</style>
