<!-- src/views/HomeView.vue -->
<script setup lang="ts">
/**
 * HomeView.vue
 *
 * Landing page for the application.
 * Displays logo, value props and CTA.
 */
import ButtonCTA from '@/components/organism/ButtonCta.vue'
import BrandLogo from '@/components/global/BrandLogo.vue'
import HomeInfo from '@/components/home/HomeInfo.vue'
</script>

<template>
  <section class="home">
    <h1 class="home__title">Welcome to Peach Pages</h1>
    <BrandLogo class="home__logo" variant="hero" />
    <HomeInfo class="home__info" />
    <ButtonCTA
      class="home__cta"
      heading="Ready to start building your shelf?"
      :to="{ name: 'register' }"
      label="Create Account"
    />
  </section>
</template>

<style scoped lang="scss">
.home {
  @include mix-flex-center(column);

  &__title {
    @include mix-visually-hidden();
  }

  &__info {
    margin-top: fn-rem(-40);

    @include mix-media(mobile) {
      margin-top: fn-rem(-55);
    }

    @include mix-media(tablet) {
      margin-top: fn-rem(-70);
    }
  }

  &__cta {
    margin-top: 0;
  }
}
</style>
