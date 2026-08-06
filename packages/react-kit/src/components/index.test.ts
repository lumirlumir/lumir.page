/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { CursorSplash, SVGWrapper, Typewriter } from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('exports', () => {
    it('`CursorSplash` should be defined', () => {
      assert.isDefined(CursorSplash);
      assert.strictEqual(typeof CursorSplash, 'function');
    });

    it('`SVGWrapper` should be defined', () => {
      assert.isDefined(SVGWrapper);
      assert.strictEqual(typeof SVGWrapper, 'function');
    });

    it('`Typewriter` should be defined', () => {
      assert.isDefined(Typewriter);
      assert.strictEqual(typeof Typewriter, 'function');
    });
  });
});
