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
      key: 'k',
    });

    dispatchEvent(event);

    assert.strictEqual(event.defaultPrevented, true);
  });

  it('Shortcut key matching should be case-insensitive', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback));

    dispatchEvent(new KeyboardEvent('keydown', { key: 'K' }));

    assert.strictEqual(callback.mock.calls.length, 1);
  });

  it('Ctrl shortcut should run the callback when `ctrlKey` is true', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback, { ctrlKey: true }));

    dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' }));

    assert.strictEqual(callback.mock.calls.length, 1);
  });

  it('Command shortcut should run the callback when `metaKey` is true', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback, { metaKey: true }));

    dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));

    assert.strictEqual(callback.mock.calls.length, 1);
  });

  it('Ctrl shortcut should not run the callback when `ctrlKey` uses its false default', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback));

    dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' }));

    assert.strictEqual(callback.mock.calls.length, 0);
  });

  it('Command shortcut should not run the callback when `metaKey` uses its false default', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback));

    dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));

    assert.strictEqual(callback.mock.calls.length, 0);
  });

  it('Shortcut typed in a focused input should not run the callback', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback));
    const input = document.createElement('input');

    document.body.append(input);
    input.focus();
    input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'k' }));
    input.remove();

    assert.strictEqual(callback.mock.calls.length, 0);
  });

  it('Shortcut typed in a focused textarea should not run the callback', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback));
    const textarea = document.createElement('textarea');

    document.body.append(textarea);
    textarea.focus();
    textarea.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'k' }));
    textarea.remove();

    assert.strictEqual(callback.mock.calls.length, 0);
  });

  it('Shortcut typed in a focused select should not run the callback', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback));
    const select = document.createElement('select');

    document.body.append(select);
    select.focus();
    select.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'k' }));
    select.remove();

    assert.strictEqual(callback.mock.calls.length, 0);
  });

  it('Shortcut typed in focused contenteditable content should not run the callback', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback));
    const contenteditable = document.createElement('div');

    contenteditable.contentEditable = 'true';
    document.body.append(contenteditable);
    contenteditable.focus();
    contenteditable.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'k' }),
    );
    contenteditable.remove();

    assert.strictEqual(callback.mock.calls.length, 0);
  });

  it('Different key should not run the callback', async () => {
    const callback = vi.fn();
    await renderHook(() => useShortcut('k', callback));

    dispatchEvent(new KeyboardEvent('keydown', { key: 'p' }));

    assert.strictEqual(callback.mock.calls.length, 0);
  });
});
