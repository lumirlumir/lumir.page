/**
 * @fileoverview Playwright configuration file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { defineConfig, devices } from '@playwright/test';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const isCI = process.env.CI === 'true';
const port = isCI ? 4173 : 3000;
const url = `http://localhost:${port}`;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default defineConfig({
  forbidOnly: isCI,
  fullyParallel: true,
  outputDir: './coverage/playwright/test-results',
  reporter: isCI
    ? 'github'
    : [
        ['list'],
        ['html', { open: 'on-failure', outputFolder: './coverage/playwright/report' }],
      ],
  retries: isCI ? 1 : 0,
  testDir: './tests/e2e',
  workers: 1,

  projects: [
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
    },
  ],

  use: {
    baseURL: url,
  },

  webServer: {
    command: isCI
      ? `vite preview --outDir build --port ${port} --strictPort`
      : 'node --run dev',
    url,
    reuseExistingServer: !isCI,
  },
});
