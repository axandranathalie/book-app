<script setup lang="ts">
import { computed } from 'vue'

interface ThemeEntry {
  label: string
  cssVar: string
  purpose: string
  group: string
}

const allThemes: ThemeEntry[] = [
  // === GLOBAL ===
  {
    label: 'Text dark',
    cssVar: '--color-text-dark',
    purpose: 'Text på ljus bakgrund',
    group: 'Global',
  },
  {
    label: 'Text light',
    cssVar: '--color-text-light',
    purpose: 'Text på mörk bakgrund',
    group: 'Global',
  },
  {
    label: 'Text muted',
    cssVar: '--color-text-muted',
    purpose: 'Placeholder/sekundär text',
    group: 'Global',
  },
  {
    label: 'Bakgrund',
    cssVar: '--color-background',
    purpose: 'Standard sidbakgrund',
    group: 'Global',
  },
  { label: 'Yta (ljus)', cssVar: '--color-surface', purpose: 'Ljus komponentyta', group: 'Global' },
  {
    label: 'Yta (mörk)',
    cssVar: '--color-surface-dark',
    purpose: 'Mörk komponentyta',
    group: 'Global',
  },
  {
    label: 'Header-bakgrund',
    cssVar: '--color-header-bg',
    purpose: 'Bakgrund för header',
    group: 'Global',
  },
  {
    label: 'Header-text',
    cssVar: '--color-header-text',
    purpose: 'Text i header',
    group: 'Global',
  },
  { label: 'Nav mörk', cssVar: '--color-nav-dark', purpose: 'Mörk navfärg', group: 'Global' },
  { label: 'Nav ljus', cssVar: '--color-nav-light', purpose: 'Ljus navfärg', group: 'Global' },
  { label: 'Logo primär', cssVar: '--color-logo', purpose: 'Primär logofärg', group: 'Global' },
  {
    label: 'Logo ljus',
    cssVar: '--color-logo-light',
    purpose: 'Logofärg på mörk bakgrund',
    group: 'Global',
  },
  {
    label: 'Logo highlight',
    cssVar: '--color-logo-subtle',
    purpose: 'Subtil logohighlight',
    group: 'Global',
  },
  {
    label: 'Ikoner ljus',
    cssVar: '--color-icons-light',
    purpose: 'Ikoner på mörk bakgrund',
    group: 'Global',
  },
  {
    label: 'Stjärna tom',
    cssVar: '--color-ratingstar-empty',
    purpose: 'Betygsikon: tom',
    group: 'Global',
  },
  {
    label: 'Stjärna fylld',
    cssVar: '--color-ratingstar-filled',
    purpose: 'Betygsikon: fylld',
    group: 'Global',
  },

  // === ACTIONS ===
  {
    label: 'Primär knapp',
    cssVar: '--color-action-primary',
    purpose: 'Bakgrund primär knapp',
    group: 'Actions',
  },
  {
    label: 'Primär hover',
    cssVar: '--color-action-primary-hover',
    purpose: 'Hover-färg primär knapp',
    group: 'Actions',
  },
  {
    label: 'Primär focus',
    cssVar: '--color-action-primary-focus',
    purpose: 'Fokusfärg primär knapp',
    group: 'Actions',
  },
  {
    label: 'Sekundär knapp',
    cssVar: '--color-action-secondary',
    purpose: 'Bakgrund sekundär knapp',
    group: 'Actions',
  },
  {
    label: 'Sekundär hover',
    cssVar: '--color-action-secondary-hover',
    purpose: 'Hover-färg sekundär knapp',
    group: 'Actions',
  },
  {
    label: 'Sekundär focus',
    cssVar: '--color-action-secondary-focus',
    purpose: 'Fokusfärg sekundär knapp',
    group: 'Actions',
  },
  {
    label: 'Disabled',
    cssVar: '--color-action-disabled',
    purpose: 'Inaktiverad knapp',
    group: 'Actions',
  },

  // === FORMS ===
  {
    label: 'Input border',
    cssVar: '--color-input-border-default',
    purpose: 'Standardkant på input',
    group: 'Forms',
  },
  {
    label: 'Input hover',
    cssVar: '--color-input-border-hover',
    purpose: 'Hoverkant på input',
    group: 'Forms',
  },
  {
    label: 'Input focus',
    cssVar: '--color-input-border-focus',
    purpose: 'Fokus på inputfält',
    group: 'Forms',
  },
  {
    label: 'Input bakgrund',
    cssVar: '--color-input-bg',
    purpose: 'Bakgrund i inputfält',
    group: 'Forms',
  },
  {
    label: 'Input disabled',
    cssVar: '--color-input-disabled-bg',
    purpose: 'Bakgrund för inaktiverat fält',
    group: 'Forms',
  },
  {
    label: 'Placeholder',
    cssVar: '--color-placeholder-text',
    purpose: 'Text i placeholder',
    group: 'Forms',
  },
  {
    label: 'Valid fokus',
    cssVar: '--color-feedback-valid-focus',
    purpose: 'Färg vid validerad input',
    group: 'Forms',
  },
  {
    label: 'Invalid fokus',
    cssVar: '--color-feedback-invalid-focus',
    purpose: 'Färg vid felaktig input',
    group: 'Forms',
  },
  {
    label: 'Fel-bakgrund',
    cssVar: '--color-feedback-bg-invalid',
    purpose: 'Bakgrund vid valideringsfel',
    group: 'Forms',
  },
  {
    label: 'Fel-text',
    cssVar: '--color-feedback-invalid-text',
    purpose: 'Text vid valideringsfel',
    group: 'Forms',
  },
  {
    label: 'Info-bakgrund',
    cssVar: '--color-feedback-bg-info',
    purpose: 'Bakgrund vid information',
    group: 'Forms',
  },
]

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(`var(${text})`)
}

const groupedThemes = computed(() => {
  const groups: Record<string, ThemeEntry[]> = {}
  for (const entry of allThemes) {
    if (!groups[entry.group]) groups[entry.group] = []
    groups[entry.group].push(entry)
  }
  return groups
})
</script>

<template>
  <div class="theme-table">
    <h2>Theme Variabler</h2>
    <p>Klicka på en variabel för att kopiera dess namn</p>

    <article v-for="(entries, groupName) in groupedThemes" :key="groupName">
      <h3>{{ groupName }}</h3>
      <table>
        <thead>
          <tr>
            <th>Beskrivning</th>
            <th>CSS-var</th>
            <th>Färg</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in entries" :key="entry.cssVar">
            <td>{{ entry.purpose }}</td>
            <td>
              <button class="copy" @click="copyToClipboard(entry.cssVar)">
                {{ entry.cssVar }}
              </button>
            </td>
            <td>
              <span class="swatch" :style="{ backgroundColor: `var(${entry.cssVar})` }" />
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  </div>
</template>

<style scoped lang="scss">
.theme-table {
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

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;

    th,
    td {
      border: 1px solid #ccc;
      padding: 0.75rem;
      text-align: left;
    }

    th {
      background: #f9f9f9;
    }

    .swatch {
      display: inline-block;
      width: 2.5rem;
      height: 2.5rem;
      border: 1px solid #aaa;
      border-radius: 0.25rem;
    }

    .copy {
      font-family: monospace;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text-dark);
      padding: 0;
      text-align: left;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
