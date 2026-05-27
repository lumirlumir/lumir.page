/**
 * @fileoverview Test for `use-history.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, assertType, describe, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useHistory } from './use-history.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-history', () => {
  describe('unit', () => {
    it('Initial history should be empty before the first layout effect update', async () => {
      const { result } = await renderHook(() => useHistory(0));
      const initialHistory = result.current;

      assert.deepStrictEqual(initialHistory, []);
    });

    it('Previous values should be returned when the tracked value changes', async () => {
      let value: number | string = 0;
      const { result, rerender } = await renderHook(() => useHistory(value));

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
    it('`useHistory` should be generic and maintain type consistency', () => {
      assertType<(value: number) => number[]>(useHistory<number>);
      assertType<(value: string) => string[]>(useHistory<string>);
      assertType<(value: { a: number }) => { a: number }[]>(useHistory<{ a: number }>);

      // @ts-expect-error -- Type mismatch should be caught
      assertType<(value: number) => string[]>(useHistory<number>);
      // @ts-expect-error -- Type mismatch should be caught
      assertType<(value: string) => number[]>(useHistory<string>);
    });
  });
});
