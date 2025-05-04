import eslint from '@eslint/js';
import typescript from 'typescript-eslint';
import angular from 'angular-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default typescript.config(
  {
    files: ['**/*.ts', '**/*.html'],
    extends: [prettier],
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      eslint.configs.all,
      ...typescript.configs.all,
      ...angular.configs.tsAll,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      'sort-keys': 'off',
      'sort-imports': 'off',
      'new-cap': 'off',
      'no-duplicate-imports': 'off',
      '@typescript-eslint/no-extraneous-class': 'warn',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateAll],
    rules: {},
  },
  {
    files: ['src/index.html'],
    rules: {
      'prettier/prettier': 'off',
      '@angular-eslint/template/i18n': 'off',
    },
  },
);
