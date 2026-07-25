/**
 * @fileoverview Test for `use-previous-distinct.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { usePreviousDistinct } from './use-previous-distinct.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-previous-distinct', () => {
  it('Initial value should be returned as given - 1', async () => {
    const { result } = await renderHook(() => usePreviousDistinct(0));
    const initialValue = result.current;

    assert.strictEqual(initialValue, 0);
  });

  it('Initial value should be returned as given - 2', async () => {
    const { result } = await renderHook(() => usePreviousDistinct('initial'));
    const initialValue = result.current;

    assert.strictEqual(initialValue, 'initial');
  });

  it('Previous value is returned when state changes', async () => {
    let value: number | string = 0;
    const { result, rerender } = await renderHook(() => usePreviousDistinct(value));

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

  it('Previous distinct value is preserved when the current value does not change', async () => {
    // Unlike `usePrevious`, `usePreviousDistinct` should keep returning the previous
    // distinct value when the immediately preceding render matches the current value.
    let value = 0;
    const { result, rerender } = await renderHook(() => usePreviousDistinct(value));

    value = 1;
    await rerender();
    assert.strictEqual(result.current, 0);

    await rerender();
    assert.strictEqual(result.current, 0);

    value = 2;
    await rerender();
    assert.strictEqual(result.current, 1);

    await rerender();
    assert.strictEqual(result.current, 1);
  });

  it('Default `Object.is` comparison should treat separate object references as distinct values', async () => {
    const initialValue = { id: 1 };
    const structurallyEqualValue = { id: 1 };

    let value = initialValue;
    const { result, rerender } = await renderHook(() => usePreviousDistinct(value));

    value = structurallyEqualValue;
    await rerender();
    assert.strictEqual(result.current, initialValue);

    value = { id: 2 };
    await rerender();
    assert.strictEqual(result.current, structurallyEqualValue);
  });

  it('Custom `compareFn` should determine whether values are distinct', async () => {
    const initialValue = { id: 1, label: 'initial' };
    const equivalentValue = { id: 1, label: 'updated' };
    const distinctValue = { id: 2, label: 'distinct' };

    let value = initialValue;
    const { result, rerender } = await renderHook(() =>
      usePreviousDistinct(value, {
        compareFn: (prev, next) => prev.id === next.id,
      }),
    );

    value = equivalentValue;
    await rerender();
    assert.strictEqual(result.current, initialValue);

    value = distinctValue;
    await rerender();
    assert.strictEqual(result.current, initialValue);

    value = { id: 3, label: 'next distinct' };
    await rerender();
    assert.strictEqual(result.current, distinctValue);
  });
});
