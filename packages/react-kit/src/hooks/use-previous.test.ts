/**
 * @fileoverview Test for `use-previous.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it, expect, expectTypeOf } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { usePrevious } from './use-previous.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-previous', () => {
  describe('unit', () => {
    it('Initial value should be returned as given - 1', async () => {
      const { result } = await renderHook(() => usePrevious(0));

      expect(result.current).toBe(0);
    });

    it('Initial value should be returned as given - 2', async () => {
      const { result } = await renderHook(() => usePrevious('initial'));

      expect(result.current).toBe('initial');
    });

    it('Previous value is returned when state changes', async () => {
      let value: number | string = 0;
      const { result, rerender } = await renderHook(() => usePrevious(value));

      value = 1;
      await rerender();
      expect(result.current).toBe(0);

      value = 2;
      await rerender();
      expect(result.current).toBe(1);

      value = 3;
      await rerender();
      expect(result.current).toBe(2);

      value = 'hi';
      await rerender();
      expect(result.current).toBe(3);

      value = 'hello';
      await rerender();
      expect(result.current).toBe('hi');
    });
  });

  describe('type', () => {
    it('`usePrevious` should be generic and maintain type consistency', () => {
      expectTypeOf<typeof usePrevious<number>>().toEqualTypeOf<
        (value: number) => number
      >();

      expectTypeOf<typeof usePrevious<string>>().toEqualTypeOf<
        (value: string) => string
      >();

      expectTypeOf<typeof usePrevious<{ a: number }>>().toEqualTypeOf<
        (value: { a: number }) => { a: number }
      >();
    });
  });
});
