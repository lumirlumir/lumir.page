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
  useIsomorphicLayoutEffect,
  usePrevious,
  usePreviousDistinct,
  useScroll,
  useShortcut,
  useSpeechRecognition,
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

    it('`useIsomorphicLayoutEffect` should be defined', () => {
      assert.isDefined(useIsomorphicLayoutEffect);
      assert.strictEqual(typeof useIsomorphicLayoutEffect, 'function');
    });

    it('`usePrevious` should be defined', () => {
      assert.isDefined(usePrevious);
      assert.strictEqual(typeof usePrevious, 'function');
    });

    it('`usePreviousDistinct` should be defined', () => {
      assert.isDefined(usePreviousDistinct);
      assert.strictEqual(typeof usePreviousDistinct, 'function');
    });

    it('`useScroll` should be defined', () => {
      assert.isDefined(useScroll);
      assert.strictEqual(typeof useScroll, 'function');
    });

    it('`useShortcut` should be defined', () => {
      assert.isDefined(useShortcut);
      assert.strictEqual(typeof useShortcut, 'function');
    });

    it('`useSpeechRecognition` should be defined', () => {
      assert.isDefined(useSpeechRecognition);
      assert.strictEqual(typeof useSpeechRecognition, 'function');
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
