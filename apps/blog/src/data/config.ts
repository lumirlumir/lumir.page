/**
 * @fileoverview Defines the structure of the configuration object used in the application.
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents the application configuration.
 */
export interface Config {
  /**
   * Whether the cursor splash effect is enabled.
   */
  readonly cursorSplash: boolean;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * The key used to persist the application configuration.
 */
export const configKey = 'data-config';

/**
 * The default application configuration.
 */
export const configDefault = {
  cursorSplash: false,
} as const satisfies Config;
