/**
 * @fileoverview Playwright configuration file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { defineConfig, devices } from '@playwright/test'; // eslint-disable-line import/no-extraneous-dependencies

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const isCI = process.env.CI === 'true';
const url = 'http://localhost:3000';

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
  testDir: './tests',
  workers: '50%',

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
    command: 'node --run dev',
    url,
    reuseExistingServer: !isCI,
  },
});
