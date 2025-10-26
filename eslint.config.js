import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  {
    ...js.configs.recommended,
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
    rules: {
      ...prettier.rules,
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
