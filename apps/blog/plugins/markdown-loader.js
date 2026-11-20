/**
 * @fileoverview Defines a Vite plugin that imports Markdown files as strings.
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { Plugin } from 'vite';
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Creates a Vite plugin that loads Markdown files as default-exported strings.
 * @returns {Promise<Plugin>} A Vite plugin for transforming `.md` files.
 */
export async function vitePluginMarkdown() {
  return {
    name: 'vite-plugin-markdown',

    async load(id) {
      if (id.endsWith('.md')) {
        const source = await this.fs.readFile(id, { encoding: 'utf8' });

        return {
          code: `export default ${JSON.stringify(source)};`,
          moduleType: 'js',
        };
      }

      return null;
    },
  };
}
