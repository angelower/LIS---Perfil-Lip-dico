import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    // Reglas de estilo de código de AGENT.md (sección "Reglas de código").
    rules: {
      // "Todas las funciones deben tener tipos explícitos de retorno"
      // (los callbacks en línea, como los de .map(), quedan exentos).
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      // "Usar const y arrow functions. Evitar function declarations."
      'func-style': ['error', 'expression'],
      'prefer-arrow-callback': 'error',
    },
  },
])
