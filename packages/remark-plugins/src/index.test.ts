/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import {
  customHeadingIdRegex,
  remarkCustomHeadingId,
  remarkHeadingFromTitle,
} from './index.js';
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
    it('`customHeadingIdRegex` should capture a custom heading ID', () => {
      assert.isDefined(customHeadingIdRegex);
      assert.strictEqual(typeof customHeadingIdRegex, 'object');
    });

    it('`remarkCustomHeadingId` should be defined', () => {
      assert.isDefined(remarkCustomHeadingId);
      assert.strictEqual(typeof remarkCustomHeadingId, 'function');
    });

    it('`remarkHeadingFromTitle` should be defined', () => {
      assert.isDefined(remarkHeadingFromTitle);
      assert.strictEqual(typeof remarkHeadingFromTitle, 'function');
    });
  });
});
