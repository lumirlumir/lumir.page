/**
 * @fileoverview Test for `use-scroll.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, describe, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useScroll } from './use-scroll.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-scroll', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Default return value should contain an empty ref and scroll controller functions', async () => {
    const { result } = await renderHook(() => useScroll());
    const [ref, scroll] = result.current;

    assert.strictEqual(ref.current, null);
    assert.strictEqual(typeof scroll.intoView, 'function');
    assert.strictEqual(typeof scroll.to, 'function');
  });

  it('`intoView`: should do nothing when the ref has no current element', async () => {
    const scrollIntoView = vi
      .spyOn(Element.prototype, 'scrollIntoView')
      .mockImplementation(() => {});

    const { result } = await renderHook(() => useScroll());
    const [, scroll] = result.current;

    scroll.intoView();

    assert.strictEqual(scrollIntoView.mock.calls.length, 0);
  });

  it("`intoView`: should scroll the current element with default `'auto'` behavior", async () => {
    const scrollIntoView = vi
      .spyOn(Element.prototype, 'scrollIntoView')
      .mockImplementation(() => {});

    const { result } = await renderHook(() => useScroll<HTMLDivElement>());
    const [ref, scroll] = result.current;

    ref.current = document.createElement('div');

    scroll.intoView();

    assert.strictEqual(scrollIntoView.mock.calls.length, 1);
    assert.deepStrictEqual(scrollIntoView.mock.calls[0] as unknown[], [
      {
        behavior: 'auto',
      },
    ]);
  });

  it('`intoView`: per-call options should override default hook options', async () => {
    const scrollIntoView = vi
      .spyOn(Element.prototype, 'scrollIntoView')
      .mockImplementation(() => {});

    const { result } = await renderHook(() =>
      useScroll<HTMLDivElement>({ behavior: 'smooth' }),
    );
    const [ref, scroll] = result.current;

    ref.current = document.createElement('div');

    scroll.intoView({
      behavior: 'instant',
      block: 'center',
      inline: 'end',
    });

    assert.strictEqual(scrollIntoView.mock.calls.length, 1);
    assert.deepStrictEqual(scrollIntoView.mock.calls[0] as unknown[], [
      {
        behavior: 'instant',
        block: 'center',
        inline: 'end',
      },
    ]);
  });

  it("`to`: should scroll the window with default `'auto'` behavior", async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    const { result } = await renderHook(() => useScroll());
    const [, scroll] = result.current;

    scroll.to();

    assert.strictEqual(scrollTo.mock.calls.length, 1);
    assert.deepStrictEqual(scrollTo.mock.calls[0] as unknown[], [
      {
        behavior: 'auto',
      },
    ]);
  });

  it('`to`: per-call options should override default hook options', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    const { result } = await renderHook(() => useScroll({ behavior: 'smooth' }));
    const [, scroll] = result.current;

    scroll.to({
      behavior: 'instant',
      left: 10,
      top: 20,
    });

    assert.strictEqual(scrollTo.mock.calls.length, 1);
    assert.deepStrictEqual(scrollTo.mock.calls[0] as unknown[], [
      {
        behavior: 'instant',
        left: 10,
        top: 20,
      },
    ]);
  });
});
