/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import {
  useBooleanState,
  useHistory,
  usePrevious,
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

    it('`useHistory` should be defined', () => {
      assert.isDefined(useHistory);
      assert.strictEqual(typeof useHistory, 'function');
    });

    it('`usePrevious` should be defined', () => {
      assert.isDefined(usePrevious);
      assert.strictEqual(typeof usePrevious, 'function');
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
