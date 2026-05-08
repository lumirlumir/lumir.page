/**
 * @fileoverview Test for `use-toggle.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useToggle } from './use-toggle.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-toggle', () => {
  // First overload: `useToggle()`
  it('Default initial value should be `false` when not provided', async () => {
    const { result } = await renderHook(() => useToggle());
    const [state, toggle] = result.current;

    assert.strictEqual(state, false);
    assert.strictEqual(typeof toggle, 'function');
  });

  it('`toggle` function should toggle the state value', async () => {
    const { act, result } = await renderHook(() => useToggle(false));

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

  // Second overload: `useToggle(initialValue)`
  it('Initial value should be `true` when provided', async () => {
    const { result } = await renderHook(() => useToggle(true));
    const [state, toggle] = result.current;

    assert.strictEqual(state, true);
    assert.strictEqual(typeof toggle, 'function');
  });

  it('`toggle` function should toggle the state value', async () => {
    const { act, result } = await renderHook(() => useToggle(true));

    const [firstState, toggle] = result.current;

    assert.strictEqual(firstState, true);

    await act(async () => {
      toggle();
    });

    const [secondState] = result.current;

    assert.strictEqual(secondState, false);

    await act(async () => {
      toggle();
    });

    const [thirdState] = result.current;

    assert.strictEqual(thirdState, true);
  });

  // Third overload: `useToggle(initialValue, firstValue, secondValue)`
  it('Initial value should be used as the initial state value when three values are provided', async () => {
    const { result } = await renderHook(() => useToggle('open', 'closed', 'open'));
    const [state, toggle] = result.current;

    assert.strictEqual(state, 'open');
    assert.strictEqual(typeof toggle, 'function');
  });

  it('`toggle` function should toggle between the provided state values', async () => {
    const { act, result } = await renderHook(() =>
      useToggle<'dark' | 'light'>('light', 'dark', 'light'),
    );

    const [firstState, toggle] = result.current;

    assert.strictEqual(firstState, 'light');

    await act(async () => {
      toggle();
    });

    const [secondState] = result.current;

    assert.strictEqual(secondState, 'dark');

    await act(async () => {
      toggle();
    });

    const [thirdState] = result.current;

    assert.strictEqual(thirdState, 'light');
  });
});
