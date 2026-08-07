/**
 * @fileoverview Test for `typewriter.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, beforeEach, describe, it, vi } from 'vitest';
import { render, renderHook } from 'vitest-browser-react';
import { Typewriter } from './typewriter.js';

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

describe('typewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      now: 0,
      toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'],
    });
  });

  it('Initial render should have default values', async () => {
    const { act } = await renderHook(() => undefined);
    const screen = await render(
      <Typewriter text="A" writePreDelay={RAF_FRAME_DURATION_MS} />,
    );
    const typewriter = screen.container.querySelector('span');
    const cursor = typewriter?.querySelector('span');

    assert.ok(typewriter);
    assert.ok(cursor);

    assert.strictEqual(cursor.className, 'cursor');
    assert.strictEqual(cursor.getAttribute('aria-hidden'), 'true');

    assert.strictEqual(typewriter.textContent, '|');
    assert.strictEqual(cursor.textContent, '|');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.strictEqual(typewriter.textContent, 'A|');
    assert.strictEqual(cursor.textContent, '|');
  });

  it('Should apply custom cursor props and span attributes', async () => {
    const { act } = await renderHook(() => undefined);
    const screen = await render(
      <Typewriter
        cursor="_"
        cursorClassName="custom"
        text="A"
        writePreDelay={RAF_FRAME_DURATION_MS}
        className="typewriter"
        aria-label="typewriter text"
        style={{ whiteSpace: 'pre' }}
      />,
    );
    const typewriter = screen.container.querySelector('span');
    const cursor = typewriter?.querySelector('span');

    assert.ok(typewriter);
    assert.ok(cursor);

    assert.strictEqual(typewriter.className, 'typewriter');
    assert.strictEqual(typewriter.getAttribute('aria-label'), 'typewriter text');
    assert.strictEqual(typewriter.getAttribute('style'), 'white-space: pre;');
    assert.strictEqual(cursor.className, 'custom');

    assert.strictEqual(typewriter.textContent, '_');
    assert.strictEqual(cursor.textContent, '_');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.strictEqual(typewriter.textContent, 'A_');
    assert.strictEqual(cursor.textContent, '_');
  });

  it('Should render no visible cursor when cursor is `null`', async () => {
    const { act } = await renderHook(() => undefined);
    const screen = await render(
      <Typewriter cursor={null} text="A" writePreDelay={RAF_FRAME_DURATION_MS} />,
    );
    const typewriter = screen.container.querySelector('span');
    const cursor = typewriter?.querySelector('span');

    assert.ok(typewriter);
    assert.ok(cursor);

    assert.strictEqual(typewriter.textContent, '');
    assert.strictEqual(cursor.textContent, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    assert.strictEqual(typewriter.textContent, 'A');
    assert.strictEqual(cursor.textContent, '');
  });
});
