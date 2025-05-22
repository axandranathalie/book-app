import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'book-client/lint',
    files: ['**/*.{ts,tsx,vue}'],
  },

  // Ignore output and generated files
  {
    ignores: ['dist/**', 'dist-ssr/**', 'coverage/**', 'node_modules/**'],
  },

  // Base configs: Vue essentials + TypeScript + Prettier formatting
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,

  // Custom rules for consistency and clarity
  {
    rules: {
      // TypeScript
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      // JavaScript general
      'no-console': 'warn',
      'no-debugger': 'warn',

      // Vue specific
      'vue/no-unused-components': 'warn',
      'vue/multi-word-component-names': 'off' // Allow components like Home.vue
    }
  }
)
