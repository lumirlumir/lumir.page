/**
 * @fileoverview Defines a Vite plugin that stubs Next.js `client-only` imports.
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

const CLIENT_ONLY_MODULE_ID = 'client-only';
const RESOLVED_CLIENT_ONLY_MODULE_ID = '\0client-only';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Creates a Vite plugin that replaces `client-only` with an empty module.
 * @returns {Plugin} A Vite plugin.
 */
export function vitePluginClientOnly() {
  return {
    name: 'vite-plugin-client-only',
    enforce: 'pre',

    resolveId(id) {
      if (id === CLIENT_ONLY_MODULE_ID) {
        return RESOLVED_CLIENT_ONLY_MODULE_ID;
      }

      return null;
    },

    load(id) {
      if (id === RESOLVED_CLIENT_ONLY_MODULE_ID) {
        return {
          code: 'export {};',
          moduleType: 'js',
        };
      }

      return null;
    },
  };
}
