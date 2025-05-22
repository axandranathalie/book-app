<script setup lang="ts">
import { ref } from 'vue'
import MockLogin from '@/devtools/MockLogin.vue'
import ColorPalette from '@/devtools/ColorPalette.vue'
import ThemeColorTable from '@/devtools/ThemeColorTable.vue'
import BaseAction from '@/components/atoms/BaseAction.vue'

const showPalette = ref(false)
const showThemeColors = ref(false)
</script>

<template>
  <section class="devtools">
    <h2>Devtools</h2>

    <MockLogin class="toggle-section" />

    <div class="toggle-section palette">
      <BaseAction
        as="button"
        variant="secondary"
        @click="showPalette = !showPalette"
        :label="`${showPalette ? 'Dölj' : 'Visa'} färgpalett 🎨`"
      />
      <div v-if="showPalette" class="split">
        <ColorPalette />
      </div>
    </div>

    <div class="toggle-section theme">
      <BaseAction
        as="button"
        variant="secondary"
        @click="showThemeColors = !showThemeColors"
        :label="`${showThemeColors ? 'Dölj' : 'Visa'} theme-variabler 🧩`"
      />
      <div v-if="showThemeColors" class="split">
        <ThemeColorTable />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.devtools {
  @include mix-flex-center(column);
  border-radius: fn-rem(8);
  padding: 2rem 5rem;
}

h2 {
  font-size: fn-rem(40);
  font-weight: 600;
  margin: 1rem;
  text-transform: uppercase;
}

.toggle-section {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: fn-rem(12);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: fn-rem(16);
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: fn-rem(8);
  margin-bottom: 2rem;
}

.split {
  overflow: auto;
  max-width: fn-rem(900);
  display: flex;
  align-self: center;
}
</style>
