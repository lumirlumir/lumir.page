/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import {
  useBooleanState,
  useCountdown,
  useScroll,
  useToggle,
  useTypewriter,
} from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('exports', () => {
    it('`useBooleanState` should be defined', () => {
      assert.isDefined(useBooleanState);
      assert.strictEqual(typeof useBooleanState, 'function');
    });

    it('`useCountdown` should be defined', () => {
      assert.isDefined(useCountdown);
      assert.strictEqual(typeof useCountdown, 'function');
    });

    it('`useScroll` should be defined', () => {
      assert.isDefined(useScroll);
      assert.strictEqual(typeof useScroll, 'function');
    });

    it('`useToggle` should be defined', () => {
      assert.isDefined(useToggle);
      assert.strictEqual(typeof useToggle, 'function');
    });

    it('`useTypewriter` should be defined', () => {
      assert.isDefined(useTypewriter);
      assert.strictEqual(typeof useTypewriter, 'function');
    });
  });
});
