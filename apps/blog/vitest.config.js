import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    {
      name: 'raw-markdown',
      async load(id) {
        if (id.endsWith('.md')) {
          return `export default ${JSON.stringify(await readFile(id, 'utf8'))};`;
        }

        return null;
      },
    },
  ],
  oxc: {
    jsx: {
      runtime: 'automatic',
    },
  },
  test: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
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
