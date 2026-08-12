/**
 * @fileoverview Test for `use-scroll-progress.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, beforeEach, describe, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useScrollProgress } from './use-scroll-progress.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * `1000ms / 60fps ≈ 16.67ms` per frame, so we can use `16ms`
 * as a close approximation for the duration of one animation frame.
 */
const RAF_FRAME_DURATION_MS = 16;

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-scroll-progress', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      now: 0,
      toFake: ['requestAnimationFrame', 'cancelAnimationFrame'],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Initial animation frame should report the current normalized document scroll progress', async () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2_000);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1_000);
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(250);
    const onProgress = vi.fn();

    const { act } = await renderHook(() => useScrollProgress(onProgress));

    assert.strictEqual(onProgress.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.deepStrictEqual(onProgress.mock.calls, [[0.25]]);
  });

  it('Non-scrollable document should report zero progress', async () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(800);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1_000);
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(100);
    const onProgress = vi.fn();

    const { act } = await renderHook(() => useScrollProgress(onProgress));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.deepStrictEqual(onProgress.mock.calls, [[0]]);
  });

  it('Reported progress should be rounded to three decimal places', async () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2_000);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1_000);
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(123.456);
    const onProgress = vi.fn();

    const { act } = await renderHook(() => useScrollProgress(onProgress));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.deepStrictEqual(onProgress.mock.calls, [[0.123]]);
  });

  it('Negative document scroll position should report zero progress', async () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2_000);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1_000);
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(-100);
    const onProgress = vi.fn();

    const { act } = await renderHook(() => useScrollProgress(onProgress));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.deepStrictEqual(onProgress.mock.calls, [[0]]);
  });

  it('Document scroll position beyond the maximum should report complete progress', async () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2_000);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1_000);
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(1_100);
    const onProgress = vi.fn();

    const { act } = await renderHook(() => useScrollProgress(onProgress));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.deepStrictEqual(onProgress.mock.calls, [[1]]);
  });

  it('Multiple scroll events before the next animation frame should report progress once', async () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2_000);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1_000);
    const scrollY = vi.spyOn(window, 'scrollY', 'get').mockReturnValue(100);
    const requestFrame = vi.spyOn(window, 'requestAnimationFrame');
    const onProgress = vi.fn();

    const { act } = await renderHook(() => useScrollProgress(onProgress));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.deepStrictEqual(onProgress.mock.calls, [[0.1]]);
    assert.strictEqual(requestFrame.mock.calls.length, 1);

    onProgress.mockClear();
    scrollY.mockReturnValue(500);
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('scroll'));

    assert.strictEqual(requestFrame.mock.calls.length, 2);
    assert.strictEqual(onProgress.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.deepStrictEqual(onProgress.mock.calls, [[0.5]]);
  });

  it('Resize event should report progress using the updated viewport height', async () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2_000);
    const innerHeight = vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1_000);
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(500);
    const onProgress = vi.fn();

    const { act } = await renderHook(() => useScrollProgress(onProgress));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.deepStrictEqual(onProgress.mock.calls, [[0.5]]);

    onProgress.mockClear();
    innerHeight.mockReturnValue(1_500);
    window.dispatchEvent(new Event('resize'));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.deepStrictEqual(onProgress.mock.calls, [[1]]);
  });

  it('Changed callback should receive a pending progress update without restarting the animation frame', async () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2_000);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1_000);
    const scrollY = vi.spyOn(window, 'scrollY', 'get').mockReturnValue(100);
    const onProgress1 = vi.fn();
    const onProgress2 = vi.fn();

    const { act, rerender } = await renderHook(
      (props?: { onProgress: (progress: number) => void }) =>
        useScrollProgress(props!.onProgress),
      {
        initialProps: { onProgress: onProgress1 },
      },
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.deepStrictEqual(onProgress1.mock.calls, [[0.1]]);
    assert.strictEqual(onProgress2.mock.calls.length, 0);

    onProgress1.mockClear();
    scrollY.mockReturnValue(500);
    window.dispatchEvent(new Event('scroll'));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS / 2);
    });

    await rerender({ onProgress: onProgress2 });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS / 2);
    });

    assert.strictEqual(onProgress1.mock.calls.length, 0);
    assert.strictEqual(onProgress2.mock.calls.length, 1);
    assert.deepStrictEqual(onProgress2.mock.calls, [[0.5]]);
  });

  it('Unmount should cancel the pending update and remove document progress listeners', async () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2_000);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1_000);
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(500);
    const onProgress = vi.fn();

    const { act, unmount } = await renderHook(() => useScrollProgress(onProgress));

    await act(async () => {
      unmount();
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('resize'));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.strictEqual(onProgress.mock.calls.length, 0);
  });
});
