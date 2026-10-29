/**
 * @fileoverview ESLint configuration file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { fileURLToPath } from 'node:url';
import { defineConfig, globalIgnores } from 'eslint/config';
import jsx from 'eslint-lumir/jsx';
import tsx from 'eslint-lumir/tsx';
import next from 'eslint-lumir/next';
import json from 'eslint-lumir/json';
import jsonc from 'eslint-lumir/jsonc';
import json5 from 'eslint-lumir/json5';
import md from 'eslint-lumir/md';

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

  jsx,
  tsx,
  json,
  jsonc,
  json5,
  md,

  // js
  {
    name: 'js/global/test-d',
    files: ['**/*.test-d.{ts,mts,cts,tsx}'],
    rules: {
      'prefer-const': 'off',
      'typescript/no-unsafe-function-type': 'off',
      'typescript/no-unused-vars': 'off',
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
    extends: [next],
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
        RouteContext: false, // Next.js
      },
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          name: 'next/image',
          importNames: ['default'],
          message:
            "Use a plain `<img>` element instead of Next.js' Image component for static exports. Next.js image optimization isn't applied during static export.",
        },
      ],

      'next/no-img-element': 'off', // Plain `<img>` is intentional because static export doesn't use Next image optimization.
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

  // jsx
  {
    name: 'jsx/global',
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'no-restricted-syntax': [
        ...tsx.rules['no-restricted-syntax'],
        {
          selector: 'Program[body.length>0]:not(:has(JSXElement)):not(:has(JSXFragment))',
          message: 'Files without JSX must use `.js` or `.ts`.',
        },
      ],
    },
  },

  // md
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
      'md/require-heading-id': 'error',
    },
  },
]);
