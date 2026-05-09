/**
 * @fileoverview `useCountdown` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCallback, useEffect, useMemo, useReducer } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `useCountdown` hook.
 */
export interface UseCountdownOptions {
  /**
   * Initial countdown duration in milliseconds.
   */
  durationMs: number;

  /**
   * Interval between countdown updates in milliseconds.
   * @default 1_000
   */
  intervalMs?: number | undefined;

  /**
   * Callback function invoked when the countdown reaches zero.
   * @default undefined
   */
  onComplete?: (() => void) | undefined;
}

/**
 * Imperative countdown controls.
 */
export interface UseCountdownControls {
  /**
   * Starts or resumes the countdown. If the countdown is already active, this has no effect.
   */
  start: () => void;

  /**
   * Stops the countdown. If the countdown is already stopped, this has no effect.
   */
  stop: () => void;

  /**
   * Resets the countdown to the initial duration or an optional new duration, and stops it.
   */
  reset: (durationMs?: UseCountdownOptions['durationMs']) => void;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function normalizeMs(ms: number) {
  if (Number.isFinite(ms)) {
    return Math.max(0, ms);
  } else {
    return 0;
  }
}

function countdownReducer(
  state: { isActive: boolean; remainingMs: number },
  action:
    | { type: 'reset'; remainingMs: number }
    | { type: 'start' }
    | { type: 'stop' }
    | { type: 'tick'; elapsedMs: number },
) {
  switch (action.type) {
    case 'tick': {
      const remainingMs = normalizeMs(state.remainingMs - action.elapsedMs);

      return {
        isActive: remainingMs > 0,
        remainingMs,
      };
    }

    case 'start': {
      const remainingMs = normalizeMs(state.remainingMs);

      return {
        isActive: remainingMs > 0,
        remainingMs,
      };
    }

    case 'stop':
      return {
        ...state,
        isActive: false,
      };

    case 'reset': {
      return {
        isActive: false,
        remainingMs: normalizeMs(action.remainingMs),
      };
    }

    default:
      return state;
  }
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * React hook for a controllable countdown.
 *
 * @example
 * ```tsx
 * import { useCountdown } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const [remainingMs, countdown] = useCountdown({
 *     durationMs: 60_000,
 *     onComplete: () => console.log('done'),
 *   });
 *
 *   return (
 *     <button type="button" onClick={() => countdown.start()}>
 *       {remainingMs}
 *     </button>
 *   );
 * }
 * ```
 */
export function useCountdown({
  durationMs,
  intervalMs = 1_000,
  onComplete = undefined,
}: UseCountdownOptions): readonly [remainingMs: number, countdown: UseCountdownControls] {
  const normalizedDurationMs = normalizeMs(durationMs);
  const normalizedIntervalMs = normalizeMs(intervalMs);

  const [state, dispatch] = useReducer(countdownReducer, normalizedDurationMs, ms => ({
    isActive: false,
    remainingMs: ms,
  }));

  useEffect(() => {
    if (!state.isActive || normalizedIntervalMs === 0) {
      return undefined;
    }

    const startedAtMs = performance.now();

    const timeout = setTimeout(
      () => {
        const elapsedMs = normalizeMs(performance.now() - startedAtMs);

        dispatch({ type: 'tick', elapsedMs });

        if (elapsedMs >= state.remainingMs) {
          onComplete?.();
        }
      },
      Math.min(normalizedIntervalMs, state.remainingMs),
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [onComplete, normalizedIntervalMs, state.isActive, state.remainingMs]);

  const start = useCallback(() => {
    dispatch({ type: 'start' });
  }, []);

  const stop = useCallback(() => {
    dispatch({ type: 'stop' });
  }, []);

  const reset = useCallback(
    (nextDurationMs = normalizedDurationMs) => {
      dispatch({ type: 'reset', remainingMs: nextDurationMs });
    },
    [normalizedDurationMs],
  );

  return [
    state.remainingMs,
    useMemo(
      () => ({
        start,
        stop,
        reset,
      }),
      [start, stop, reset],
    ),
  ] as const;
}
