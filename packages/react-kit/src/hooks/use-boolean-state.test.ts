/**
 * @fileoverview Test for `use-boolean-state.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useBooleanState } from './use-boolean-state.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-boolean-state', () => {
  it('Default initial value should be `false` when not provided', async () => {
    const { result } = await renderHook(() => useBooleanState());
    const [state, toggle, setTrue, setFalse] = result.current;

    assert.strictEqual(state, false);
    assert.strictEqual(typeof toggle, 'function');
    assert.strictEqual(typeof setTrue, 'function');
    assert.strictEqual(typeof setFalse, 'function');
  });

  it('Initial value should be `true` when provided', async () => {
    const { result } = await renderHook(() => useBooleanState(true));
    const [state, toggle, setTrue, setFalse] = result.current;

    assert.strictEqual(state, true);
    assert.strictEqual(typeof toggle, 'function');
    assert.strictEqual(typeof setTrue, 'function');
    assert.strictEqual(typeof setFalse, 'function');
  });

  it('`toggle` function should toggle the state value', async () => {
    const { act, result } = await renderHook(() => useBooleanState(false));

    const [firstState, toggle] = result.current;

    assert.strictEqual(firstState, false);

    await act(async () => {
      toggle();
    });

    const [secondState] = result.current;

    assert.strictEqual(secondState, true);

    await act(async () => {
      toggle();
    });

    const [thirdState] = result.current;

    assert.strictEqual(thirdState, false);
  });

  it('`setTrue` function should set the state value to `true`', async () => {
    const { act, result } = await renderHook(() => useBooleanState(false));

    const [firstState, , setTrue] = result.current;

    assert.strictEqual(firstState, false);

    await act(async () => {
      setTrue();
    });

    const [secondState] = result.current;

    assert.strictEqual(secondState, true);

    await act(async () => {
      setTrue();
    });

    const [thirdState] = result.current;

    // should remain `true` when `setTrue` is called again
    assert.strictEqual(thirdState, true);
  });

  it('`setFalse` function should set the state value to `false`', async () => {
    const { act, result } = await renderHook(() => useBooleanState(true));

    const [firstState, , , setFalse] = result.current;

    assert.strictEqual(firstState, true);

    await act(async () => {
      setFalse();
    });

    const [secondState] = result.current;

    assert.strictEqual(secondState, false);

    await act(async () => {
      setFalse();
    });

    const [thirdState] = result.current;

    // should remain `false` when `setFalse` is called again
    assert.strictEqual(thirdState, false);
  });
});
