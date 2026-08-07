/**
 * @fileoverview Test for `is-config.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { isConfig } from './is-config.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('is-config', () => {
  describe('when the data matches the config shape', () => {
    it('should return `true` when cursorSplash is a boolean', () => {
      assert.strictEqual(isConfig({ cursorSplash: true }), true);
    });

    it('should return `true` when extra fields are present', () => {
      assert.strictEqual(isConfig({ cursorSplash: false, theme: 'dark' }), true);
    });
  });

  describe('when the data is not an object', () => {
    it('should return `false` for null', () => {
      assert.strictEqual(isConfig(null), false);
    });

    it('should return `false` for an array', () => {
      assert.strictEqual(isConfig([]), false);
    });

    it('should return `false` for a string', () => {
      assert.strictEqual(isConfig('cursorSplash'), false);
    });
  });

  describe('when cursorSplash is invalid', () => {
    it('should return `false` when cursorSplash is missing', () => {
      assert.strictEqual(isConfig({}), false);
    });

    it('should return `false` when cursorSplash is not a boolean', () => {
      assert.strictEqual(isConfig({ cursorSplash: 'true' }), false);
    });
  });
});
