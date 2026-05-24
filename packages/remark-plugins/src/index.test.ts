/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { remarkHeadingFromTitle } from './index.js';
import packageJson from '../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('package.json', () => {
    it('should have `sideEffects: false`', () => {
      assert.strictEqual(packageJson.sideEffects, false);
    });
  });

  describe('exports', () => {
    it('`remarkHeadingFromTitle` should be defined', () => {
      assert.isDefined(remarkHeadingFromTitle);
      assert.strictEqual(typeof remarkHeadingFromTitle, 'function');
    });
  });
});
