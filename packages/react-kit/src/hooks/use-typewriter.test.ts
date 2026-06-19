/**
 * @fileoverview Test for `use-typewriter.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, beforeEach, describe, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useTypewriter } from './use-typewriter.js';

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

describe('use-typewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      now: 0,
      toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'],
    });
  });

  it('Default options should start writing from empty text', async () => {
    const { result } = await renderHook(() => useTypewriter('Hello'));

    const [currentText] = result.current;

    assert.strictEqual(currentText, '');
  });

  it("`mode`: when `mode` is set to `'write'`, initial return value should contain empty text", async () => {
    const { result } = await renderHook(() => useTypewriter('Hello', { mode: 'write' }));

    const [currentText] = result.current;

    assert.strictEqual(currentText, '');
  });

  it("`mode`: when `mode` is set to `'erase'`, initial return value should contain full text", async () => {
    const { result } = await renderHook(() => useTypewriter('Hello', { mode: 'erase' }));

    const [currentText] = result.current;

    assert.strictEqual(currentText, 'Hello');
  });

  it('`writeSpeed`: should respect `writeSpeed` option', async () => {
    const { act, result } = await renderHook(() =>
      useTypewriter('Hello', {
        mode: 'write',
        writeSpeed: RAF_FRAME_DURATION_MS,
      }),
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    assert.strictEqual(secondText, 'H');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    assert.strictEqual(thirdText, 'He');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fourthText] = result.current;

    assert.strictEqual(fourthText, 'Hel');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fifthText] = result.current;

    assert.strictEqual(fifthText, 'Hell');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [sixthText] = result.current;

    assert.strictEqual(sixthText, 'Hello');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [seventhText] = result.current;

    // If we don't use `loop` option, the text should remain visible
    // after writing is complete and never erase, so it should still be 'Hello'
    assert.strictEqual(seventhText, 'Hello');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS * 10);
    });

    const [eighthText] = result.current;

    // If we don't use `loop` option, the text should remain visible
    // after writing is complete and never erase, so it should still be 'Hello'
    assert.strictEqual(eighthText, 'Hello');
  });

  it('`eraseSpeed`: should respect `eraseSpeed` option', async () => {
    const { act, result } = await renderHook(() =>
      useTypewriter('Hello', {
        mode: 'erase',
        eraseSpeed: RAF_FRAME_DURATION_MS,
      }),
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, 'Hello');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    assert.strictEqual(secondText, 'Hell');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    assert.strictEqual(thirdText, 'Hel');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fourthText] = result.current;

    assert.strictEqual(fourthText, 'He');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fifthText] = result.current;

    assert.strictEqual(fifthText, 'H');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [sixthText] = result.current;

    assert.strictEqual(sixthText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [seventhText] = result.current;

    // If we don't use `loop` option, the text should remain invisible
    // after erasing is complete and never write, so it should still be ''
    assert.strictEqual(seventhText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS * 10);
    });

    const [eighthText] = result.current;

    // If we don't use `loop` option, the text should remain invisible
    // after erasing is complete and never write, so it should still be ''
    assert.strictEqual(eighthText, '');
  });

  it('`writePreDelay`: should respect `writePreDelay` option', async () => {
    const { act, result } = await renderHook(() =>
      useTypewriter('Hello', {
        mode: 'write',
        writePreDelay: RAF_FRAME_DURATION_MS * 2, // 2 frames delay before writing starts
      }),
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    // The text should still be empty because `writePreDelay` is 2 frames
    assert.strictEqual(secondText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    // After advancing time by another frame (total 2 frames),
    // the first character should be written
    assert.strictEqual(thirdText, 'H');
  });

  it('`erasePreDelay`: should respect `erasePreDelay` option', async () => {
    const { act, result } = await renderHook(() =>
      useTypewriter('Hello', {
        mode: 'erase',
        erasePreDelay: RAF_FRAME_DURATION_MS * 2, // 2 frames delay before erasing starts
      }),
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, 'Hello');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    // The text should still be full because `erasePreDelay` is 2 frames
    assert.strictEqual(secondText, 'Hello');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    // After advancing time by another frame (total 2 frames),
    // the first character should be erased
    assert.strictEqual(thirdText, 'Hell');
  });

  it('`writePostDelay`: should respect `writePostDelay` option', async () => {
    const { act, result } = await renderHook(() =>
      useTypewriter('A', {
        mode: 'write',
        writePreDelay: RAF_FRAME_DURATION_MS,
        erasePreDelay: RAF_FRAME_DURATION_MS,
        writePostDelay: RAF_FRAME_DURATION_MS * 2, // 2 frames delay after writing completes
        loop: true,
      }),
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    assert.strictEqual(secondText, 'A');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    // The text should still be full because `writePostDelay` is 2 frames
    assert.strictEqual(thirdText, 'A');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fourthText] = result.current;

    // The text should still be full when the mode changes to `'erase'`
    assert.strictEqual(fourthText, 'A');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fifthText] = result.current;

    // After the post delay and erase pre-delay, the text should erase
    assert.strictEqual(fifthText, '');
  });

  it('`erasePostDelay`: should respect `erasePostDelay` option', async () => {
    const { act, result } = await renderHook(() =>
      useTypewriter('A', {
        mode: 'erase',
        writePreDelay: RAF_FRAME_DURATION_MS,
        erasePreDelay: RAF_FRAME_DURATION_MS,
        erasePostDelay: RAF_FRAME_DURATION_MS * 2, // 2 frames delay after erasing completes
        loop: true,
      }),
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, 'A');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    assert.strictEqual(secondText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    // The text should still be empty because `erasePostDelay` is 2 frames
    assert.strictEqual(thirdText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fourthText] = result.current;

    // The text should still be empty when the mode changes to `'write'`
    assert.strictEqual(fourthText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fifthText] = result.current;

    // After the post delay and write pre-delay, the text should write
    assert.strictEqual(fifthText, 'A');
  });

  it('`loop`: should write, erase, and write again when `loop` is enabled', async () => {
    const { act, result } = await renderHook(() =>
      useTypewriter('AB', {
        mode: 'write',
        writeSpeed: RAF_FRAME_DURATION_MS,
        eraseSpeed: RAF_FRAME_DURATION_MS,
        writePreDelay: RAF_FRAME_DURATION_MS,
        erasePreDelay: RAF_FRAME_DURATION_MS,
        writePostDelay: RAF_FRAME_DURATION_MS,
        erasePostDelay: RAF_FRAME_DURATION_MS,
        loop: true,
      }),
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    assert.strictEqual(secondText, 'A');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    assert.strictEqual(thirdText, 'AB');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fourthText] = result.current;

    // The text should stay full while switching from write to erase
    assert.strictEqual(fourthText, 'AB');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fifthText] = result.current;

    assert.strictEqual(fifthText, 'A');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [sixthText] = result.current;

    assert.strictEqual(sixthText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [seventhText] = result.current;

    // The text should stay empty while switching from erase to write
    assert.strictEqual(seventhText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [eighthText] = result.current;

    assert.strictEqual(eighthText, 'A');
  });

  it('`pause`: should pause and resume writing when `pause` changes', async () => {
    const { act, rerender, result } = await renderHook(
      (props?: { pause: boolean }) =>
        useTypewriter('AB', {
          mode: 'write',
          writeSpeed: RAF_FRAME_DURATION_MS,
          writePreDelay: RAF_FRAME_DURATION_MS,
          pause: props?.pause ?? false,
        }),
      {
        initialProps: { pause: false },
      },
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    assert.strictEqual(secondText, 'A');

    await rerender({ pause: true }); // Pause writing

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS * 8);
    });

    const [thirdText] = result.current;

    assert.strictEqual(thirdText, 'A');

    await rerender({ pause: false }); // Resume writing

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fourthText] = result.current;

    assert.strictEqual(fourthText, 'AB');
  });

  it('`onWriteComplete`: should call `onWriteComplete` after writing completes', async () => {
    const onWriteComplete = vi.fn();

    const { act, result } = await renderHook(() =>
      useTypewriter('AB', {
        mode: 'write',
        writeSpeed: RAF_FRAME_DURATION_MS,
        writePreDelay: RAF_FRAME_DURATION_MS,
        writePostDelay: RAF_FRAME_DURATION_MS,
        onWriteComplete,
      }),
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, '');
    assert.strictEqual(onWriteComplete.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    assert.strictEqual(secondText, 'A');
    assert.strictEqual(onWriteComplete.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    assert.strictEqual(thirdText, 'AB');
    assert.strictEqual(onWriteComplete.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fourthText] = result.current;

    assert.strictEqual(fourthText, 'AB');
    assert.strictEqual(onWriteComplete.mock.calls.length, 1);
  });

  it('`onWriteComplete`: should not restart `writePostDelay` when `onWriteComplete` changes (related to `useEffectEvent`)', async () => {
    // This test verifies `useEffectEvent` behavior because, without it,
    // changing `onWriteComplete` would first run the effect cleanup, then
    // rerun the effect, and finally schedule the `setTimeoutRaf` timer again
    // for the full `writePostDelay`.

    const onWriteComplete1 = vi.fn();
    const onWriteComplete2 = vi.fn();

    const { act, rerender, result } = await renderHook(
      (props?: { onWriteComplete: () => void }) =>
        useTypewriter('A', {
          mode: 'write',
          writeSpeed: RAF_FRAME_DURATION_MS,
          writePreDelay: RAF_FRAME_DURATION_MS,
          writePostDelay: RAF_FRAME_DURATION_MS * 3,
          onWriteComplete: props?.onWriteComplete,
        }),
      {
        initialProps: { onWriteComplete: onWriteComplete1 },
      },
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, '');
    assert.strictEqual(onWriteComplete1.mock.calls.length, 0);
    assert.strictEqual(onWriteComplete2.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    assert.strictEqual(secondText, 'A');
    assert.strictEqual(onWriteComplete1.mock.calls.length, 0);
    assert.strictEqual(onWriteComplete2.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    assert.strictEqual(thirdText, 'A');
    assert.strictEqual(onWriteComplete1.mock.calls.length, 0);
    assert.strictEqual(onWriteComplete2.mock.calls.length, 0);

    await rerender({ onWriteComplete: onWriteComplete2 });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS * 2);
    });

    const [fourthText] = result.current;

    assert.strictEqual(fourthText, 'A');
    assert.strictEqual(onWriteComplete1.mock.calls.length, 0);
    assert.strictEqual(onWriteComplete2.mock.calls.length, 1);
  });

  it('`onEraseComplete`: should call `onEraseComplete` after erasing completes', async () => {
    const onEraseComplete = vi.fn();

    const { act, result } = await renderHook(() =>
      useTypewriter('AB', {
        mode: 'erase',
        eraseSpeed: RAF_FRAME_DURATION_MS,
        erasePreDelay: RAF_FRAME_DURATION_MS,
        erasePostDelay: RAF_FRAME_DURATION_MS,
        onEraseComplete,
      }),
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, 'AB');
    assert.strictEqual(onEraseComplete.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    assert.strictEqual(secondText, 'A');
    assert.strictEqual(onEraseComplete.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    assert.strictEqual(thirdText, '');
    assert.strictEqual(onEraseComplete.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fourthText] = result.current;

    assert.strictEqual(fourthText, '');
    assert.strictEqual(onEraseComplete.mock.calls.length, 1);
  });

  it('`onEraseComplete`: should not restart `erasePostDelay` when `onEraseComplete` changes (related to `useEffectEvent`)', async () => {
    // This test verifies `useEffectEvent` behavior because, without it,
    // changing `onEraseComplete` would first run the effect cleanup, then
    // rerun the effect, and finally schedule the `setTimeoutRaf` timer again
    // for the full `erasePostDelay`.

    const onEraseComplete1 = vi.fn();
    const onEraseComplete2 = vi.fn();

    const { act, rerender, result } = await renderHook(
      (props?: { onEraseComplete: () => void }) =>
        useTypewriter('A', {
          mode: 'erase',
          eraseSpeed: RAF_FRAME_DURATION_MS,
          erasePreDelay: RAF_FRAME_DURATION_MS,
          erasePostDelay: RAF_FRAME_DURATION_MS * 3,
          onEraseComplete: props?.onEraseComplete,
        }),
      {
        initialProps: { onEraseComplete: onEraseComplete1 },
      },
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, 'A');
    assert.strictEqual(onEraseComplete1.mock.calls.length, 0);
    assert.strictEqual(onEraseComplete2.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    assert.strictEqual(secondText, '');
    assert.strictEqual(onEraseComplete1.mock.calls.length, 0);
    assert.strictEqual(onEraseComplete2.mock.calls.length, 0);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    assert.strictEqual(thirdText, '');
    assert.strictEqual(onEraseComplete1.mock.calls.length, 0);
    assert.strictEqual(onEraseComplete2.mock.calls.length, 0);

    await rerender({ onEraseComplete: onEraseComplete2 });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS * 2);
    });

    const [fourthText] = result.current;

    assert.strictEqual(fourthText, '');
    assert.strictEqual(onEraseComplete1.mock.calls.length, 0);
    assert.strictEqual(onEraseComplete2.mock.calls.length, 1);
  });
});
