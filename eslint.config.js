import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  eslintConfigPrettier, // Esto desactiva las reglas de ESLint que entran en conflicto con Prettier
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off' // Para que no te moleste con los console.log de depuración
    }
  }
];
