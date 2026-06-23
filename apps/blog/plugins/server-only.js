/**
 * @fileoverview Defines a Vite plugin that stubs Next.js `server-only` imports.
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { Plugin } from 'vite';
 */

// --------------------------------------------------------------------------------
// Constant
// --------------------------------------------------------------------------------

const SERVER_ONLY_MODULE_ID = 'server-only';
const RESOLVED_SERVER_ONLY_MODULE_ID = '\0server-only';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Creates a Vite plugin that replaces `server-only` with an empty module.
 * @returns {Plugin} A Vite plugin.
 */
export function vitePluginServerOnly() {
  return {
    name: 'vite-plugin-server-only',
    enforce: 'pre',

    resolveId(id) {
      if (id === SERVER_ONLY_MODULE_ID) {
        return RESOLVED_SERVER_ONLY_MODULE_ID;
      }

      return null;
    },

    load(id) {
      if (id === RESOLVED_SERVER_ONLY_MODULE_ID) {
        return {
          code: 'export {};',
          moduleType: 'js',
        };
      }

      return null;
    },
  };
}
