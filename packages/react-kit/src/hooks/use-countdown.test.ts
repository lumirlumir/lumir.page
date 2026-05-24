/**
 * @fileoverview Test for `use-countdown.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, beforeEach, describe, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useCountdown } from './use-countdown.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-countdown', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      now: 0,
      toFake: ['setTimeout', 'clearTimeout', 'performance'],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Initial return value should use the provided duration and idle controls', async () => {
    const { result } = await renderHook(() => useCountdown({ durationMs: 3_000 }));
    const [remainingMs, countdown] = result.current;

    assert.strictEqual(remainingMs, 3_000);
    assert.strictEqual(typeof countdown.reset, 'function');
    assert.strictEqual(typeof countdown.start, 'function');
    assert.strictEqual(typeof countdown.stop, 'function');
  });

  it('`start`: should count down by the default interval', async () => {
    const { act, result } = await renderHook(() => useCountdown({ durationMs: 3_000 }));

    await act(async () => {
      result.current[1].start();
    });

    const [firstMs, firstCountdown] = result.current;

    assert.strictEqual(firstMs, 3_000);
    assert.strictEqual(typeof firstCountdown.stop, 'function');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    const [secondMs] = result.current;

    assert.strictEqual(secondMs, 2_000);
  });

  it('`intervalMs`: should control the delay between countdown updates', async () => {
    const { act, result } = await renderHook(() =>
      useCountdown({ durationMs: 1_500, intervalMs: 500 }),
    );

    await act(async () => {
      result.current[1].start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    const [secondMs] = result.current;

    assert.strictEqual(secondMs, 1_000);
  });

  it('`reset`: should use the latest duration option before starting', async () => {
    const { act, rerender, result } = await renderHook(
      (props: { durationMs: number }) => useCountdown({ durationMs: props.durationMs }),
      {
        initialProps: { durationMs: 1_000 },
      },
    );

    await rerender({ durationMs: 3_000 });

    await act(async () => {
      result.current[1].reset();
      result.current[1].start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    const [remainingMs] = result.current;

    assert.strictEqual(remainingMs, 2_000);
  });

  it('`stop`: should pause the countdown and preserve the remaining time', async () => {
    const { act, result } = await renderHook(() => useCountdown({ durationMs: 3_000 }));

    await act(async () => {
      result.current[1].start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_000);
    });

    await act(async () => {
      result.current[1].stop();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2_000);
    });

    const [remainingMs] = result.current;

    assert.strictEqual(remainingMs, 2_000);
  });

  it('`reset`: should restore the latest default duration and pause the countdown', async () => {
    const { act, result } = await renderHook(() => useCountdown({ durationMs: 3_000 }));

    await act(async () => {
      result.current[1].start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_000);
    });

    await act(async () => {
      result.current[1].reset();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_000);
    });

    const [remainingMs] = result.current;

    assert.strictEqual(remainingMs, 3_000);
  });

  it('`onComplete`: should run once when the countdown reaches zero', async () => {
    const onComplete = vi.fn();
    const { act, result } = await renderHook(() =>
      useCountdown({ durationMs: 2_000, onComplete }),
    );

    await act(async () => {
      result.current[1].start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_000);
    });

    const [secondMs] = result.current;

    assert.strictEqual(secondMs, 1_000);
    assert.strictEqual(onComplete.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_000);
    });

    const [thirdMs] = result.current;

    assert.strictEqual(thirdMs, 0);
    assert.strictEqual(onComplete.mock.calls.length, 1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3_000);
    });

    assert.strictEqual(onComplete.mock.calls.length, 1);
  });

  it('`onComplete`: should use the latest callback after rerender', async () => {
    const firstOnComplete = vi.fn();
    const secondOnComplete = vi.fn();
    const { act, rerender, result } = await renderHook(
      (props: { onComplete: () => void }) =>
        useCountdown({
          durationMs: 1_000,
          onComplete: props.onComplete,
        }),
      {
        initialProps: { onComplete: firstOnComplete },
      },
    );

    await act(async () => {
      result.current[1].start();
    });

    await rerender({ onComplete: secondOnComplete });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_000);
    });

    assert.strictEqual(firstOnComplete.mock.calls.length, 0);
    assert.strictEqual(secondOnComplete.mock.calls.length, 1);
  });

  it('`start`: should remain idle after completion until the countdown is reset', async () => {
    const { act, result } = await renderHook(() => useCountdown({ durationMs: 1_000 }));

    await act(async () => {
      result.current[1].start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_000);
    });

    const [completeMs] = result.current;

    assert.strictEqual(completeMs, 0);

    await act(async () => {
      result.current[1].start();
    });

    const [idleMs] = result.current;

    assert.strictEqual(idleMs, 0);
  });

  it('`reset` and `start`: should restart from the default duration after completion', async () => {
    const { act, result } = await renderHook(() => useCountdown({ durationMs: 1_000 }));

    await act(async () => {
      result.current[1].start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1_000);
    });

    const [completeMs] = result.current;

    assert.strictEqual(completeMs, 0);

    await act(async () => {
      result.current[1].reset();
      result.current[1].start();
    });

    const [restartedMs] = result.current;

    assert.strictEqual(restartedMs, 1_000);
  });
});
