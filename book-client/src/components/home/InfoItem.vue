<!-- components/home/InfoItem.vue -->
<script setup lang="ts">
/**
 * InfoItem.vue
 *
 * Displays a single info item in a list, with icon and text.
 */
import iconSrc from '@/assets/icon/listicon-32x32px.png'

const props = defineProps<{
  listinfo: string
}>()
</script>

<template>
  <li class="infoitem">
    <img
      :src="iconSrc"
      alt=""
      aria-hidden="true"
      loading="lazy"
      width="32"
      height="32"
      class="infoitem__icon"
    />
    <span class="infoitem__text">{{ listinfo }}</span>
  </li>
</template>

<style scoped lang="scss">
.infoitem {
  display: flex;
  align-items: start;
  gap: 0.5rem;
  margin-bottom: 0.25rem;

  @include mix-media(mobile) {
    margin-bottom: 0.5rem;
  }

  @include mix-media(tablet) {
    margin-bottom: 0.75rem;
  }

  &__icon {
    width: fn-rem(24);
    height: fn-rem(24);

    @include mix-media(tablet) {
      width: fn-rem(26);
      height: fn-rem(26);
    }

    @include mix-media(laptop) {
      width: fn-rem(28);
      height: fn-rem(28);
    }
  }

  &__text {
    font-size: fn-rem(15);

    @include mix-media(mobile) {
      font-size: fn-rem(16);
    }

    @include mix-media(tablet) {
      font-size: fn-rem(17);
    }
  }
}
</style>
