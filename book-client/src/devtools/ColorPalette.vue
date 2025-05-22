<script setup lang="ts">
// Färger hämtade från din SCSS-variabelfil, omskrivna som JS-objekt
const colors = [
  { name: 'soapstone', hex: '#fffcfa' },
  { name: 'bulgarianrose', hex: '#471505' },
  { name: 'bulgarianrose-75', hex: '#481605bf' },
  { name: 'mineshaft', hex: '#3c3c3c' },
  { name: 'mineshaft-87', hex: '3d3d3dde' },
  { name: 'seashellpeach', hex: '#fff8f3' },
  { name: 'millbrook', hex: '#5c4033' },
  { name: 'pomegranate', hex: '#f4470f' },
  { name: 'geraldine', hex: '#f6a283' },
  { name: 'rosebud', hex: '#fab89e' },
  { name: 'watusi', hex: '#ffdfd1' },
  { name: 'kenyancopper', hex: '#792706' },
  { name: 'oregon', hex: '#992f00' },
  { name: 'brownbramble', hex: '#5f1f07' },
  { name: 'summergreen', hex: '#8cbfa4' },
  { name: 'sunglo', hex: '#e57373' },
  { name: 'azaela', hex: '#f5cbcb' },
  { name: 'moccaccino', hex: '#6c1414' },
  { name: 'forgetmenot', hex: '#fff1eb' },
  { name: 'alto', hex: '#e0e0e0' },
]
</script>

<template>
  <article>
    <h2>Color palette</h2>
    <div class="palette">
      <div v-for="color in colors" :key="color.name" class="swatch">
        <div class="swatch__box" :style="{ backgroundColor: color.hex }"></div>
        <div class="swatch__info">
          <strong>{{ color.name }}</strong>
          <code>{{ color.hex }}</code>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
h2 {
  text-align: center;
  font-size: fn-rem(36);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

h3 {
  font-weight: 400;
  font-size: fn-rem(28);
  margin: 0.5rem 0;
}

p {
  text-align: center;
  font-size: fn-rem(16);
  margin-bottom: 1rem;
}

article {
  margin-bottom: 2rem;
}
article {
  @include mix-flex-center(column);
}
.palette {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}

.swatch {
  width: fn-rem(130);
  height: fn-rem(130);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: #fff;

  &__box {
    height: 50%;
    aspect-ratio: 2 / 1;
    border-radius: 0.25rem;
    border: 1px solid #aaa;
  }

  &__info {
    @include mix-flex-center(column);
    gap: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  code {
    font-family: monospace;
    color: #555;
  }
}
</style>
