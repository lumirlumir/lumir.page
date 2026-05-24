/**
 * @fileoverview `useScroll` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCallback, useMemo, useRef, type RefObject } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Controls how scrolling is performed.
 *
 * - `'auto'` uses the computed CSS `scroll-behavior` value.
 * - `'instant'` jumps to the target position instantly.
 * - `'smooth'` animates to the target position.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#behavior
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo#behavior
 */
type ScrollBehavior = 'auto' | 'instant' | 'smooth';

/**
 * Alignment position used by `scrollIntoView()`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#block
 */
type ScrollLogicalPosition = 'center' | 'end' | 'nearest' | 'start';

/**
 * Common options shared by scroll methods.
 */
interface ScrollOptions {
  /**
   * Scrolling behavior to use when moving to a target.
   * @default 'auto'
   */
  behavior?: ScrollBehavior;
}

/**
 * Options passed to `Element.scrollIntoView()`.
 */
interface ScrollIntoViewOptions extends ScrollOptions {
  /**
   * Vertical alignment of the target element within the scrollable ancestor.
   * @default 'start'
   */
  block?: ScrollLogicalPosition;

  /**
   * Horizontal alignment of the target element within the scrollable ancestor.
   * @default 'nearest'
   */
  inline?: ScrollLogicalPosition;
}

/**
 * Options passed to `Window.scrollTo()`.
 */
interface ScrollToOptions extends ScrollOptions {
  /**
   * Horizontal document coordinate, in pixels, to scroll to.
   * @default undefined
   */
  left?: number;

  /**
   * Vertical document coordinate, in pixels, to scroll to.
   * @default undefined
   */
  top?: number;
}

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
export function useScroll<T extends HTMLElement>({
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
