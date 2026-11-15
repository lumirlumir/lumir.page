import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { vitePluginMarkdown } from './plugins/markdown-loader.js';
import { vitePluginServerOnly } from './plugins/server-only.js';

export default defineConfig({
  plugins: [vitePluginMarkdown(), vitePluginServerOnly()],
  oxc: {
    jsx: {
      runtime: 'automatic',
    },
  },
  test: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'node',
          include: ['{src,tests/integration}/**/*.test.{js,mjs,cjs,ts,mts,cts}'],
        },
      },
      {
        extends: true,
        test: {
          name: 'browser',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            screenshotFailures: false,
            instances: [{ browser: 'chromium' }],
          },
          include: ['src/**/*.test.{jsx,tsx}'],
        },
      },
    ],

    // Vitest's built-in type checking is still experimental, so we intentionally keep it disabled.
    // I prefer the native TypeScript type-checking flow and rely on the repo's project references
    // for better performance, familiar behavior, and more accurate diagnostics.
    typecheck: {
      enabled: false, // Set to true if you want to enable type checking during tests.
      include: ['src/**/*.test-d.{ts,mts,cts,tsx}'],
    },
  },
});
