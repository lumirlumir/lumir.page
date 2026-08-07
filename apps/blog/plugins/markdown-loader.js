/**
 * @fileoverview Defines Markdown loaders for Webpack and Vite.
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { Plugin } from 'vite';
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
 * Creates a Vite plugin that loads Markdown files as default-exported strings.
 * @returns {Promise<Plugin>} A Vite plugin for transforming `.md` files.
 */
export async function vitePluginMarkdown() {
  return {
    name: 'vite-plugin-markdown',

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
