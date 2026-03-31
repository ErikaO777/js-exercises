import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // 無視パターン
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'ch17/ex01/format_sample.js', // ← 課題要件
    ],
  },

  // ESLint 推奨（@eslint/js）
  js.configs.recommended,

  // js向けルール
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { react, 'react-hooks': reactHooks },
    extends: 'google',
    rules: {
      // Google参考
      'no-var': 'error',
      'prefer-const': 'warn',
      curly: ['error', 'all'],
      'max-len': [
        'error',
        {
          code: 80,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],
    },
    settings: { react: { version: 'detect' } },
  },

  // Prettier を最後に適用してフォーマット系の競合を無効化
  eslintConfigPrettier,
];
