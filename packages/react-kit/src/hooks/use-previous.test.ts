/**
 * @fileoverview Test for `use-previous.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, assertType, describe, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { usePrevious } from './use-previous.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-previous', () => {
  describe('unit', () => {
    it('Initial value should be returned as given - 1', async () => {
      const { result } = await renderHook(() => usePrevious(0));
      const initialValue = result.current;

      assert.strictEqual(initialValue, 0);
    });

    it('Initial value should be returned as given - 2', async () => {
      const { result } = await renderHook(() => usePrevious('initial'));
      const initialValue = result.current;

      assert.strictEqual(initialValue, 'initial');
    });

    it('Previous value is returned when state changes', async () => {
      let value: number | string = 0;
      const { result, rerender } = await renderHook(() => usePrevious(value));

      value = 1;
      await rerender();
      assert.strictEqual(result.current, 0);

      value = 2;
      await rerender();
      assert.strictEqual(result.current, 1);

      value = 3;
      await rerender();
      assert.strictEqual(result.current, 2);

      value = 'hi';
      await rerender();
      assert.strictEqual(result.current, 3);

      value = 'hello';
      await rerender();
      assert.strictEqual(result.current, 'hi');
    });
  });

  describe('type', () => {
    it('`usePrevious` should be generic and maintain type consistency', () => {
      assertType<(value: number) => number>(usePrevious<number>);
      assertType<(value: string) => string>(usePrevious<string>);
      assertType<(value: { a: number }) => { a: number }>(usePrevious<{ a: number }>);

      // @ts-expect-error -- Type mismatch should be caught
      assertType<(value: number) => string>(usePrevious<number>);
      // @ts-expect-error -- Type mismatch should be caught
      assertType<(value: string) => number>(usePrevious<string>);
    });
  });
});
