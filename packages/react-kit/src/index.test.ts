/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import packageJson from '../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('package.json', () => {
    it('should have `sideEffects: false`', () => {
      assert.strictEqual(packageJson.sideEffects, false);
    });

    it('should not have `typesVersions` keys that start with `./`', () => {
      const typesVersionKeys = Object.keys(packageJson.typesVersions['*']);

      assert.strictEqual(typesVersionKeys.filter(key => key.startsWith('./')).length, 0);
    });
  });
});
