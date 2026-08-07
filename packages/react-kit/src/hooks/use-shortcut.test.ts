/**
 * @fileoverview Test for `use-shortcut.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useShortcut } from './use-shortcut.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-shortcut', () => {
  it('Matched shortcut should prevent the default action', async () => {
    await renderHook(() => useShortcut('k', () => undefined));

    const event = new KeyboardEvent('keydown', {
      cancelable: true,
      ctrlKey: true,
      key: 'k',
    });

    dispatchEvent(event);

    assert.strictEqual(event.defaultPrevented, true);
  });

  it('Shortcut key matching should be case-insensitive', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback));

    dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'K' }));

    assert.strictEqual(callback.mock.calls.length, 1);
  });

  it('Ctrl shortcut should run the callback', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback));

    dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' }));

    assert.strictEqual(callback.mock.calls.length, 1);
  });

  it('Command shortcut should run the callback', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback));

    dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));

    assert.strictEqual(callback.mock.calls.length, 1);
  });

  it('Matching key without Ctrl or Command should not run the callback', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback));

    dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));

    assert.strictEqual(callback.mock.calls.length, 0);
  });

  it('Different key with Ctrl should not run the callback', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback));

    dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'p' }));

    assert.strictEqual(callback.mock.calls.length, 0);
  });
});
