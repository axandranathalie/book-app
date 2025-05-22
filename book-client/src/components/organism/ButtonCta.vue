<script setup lang="ts">
import BaseAction from '@/components/global/BaseAction.vue'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  to: RouteLocationRaw
  label: string
  heading?: string
  message1?: string
  message2?: string
}>()
</script>

<template>
  <div class="account-cta">
    <h2 class="account-cta__heading" v-if="heading">{{ heading }}</h2>
    <div class="account-cta__message">
      <p v-if="message1">{{ message1 }}</p>
      <p v-if="message2">{{ message2 }}</p>
    </div>

    <BaseAction
      class="account-cta__button"
      as="router-link"
      :to="to"
      :label="label"
      variant="secondary"
    />
  </div>
</template>

<style scoped lang="scss">
.account-cta {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: fn-rem(40);
  margin-bottom: fn-rem(64);

  &__heading {
    font-size: fn-rem(23);
    text-align: center;
    margin-bottom: 0.25rem;

    @include mix-media(tablet) {
      font-size: fn-rem(26);
      margin-bottom: 0.75rem;
    }
  }

  &__message {
    text-align: center;
    word-wrap: break-word;
    max-width: 95%;
    margin-bottom: 1.5rem;

    @include mix-media(tablet) {
      margin-bottom: 2rem;
    }
  }

  &__button {
    max-width: fn-rem(250);
    width: 100%;
  }
}
</style>
