/**
 * @fileoverview Back to top button component.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type ButtonHTMLAttributes } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Props for the `BackToTopButton` component.
 */
export interface BackToTopButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'onClick'
> {
  /**
   * Scrolling behavior when the button is clicked.
   *
   * @default 'smooth'
   */
  behavior?: 'auto' | 'instant' | 'smooth' | undefined;

  /**
   * Vertical scroll position to scroll to when the button is clicked.
   *
   * @default 0
   */
  top?: number | undefined;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Button that scrolls the window back to the top when clicked.
 *
 * The component renders a plain `<button>` and passes through standard button
 * attributes so callers can apply their own styling and accessibility features.
 *
 * @example
 * ```tsx
 * import { BackToTopButton } from '@lumir/react-kit/components';
 *
 * <BackToTopButton
 *   aria-label="Back to top"
 *   className="back-to-top-button"
 * />
 * ```
 */
export function BackToTopButton({
  behavior = 'smooth',
  top = 0,
  children,
  ...props
}: BackToTopButtonProps) {
  return (
    <button
      {...props}
      type="button"
      onClick={() => {
        window.scrollTo({
          behavior,
          top,
        });
      }}
    >
      {children}
    </button>
  );
}
