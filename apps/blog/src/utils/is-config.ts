/**
 * @fileoverview Defines a type guard for application configuration data.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Config } from '@/data/config';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Type guard to check if the given data conforms to the `Config` interface.
 * @param data The data to check for conformity to the `Config` interface.
 * @returns Whether the data conforms to the `Config` interface.
 */
export function isConfig(data: unknown): data is Config {
  return (
    typeof data === 'object' &&
    data !== null &&
    'cursorSplash' in data &&
    typeof data.cursorSplash === 'boolean'
  );
}
