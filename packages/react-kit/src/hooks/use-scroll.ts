/**
 * @fileoverview `useScroll` hook.
 */

/* global ScrollOptions:readonly, ScrollIntoViewOptions:readonly, ScrollToOptions:readonly */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCallback, useMemo, useRef, type RefObject } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * React hook for imperative scroll actions.
 *
 * The hook returns a target `ref` and a stable scroll controller. Use
 * `scroll.intoView()` to scroll the referenced element into its nearest
 * scrollable ancestors, or `scroll.to()` to scroll the window to document
 * coordinates.
 *
 * @param options Default scroll options used by `scroll.intoView()` and
 * `scroll.to()`. Per-call options override these defaults.
 * @returns A readonly tuple containing the target `ref` and scroll controller.
 *
 * @example
 * ```tsx
 * import { useScroll } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const [ref, scroll] = useScroll<HTMLDivElement>();
 *
 *   return (
 *     <div>
 *       <button onClick={() => scroll.intoView()}>Scroll to target</button>
 *       <button onClick={() => scroll.to({ top: 0 })}>Scroll to top</button>
 *       <div ref={ref}>Scroll Target</div>
 *     </div>
 *   );
 * }
 * ```
 */
export function useScroll<T extends HTMLElement = HTMLElement>({
  behavior = 'auto',
}: ScrollOptions = {}): readonly [
  ref: RefObject<T | null>,
  scroll: {
    intoView: (scrollIntoViewOptions?: ScrollIntoViewOptions) => void;
    to: (scrollToOptions?: ScrollToOptions) => void;
  },
] {
  const ref = useRef<T | null>(null);

  const intoView = useCallback(
    (scrollIntoViewOptions: ScrollIntoViewOptions = {}) => {
      ref.current?.scrollIntoView({
        behavior,
        ...scrollIntoViewOptions,
      });
    },
    [behavior],
  );

  const to = useCallback(
    (scrollToOptions: ScrollToOptions = {}) => {
      window.scrollTo({
        behavior,
        ...scrollToOptions,
      });
    },
    [behavior],
  );

  return [
    ref,
    useMemo(
      () => ({
        intoView,
        to,
      }),
      [intoView, to],
    ),
  ] as const;
}
