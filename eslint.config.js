/**
 * @fileoverview ESLint configuration file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { fileURLToPath } from 'node:url';
import { defineConfig, globalIgnores } from 'eslint/config';
import bananass from 'eslint-config-bananass';
import md from 'eslint-markdown';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default defineConfig([
  globalIgnores(
    [
      '**/archives/',
      '**/build/',
      '**/coverage/',
      '**/.next/',
      '**/next-env.d.ts',
      '**/.tsbuildinfo',
    ],
    'global/ignores',
  ),

  bananass.configs.jsxNext,
  bananass.configs.tsxNext,
  bananass.configs.json,
  bananass.configs.jsonc,
  bananass.configs.json5,
  md.configs.base,

  // js
  {
    name: 'js/global',
    rules: {
      'import/no-cycle': 'off', // Too computationally expensive. TODO: Remove this in shared config.
      'import/prefer-default-export': 'off', // Too restrictive. TODO: Remove this in shared config.
    },
  },
  {
    name: 'js/global/test-d',
    files: ['**/*.test-d.{ts,mts,cts,tsx}'],
    rules: {
      'prefer-const': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    name: 'js/apps/api',
    files: ['apps/api/**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: {
        HeadersInit: false, // Web
      },
    },
  },
  {
    name: 'js/apps/blog',
    files: ['apps/blog/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    settings: {
      next: {
        rootDir: fileURLToPath(new URL('./apps/blog', import.meta.url)),
      },
      node: {
        resolverConfig: {
          // `eslint-plugin-n` uses webpack's `enhanced-resolve` under the hood.
          alias: {
            '@': fileURLToPath(new URL('./apps/blog/src', import.meta.url)),
          },
        },
      },
    },
    languageOptions: {
      globals: {
        LayoutProps: false, // Next.js
        PageProps: false, // Next.js
      },
    },
    rules: {
      'react/no-unknown-property': 'off', // TypeScript handles this. TODO: Remove this in shared config.
    },
  },
  {
    name: 'js/apps/moing',
    files: ['apps/moing/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    settings: {
      node: {
        resolverConfig: {
          // `eslint-plugin-n` uses webpack's `enhanced-resolve` under the hood.
          alias: {
            '@': fileURLToPath(new URL('./apps/moing/src', import.meta.url)),
          },
        },
      },
    },
  },
  {
    name: 'js/playground',
    files: ['playground/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    settings: {
      node: {
        resolverConfig: {
          // `eslint-plugin-n` uses webpack's `enhanced-resolve` under the hood.
          alias: {
            '@': fileURLToPath(new URL('./playground/src', import.meta.url)),
          },
        },
      },
    },
  },
  {
    name: 'js/scripts',
    files: ['**/scripts/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    rules: {
      'no-console': 'off', // Allow console statements in scripts.
    },
  },

  // md
  {
    name: 'md/global',
    files: ['**/*.md'],
    rules: {
      'md/allow-image-url': ['error', { disallowUrls: [/^\.\//, /^http:\/\//i] }],
      'md/allow-link-url': ['error', { disallowUrls: [/^\.\//, /^http:\/\//i] }],
      'md/code-lang-shorthand': 'error',
      'md/consistent-code-style': [
        'error',
        { style: 'fence-backtick', blankLineAbove: 1, blankLineBelow: 1 },
      ],
      'md/consistent-delete-style': ['error', { style: '~' }],
      'md/consistent-emphasis-style': ['error', { style: '*' }],
      'md/consistent-inline-code-style': 'error',
      'md/consistent-strong-style': ['error', { style: '*' }],
      'md/consistent-thematic-break-style': ['error', { style: '---' }],
      'md/consistent-unordered-list-style': ['error', { style: '-' }],
      'md/no-consecutive-blank-line': ['error', { max: 1, skipCode: false }],
      'md/no-control-character': ['error', { skipCode: false, skipInlineCode: false }],
      'md/no-curly-quote': 'error',
      'md/no-double-punctuation': 'error',
      'md/no-double-space': 'error',
      'md/no-emoji': 'off',
      'md/no-git-conflict-marker': ['error', { skipCode: false }],
      'md/no-irregular-dash': ['error', { skipCode: false, skipInlineCode: false }],
      'md/no-irregular-whitespace': ['error', { skipCode: false, skipInlineCode: false }],
      'md/no-tab': ['error', { skipCode: false, skipInlineCode: false }],
      'md/no-url-trailing-slash': 'error',
      'md/require-heading-id': 'off',
      'md/require-image-title': 'off', // Too tight.
      'md/require-link-title': 'off', // Too tight.
    },
  },
  {
    name: 'md/apps/blog',
    files: ['apps/blog/src/posts/docs/**/*.md'],
    rules: {
      'md/allow-image-url': [
        'error',
        {
          allowUrls: [/^\/apps\/blog\/public\/images\//],
          disallowUrls: [/^\.\//, /^http:\/\//i],
        },
      ],
      'md/no-emoji': 'error',
    },
  },
  {
    name: 'md/apps/blog/ko',
    files: ['apps/blog/src/posts/docs/**/*.ko.md'],
    rules: {
      'md/require-heading-id': 'error',
    },
  },
]);
