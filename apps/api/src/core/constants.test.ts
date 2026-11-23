/**
 * @fileoverview Test for `constants.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, describe, it, vi } from 'vitest';
import { ALLOW_ORIGINS, DEV_SERVER_PORT, DEV_SERVER_URL } from './constants.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('constants', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('exports', () => {
    it('`DEV_SERVER_PORT` should be defined', () => {
      assert.isDefined(DEV_SERVER_PORT);
    });

    it('`DEV_SERVER_URL` should be defined', () => {
      assert.isDefined(DEV_SERVER_URL);
    });

    it('`ALLOW_ORIGINS` should be defined', () => {
      assert.isDefined(ALLOW_ORIGINS);
    });

    it('`ALLOW_ORIGINS` should include both local frontend origins in dev mode', async () => {
      vi.stubEnv('NODE_ENV', 'dev');
      vi.resetModules();

      const { ALLOW_ORIGINS: allowOrigins } = await import('./constants.js');

      assert.include(allowOrigins, 'http://localhost:3000');
      assert.include(allowOrigins, 'http://localhost:5173');
    });
  });
});
