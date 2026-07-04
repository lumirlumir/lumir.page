/**
 * @fileoverview Test for `use-countdown.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, beforeEach, describe, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useCountdown } from './use-countdown.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const COUNTDOWN_INTERVAL_MS = 100;

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-countdown', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      now: 0,
      toFake: ['setInterval', 'clearInterval'],
    });
  });

  it('Default return value should contain the initial count and setter function', async () => {
    const { result } = await renderHook(() => useCountdown(1_000));

    const [currentCount, setCurrentCount] = result.current;

    assert.strictEqual(currentCount, 1_000);
    assert.strictEqual(typeof setCurrentCount, 'function');
  });

  it('`interval`: should decrease the count by interval on each tick', async () => {
    const { act, result } = await renderHook(() =>
      useCountdown(300, { interval: COUNTDOWN_INTERVAL_MS }),
    );

    const [firstCount] = result.current;

    assert.strictEqual(firstCount, 300);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
    });

    const [secondCount] = result.current;

    assert.strictEqual(secondCount, 200);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
    });

    const [thirdCount] = result.current;

    assert.strictEqual(thirdCount, 100);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
    });

    const [fourthCount] = result.current;

    assert.strictEqual(fourthCount, 0);
  });

  it('`interval`: should clamp the count to zero when interval is larger than the remaining count', async () => {
    const { act, result } = await renderHook(() =>
      useCountdown(150, { interval: COUNTDOWN_INTERVAL_MS }),
    );

    const [firstCount] = result.current;

    assert.strictEqual(firstCount, 150);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
    });

    const [secondCount] = result.current;

    assert.strictEqual(secondCount, 50);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
    });

    const [thirdCount] = result.current;

    assert.strictEqual(thirdCount, 0);
  });

  it('`setCurrentCount`: should replace the current count and continue ticking from the new value', async () => {
    const { act, result } = await renderHook(() =>
      useCountdown(300, { interval: COUNTDOWN_INTERVAL_MS }),
    );

    const [firstCount, setCurrentCount] = result.current;

    assert.strictEqual(firstCount, 300);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
    });

    const [secondCount] = result.current;

    assert.strictEqual(secondCount, 200);

    await act(async () => {
      setCurrentCount(500);
    });

    const [thirdCount] = result.current;

    assert.strictEqual(thirdCount, 500);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
    });

    const [fourthCount] = result.current;

    assert.strictEqual(fourthCount, 400);
  });

  it('`onTick`: should call `onTick` when the countdown value decreases', async () => {
    const onTick = vi.fn();

    const { act, result } = await renderHook(() =>
      useCountdown(300, {
        interval: COUNTDOWN_INTERVAL_MS,
        onTick,
      }),
    );

    const [firstCount] = result.current;

    assert.strictEqual(firstCount, 300);
    assert.strictEqual(onTick.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
    });

    const [secondCount] = result.current;

    assert.strictEqual(secondCount, 200);
    assert.strictEqual(onTick.mock.calls.length, 1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
    });

    const [thirdCount] = result.current;

    assert.strictEqual(thirdCount, 100);
    assert.strictEqual(onTick.mock.calls.length, 2);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
    });

    const [fourthCount] = result.current;

    assert.strictEqual(fourthCount, 0);
    assert.strictEqual(onTick.mock.calls.length, 3);
  });

  it.todo(
    '`onComplete`: should call `onComplete` once when the countdown reaches zero',
    async () => {
      const onComplete = vi.fn();

      const { act, result } = await renderHook(() =>
        useCountdown(200, {
          interval: COUNTDOWN_INTERVAL_MS,
          onComplete,
        }),
      );

      const [firstCount] = result.current;

      assert.strictEqual(firstCount, 200);
      assert.strictEqual(onComplete.mock.calls.length, 0);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
      });

      const [secondCount] = result.current;

      assert.strictEqual(secondCount, 100);
      assert.strictEqual(onComplete.mock.calls.length, 0);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
      });

      const [thirdCount] = result.current;

      assert.strictEqual(thirdCount, 0);
      assert.strictEqual(onComplete.mock.calls.length, 1);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS * 3);
      });

      const [fourthCount] = result.current;

      assert.strictEqual(fourthCount, 0);
      assert.strictEqual(onComplete.mock.calls.length, 1);
    },
  );

  it.todo(
    '`onComplete`: should not call `onComplete` when initial count is zero',
    async () => {
      const onComplete = vi.fn();

      const { act, result } = await renderHook(() =>
        useCountdown(0, {
          interval: COUNTDOWN_INTERVAL_MS,
          onComplete,
        }),
      );

      const [firstCount] = result.current;

      assert.strictEqual(firstCount, 0);
      assert.strictEqual(onComplete.mock.calls.length, 0);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS * 3);
      });

      const [secondCount] = result.current;

      assert.strictEqual(secondCount, 0);
      assert.strictEqual(onComplete.mock.calls.length, 0);
    },
  );

  it.todo(
    '`onComplete`: should call the latest `onComplete` callback when it changes (related to `useEffectEvent`)',
    async () => {
      // This test verifies `useEffectEvent` behavior because, without it,
      // changing `onComplete` would first run the effect cleanup, then
      // rerun the effect, and finally schedule the `setInterval` timer again
      // for the full `interval` duration.

      const onComplete1 = vi.fn();
      const onComplete2 = vi.fn();

      const { act, rerender, result } = await renderHook(
        (props?: { onComplete: () => void }) =>
          useCountdown(200, {
            interval: COUNTDOWN_INTERVAL_MS,
            onComplete: props?.onComplete,
          }),
        {
          initialProps: { onComplete: onComplete1 },
        },
      );

      const [firstCount] = result.current;

      assert.strictEqual(firstCount, 200);
      assert.strictEqual(onComplete1.mock.calls.length, 0);
      assert.strictEqual(onComplete2.mock.calls.length, 0);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
      });

      const [secondCount] = result.current;

      assert.strictEqual(secondCount, 100);
      assert.strictEqual(onComplete1.mock.calls.length, 0);
      assert.strictEqual(onComplete2.mock.calls.length, 0);

      await rerender({ onComplete: onComplete2 });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
      });

      const [thirdCount] = result.current;

      assert.strictEqual(thirdCount, 0);
      assert.strictEqual(onComplete1.mock.calls.length, 0);
      assert.strictEqual(onComplete2.mock.calls.length, 1);
    },
  );

  it.todo(
    '`onTick`: should call the latest `onTick` callback when it changes (related to `useEffectEvent`)',
    async () => {
      // This test verifies `useEffectEvent` behavior because, without it,
      // changing `onTick` would first run the effect cleanup, then
      // rerun the effect, and finally schedule the `setInterval` timer again
      // for the full `interval` duration.

      const onTick1 = vi.fn();
      const onTick2 = vi.fn();

      const { act, rerender, result } = await renderHook(
        (props?: { onTick: () => void }) =>
          useCountdown(300, {
            interval: COUNTDOWN_INTERVAL_MS,
            onTick: props?.onTick,
          }),
        {
          initialProps: { onTick: onTick1 },
        },
      );

      const [firstCount] = result.current;

      assert.strictEqual(firstCount, 300);
      assert.strictEqual(onTick1.mock.calls.length, 0);
      assert.strictEqual(onTick2.mock.calls.length, 0);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
      });

      const [secondCount] = result.current;

      assert.strictEqual(secondCount, 200);
      assert.strictEqual(onTick1.mock.calls.length, 1);
      assert.strictEqual(onTick2.mock.calls.length, 0);

      await rerender({ onTick: onTick2 });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(COUNTDOWN_INTERVAL_MS);
      });

      const [thirdCount] = result.current;

      assert.strictEqual(thirdCount, 100);
      assert.strictEqual(onTick1.mock.calls.length, 1);
      assert.strictEqual(onTick2.mock.calls.length, 1);
    },
  );
});
