/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { BackToTopButton, SVGWrapper, Typewriter } from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('exports', () => {
    it('`BackToTopButton` should be defined', () => {
      assert.isDefined(BackToTopButton);
      assert.strictEqual(typeof BackToTopButton, 'function');
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
