/**
 * @fileoverview `useScrollProgress` hook.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useEffectEvent } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * React hook that reports the current document scroll progress.
 *
 * Scroll and resize updates are coalesced with `requestAnimationFrame`. The
 * reported progress is rounded to three decimal places and clamped between
 * `0` and `1`.
 *
 * @param onProgress Callback invoked with the current normalized scroll progress.
 *
 * @example
 * ```tsx
 * import { useRef } from 'react';
 * import { useScrollProgress } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const progressRef = useRef<HTMLDivElement>(null);
 *
 *   useScrollProgress(progress => {
 *     progressRef.current?.style.setProperty('--scroll-progress', String(progress));
 *   });
 *
 *   return <div ref={progressRef} />;
 * }
 * ```
 */
export function useScrollProgress(onProgress: (progress: number) => void): void {
  const onProgressEvent = useEffectEvent(onProgress);

  useEffect(() => {
    let rafId: number | null = null;

    function requestProgressUpdate() {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          rafId = null;

          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
          const roundedProgress = Math.round(progress * 1_000) / 1_000;
          const clampedProgress = Math.min(Math.max(roundedProgress, 0), 1);

          onProgressEvent(clampedProgress);
        });
      }
    }

    requestProgressUpdate();

    window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    window.addEventListener('resize', requestProgressUpdate);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      window.removeEventListener('scroll', requestProgressUpdate);
      window.removeEventListener('resize', requestProgressUpdate);
    };
  }, []);
}
