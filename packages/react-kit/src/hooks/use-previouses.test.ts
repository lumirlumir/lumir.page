/**
 * @fileoverview Test for `use-previouses.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, assertType, describe, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { usePreviouses } from './use-previouses.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-previouses', () => {
  describe('unit', () => {
    it('Initial previouses should be empty before the first layout effect update', async () => {
      const { result } = await renderHook(() => usePreviouses(0));
      const initialPreviouses = result.current;

      assert.deepStrictEqual(initialPreviouses, []);
    });

    it('Same-value rerenders should keep the active value out of previouses', async () => {
      const { result, rerender } = await renderHook(() => usePreviouses(0));
      const initialPreviouses = result.current;

      assert.deepStrictEqual(initialPreviouses, []);

      await rerender();

      assert.deepStrictEqual(result.current, []);
    });

    it('Previous values should be returned when the tracked value changes', async () => {
      let value: number | string = 0;
      const { result, rerender } = await renderHook(() => usePreviouses(value));

      value = 1;
      await rerender();
      assert.deepStrictEqual(result.current, [0]);

      value = 2;
      await rerender();
      assert.deepStrictEqual(result.current, [0, 1]);

      value = 3;
      await rerender();
      assert.deepStrictEqual(result.current, [0, 1, 2]);

      value = 'hi';
      await rerender();
      assert.deepStrictEqual(result.current, [0, 1, 2, 3]);

      value = 'hello';
      await rerender();
      assert.deepStrictEqual(result.current, [0, 1, 2, 3, 'hi']);
    });
  });

  describe('type', () => {
    it('`usePreviouses` should be generic and maintain type consistency', () => {
      assertType<(value: number) => number[]>(usePreviouses<number>);
      assertType<(value: string) => string[]>(usePreviouses<string>);
      assertType<(value: { a: number }) => { a: number }[]>(usePreviouses<{ a: number }>);

      // @ts-expect-error -- Type mismatch should be caught
      assertType<(value: number) => string[]>(usePreviouses<number>);
      // @ts-expect-error -- Type mismatch should be caught
      assertType<(value: string) => number[]>(usePreviouses<string>);
    });
  });
});
