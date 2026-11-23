/**
 * @fileoverview Test for `server-only.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterAll, assert, beforeAll, describe, it } from 'vitest';
import { createServer, type ViteDevServer } from 'vite';
import { vitePluginServerOnly } from './server-only.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('server-only', () => {
  let server: ViteDevServer;

  beforeAll(async () => {
    server = await createServer({
      root: import.meta.dirname,
      plugins: [vitePluginServerOnly()],
    });
  });

  afterAll(async () => {
    await server.close();
  });

  it('should resolve a server-only import to an empty module', async () => {
    const serverOnly = await server.ssrLoadModule('server-only');

    assert.deepStrictEqual(Object.keys(serverOnly), []);
  });
});
