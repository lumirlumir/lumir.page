/**
 * @fileoverview `useCountdown` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCallback, useEffect, useEffectEvent, useMemo, useReducer } from 'react';

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
   * @default 100
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

/**
 * Normalizes a millisecond value by ensuring it's a finite number and not negative.
 */
function normalizeMs(ms: number) {
  if (Number.isFinite(ms)) {
    return Math.max(0, ms);
  } else {
    return 0;
  }
}

/**
 * Reducer function to manage the countdown state based on dispatched actions.
 */
function countdownReducer(
  state: { isActive: boolean; remainingMs: number },
  action:
    | { type: 'tick'; elapsedMs: number }
    | { type: 'start' }
    | { type: 'stop' }
    | { type: 'reset'; durationMs: number },
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
        remainingMs: normalizeMs(action.durationMs),
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
  intervalMs = 100,
  onComplete = undefined,
}: UseCountdownOptions): readonly [remainingMs: number, countdown: UseCountdownControls] {
  const normalizedDurationMs = normalizeMs(durationMs);
  const normalizedIntervalMs = normalizeMs(intervalMs);

  const [state, dispatch] = useReducer(countdownReducer, normalizedDurationMs, ms => ({
    isActive: false,
    remainingMs: ms,
  }));

  const onCompleteEvent = useEffectEvent(() => {
    onComplete?.();
  });

  useEffect(() => {
    if (!state.isActive || normalizedIntervalMs === 0) {
      return undefined;
    }

    const startedAtMs = performance.now();

    const timeout = setTimeout(
      () => {
        const elapsedMs = performance.now() - startedAtMs;

        dispatch({ type: 'tick', elapsedMs });

        if (elapsedMs >= state.remainingMs) {
          onCompleteEvent();
        }
      },
      Math.min(normalizedIntervalMs, state.remainingMs),
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [normalizedIntervalMs, state.isActive, state.remainingMs]);

  const start = useCallback(() => {
    dispatch({ type: 'start' });
  }, []);

  const stop = useCallback(() => {
    dispatch({ type: 'stop' });
  }, []);

  const reset = useCallback(
    (nextDurationMs = normalizedDurationMs) => {
      dispatch({ type: 'reset', durationMs: nextDurationMs });
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
