/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import {
  CursorSplash,
  Dialog,
  DialogRoot,
  DialogContent,
  DialogOpen,
  DialogClose,
  SVGWrapper,
  Typewriter,
} from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('exports', () => {
    it('`CursorSplash` should be defined', () => {
      assert.isDefined(CursorSplash);
      assert.strictEqual(typeof CursorSplash, 'function');
    });

    it('`Dialog` should expose the named dialog components', () => {
      assert.isDefined(Dialog);
      assert.strictEqual(typeof Dialog, 'object');
      assert.isDefined(DialogRoot);
      assert.strictEqual(typeof DialogRoot, 'function');
      assert.isDefined(DialogContent);
      assert.strictEqual(typeof DialogContent, 'function');
      assert.isDefined(DialogOpen);
      assert.strictEqual(typeof DialogOpen, 'function');
      assert.isDefined(DialogClose);
      assert.strictEqual(typeof DialogClose, 'function');
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
