/**
 * @fileoverview `useCountdown` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useReducer,
  useRef,
} from 'react';

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
    | { type: 'sync'; remainingMs: number }
    | { type: 'start' }
    | { type: 'stop' }
    | { type: 'reset'; durationMs: number },
) {
  switch (action.type) {
    case 'sync': {
      return {
        isActive: action.remainingMs > 0,
        remainingMs: action.remainingMs,
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
  const countdownTargetMsRef = useRef<number | null>(null);
  const remainingMsRef = useRef(state.remainingMs);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  remainingMsRef.current = state.remainingMs;

  const onCompleteEvent = useEffectEvent(() => {
    onComplete?.();
  });

  useEffect(() => {
    if (!state.isActive || normalizedIntervalMs === 0) {
      return undefined;
    }

    countdownTargetMsRef.current ??= performance.now() + remainingMsRef.current;

    const tick = () => {
      const remainingMs = normalizeMs(
        (countdownTargetMsRef.current ?? performance.now()) - performance.now(),
      );

      dispatch({ type: 'sync', remainingMs });

      if (remainingMs === 0) {
        countdownTargetMsRef.current = null;
        timeoutRef.current = null;
        onCompleteEvent();
        return;
      }

      timeoutRef.current = setTimeout(tick, Math.min(normalizedIntervalMs, remainingMs));
    };

    timeoutRef.current = setTimeout(
      tick,
      Math.min(normalizedIntervalMs, remainingMsRef.current),
    );

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [normalizedIntervalMs, state.isActive]);

  const start = useCallback(() => {
    dispatch({ type: 'start' });
  }, []);

  const stop = useCallback(() => {
    countdownTargetMsRef.current = null;
    dispatch({ type: 'stop' });
  }, []);

  const reset = useCallback(
    (nextDurationMs = normalizedDurationMs) => {
      countdownTargetMsRef.current = null;
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
