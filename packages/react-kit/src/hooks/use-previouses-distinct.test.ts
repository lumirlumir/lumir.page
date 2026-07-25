/**
 * @fileoverview Test for `use-previouses-distinct.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, assertType, describe, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { usePreviousesDistinct } from './use-previouses-distinct.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-previouses-distinct', () => {
  describe('unit', () => {
    it('Initial previouses should be empty before the first layout effect update', async () => {
      const { result } = await renderHook(() => usePreviousesDistinct(0));
      const initialPreviouses = result.current;

      assert.deepStrictEqual(initialPreviouses, []);
    });

    it('Same-value rerenders should keep the active value out of previouses', async () => {
      const { result, rerender } = await renderHook(() => usePreviousesDistinct(0));
      const initialPreviouses = result.current;

      assert.deepStrictEqual(initialPreviouses, []);

      await rerender();

      assert.deepStrictEqual(result.current, []);
    });

    it('Previous values should be returned when the tracked value changes', async () => {
      let value: number | string = 0;
      const { result, rerender } = await renderHook(() => usePreviousesDistinct(value));

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
    it('`usePreviousesDistinct` should be generic and maintain type consistency', () => {
      assertType<(value: number) => number[]>(usePreviousesDistinct<number>);
      assertType<(value: string) => string[]>(usePreviousesDistinct<string>);
      assertType<(value: { a: number }) => { a: number }[]>(
        usePreviousesDistinct<{ a: number }>,
      );

      // @ts-expect-error -- Type mismatch should be caught
      assertType<(value: number) => string[]>(usePreviousesDistinct<number>);
      // @ts-expect-error -- Type mismatch should be caught
      assertType<(value: string) => number[]>(usePreviousesDistinct<string>);
    });
  });
});
