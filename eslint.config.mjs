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
      'max-statements': 'off',
      'new-cap': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-duplicate-imports': 'off',
      'no-undefined': 'off',
      'no-ternary': 'off',
      'no-nested-ternary': 'off',
      'one-var': ['error', 'never'],
      '@typescript-eslint/no-extraneous-class': 'warn',
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignoreEnums: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
        },
        {
          selector: 'memberLike',
          format: ['PascalCase'],
        },
        {
          selector: 'property',
          format: ['camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/prefer-enum-initializers': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateAll],
    rules: {
      '@angular-eslint/template/i18n': 'off',
      '@angular-eslint/template/no-call-expression': 'off',
    },
  },
  {
    files: ['projects/shell/src/index.html'],
    rules: {
      'prettier/prettier': 'off',
    },
  },
);
