import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    include: ['src/**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],

    // Vitest's built-in type checking is still experimental, so we intentionally keep it disabled.
    // I prefer the native TypeScript type-checking flow and rely on the repo's project references
    // for better performance, familiar behavior, and more accurate diagnostics.
    typecheck: {
      enabled: false, // Set to true if you want to enable type checking during tests.
      include: ['src/**/*.test-d.{ts,mts,cts,tsx}'],
    },
  },
});
