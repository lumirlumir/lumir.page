/**
 * @fileoverview Test for `constants.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { ALLOW_ORIGINS, DEV_SERVER_PORT, DEV_SERVER_URL } from './constants.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('constants', () => {
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
  });
});
