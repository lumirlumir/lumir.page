/**
 * @fileoverview svg-wrapper.
 * @see https://github.com/react-icons/react-icons/blob/v5.5.0/packages/react-icons/src/iconBase.tsx
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type ReactElement, type SVGAttributes } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Props used by `SVGWrapper` to create a reusable SVG icon component.
 */
export interface SVGWrapperProps {
  /**
   * Static attributes applied to the rendered `<svg>` element.
   *
   * `viewBox` is required so the wrapped icon scales correctly with `size`.
   */
  attrs: {
    /**
     * Defines the visible area of the SVG in user-space coordinates.
     */
    viewBox: string;

    // Additional SVG attributes can be added as needed.
    [key: string]: string;
  };

  /**
   * SVG child element or fragment that contains the icon paths.
   */
  children: ReactElement;
}

/**
 * Props accepted by SVG icon components created with `SVGWrapper`.
 */
export interface SVGProps extends SVGAttributes<SVGElement> {
  /**
   * Width and height applied to the rendered `<svg>` element. Defaults to
   * `'1em'`.
   */
  size?: string | number;

  /**
   * CSS color applied through the rendered `<svg>` element's inline style.
   * Defaults to `'currentColor'`.
   */
  color?: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `SVGWrapper` creates a reusable React SVG icon component from static SVG
 * attributes and children.
 *
 * The returned component accepts standard SVG attributes plus `size` and
 * `color`, making inlined icons render with a consistent default shape while
 * still allowing callers to override common SVG props.
 *
 * @returns A React component that renders the wrapped SVG icon.
 * @example
 * ```tsx
 * import { SVGWrapper } from '@lumir/react-kit/components';
 *
 * const CheckIcon = SVGWrapper({
 *   attrs: {
 *     viewBox: '0 0 24 24',
 *   },
 *   children: <path d="M20 6 9 17l-5-5" />,
 * });
 *
 * function Component() {
 *   return <CheckIcon aria-label="checked" color="green" size={24} />;
 * }
 * ```
 */
export function SVGWrapper({ attrs, children }: SVGWrapperProps) {
  return function SVG({
    size = '1em',
    color = 'currentColor',
    style = {},
    ...props
  }: SVGProps) {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        xmlns="http://www.w3.org/2000/svg"
        {...attrs}
        height={size}
        width={size}
        style={{
          color,
          ...style,
        }}
        {...props}
      >
        {children}
      </svg>
    );
  };
}
