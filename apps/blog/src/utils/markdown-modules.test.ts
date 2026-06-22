/**
 * @fileoverview Test for `markdown-modules.ts`
 */

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

import { globSync } from 'node:fs';
import { assert, describe, it } from 'vitest';
import markdownModules from './markdown-modules.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-modules', () => {
  it('should match every Markdown file in posts docs with the module registry keys', async () => {
    const postFileKeys = globSync('*.md', {
      cwd: new URL('../posts/docs/', import.meta.url),
    })
      .map(fileName => `../posts/docs/${fileName}`)
      .sort();
    const moduleKeys = Object.keys(markdownModules).sort();

    assert.deepStrictEqual(moduleKeys, postFileKeys);
  });
});
