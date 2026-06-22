/**
 * @fileoverview Defines Markdown loaders for Webpack, Rollup, Rolldown, and Vite.
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { Plugin } from 'rolldown';
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Converts raw Markdown content into a JavaScript module with a default string export.
 * @param {string} source The raw Markdown content to transform.
 * @returns {string} JavaScript module source that exports the Markdown content.
 */
function transformMarkdown(source) {
  return `export default ${JSON.stringify(source)};`;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Webpack loader that imports Markdown files as default-exported strings.
 * @param {string} source The raw Markdown content passed from webpack.
 * @returns {string} JavaScript module source that exports the Markdown content.
 */
export function markdownWebpackPlugin(source) {
  return transformMarkdown(source);
}

/**
 * Creates a Rollup, Rolldown, and Vite compatible plugin
 * that loads Markdown files as default-exported strings.
 * @returns {Promise<Plugin>} A Rollup plugin for transforming `.md` files.
 */
export async function rollupPluginMarkdown() {
  return {
    name: 'rollup-plugin-markdown',

    async load(id) {
      if (id.endsWith('.md')) {
        return {
          code: transformMarkdown(await this.fs.readFile(id, { encoding: 'utf8' })),
          moduleType: 'js',
        };
      }

      return null;
    },
  };
}

export default markdownWebpackPlugin;
