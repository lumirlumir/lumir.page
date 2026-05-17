/**
 * @fileoverview Test for `use-previous.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, expectTypeOf, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { usePrevious } from './use-previous.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-previous', () => {
  it('Initial value should be returned before any value changes', async () => {
    const { result } = await renderHook(() => usePrevious(0));

    assert.strictEqual(result.current, 0);
  });

  it('Previous value should be returned after each value change', async () => {
    let value: number | string = 0;
    const { result, rerender } = await renderHook(() => usePrevious(value));

    value = 1;
    await rerender();
    assert.strictEqual(result.current, 0);

    value = 2;
    await rerender();
    assert.strictEqual(result.current, 1);

    value = 'hi';
    await rerender();
    assert.strictEqual(result.current, 2);
  });

  it('`usePrevious` should preserve the tracked value type', () => {
    expectTypeOf<typeof usePrevious<number>>().toEqualTypeOf<(value: number) => number>();

    expectTypeOf<typeof usePrevious<string>>().toEqualTypeOf<(value: string) => string>();

    expectTypeOf<typeof usePrevious<{ count: number }>>().toEqualTypeOf<
      (value: { count: number }) => { count: number }
    >();
  });
});
