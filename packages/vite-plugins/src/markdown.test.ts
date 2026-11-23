/**
 * @fileoverview Test for `markdown.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterAll, assert, beforeAll, describe, it } from 'vitest';
import { createServer, type ViteDevServer } from 'vite';
import { vitePluginMarkdown } from './markdown.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown', () => {
  let server: ViteDevServer;

  beforeAll(async () => {
    server = await createServer({
      root: import.meta.dirname,
      plugins: [vitePluginMarkdown()],
    });
  });

  afterAll(async () => {
    await server.close();
  });

  it('should import Markdown as a default string preserving quotes, backslashes and newlines', async () => {
    const markdown = await server.ssrLoadModule('/fixtures/sample.md');

    assert.strictEqual(
      markdown.default,
      '# Markdown\n\nA "quoted" line with a `back\\slash`.\n',
    );
  });

  it('should let Vite load TypeScript imports normally', async () => {
    const module = await server.ssrLoadModule('/markdown.ts');

    assert.isFunction(module.vitePluginMarkdown);
  });
});
