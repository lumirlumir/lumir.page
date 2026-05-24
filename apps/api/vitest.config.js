import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.{js,mjs,cjs,ts,mts,cts}'],
    typecheck: {
      enabled: false, // Set to true if you want to enable type checking during tests.
      include: ['src/**/*.test-d.{ts,mts,cts}'],
    },
  },
});
