/**
 * @fileoverview Defines supported theme keys.
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents the supported application theme.
 */
export type Theme = (typeof themeKeys)[number];

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * The key used for the root document attribute and persisted theme preference.
 */
export const themeKey = 'data-theme';

/**
 * The default application theme.
 */
export const themeDefault = 'dark' as const satisfies Theme;

/**
 * Supported application themes.
 */
export const themeKeys = ['dark', 'light'] as const;
