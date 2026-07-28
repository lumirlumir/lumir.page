/**
 * @fileoverview Test for `markdown-modules.ts`
 */

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

import { globSync, readFileSync } from 'node:fs';
import { assert, describe, it } from 'vitest';
import markdownModules from './markdown-modules.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-modules', () => {
  it('should map every Markdown post id to the contents of its matching file', () => {
    const postModules = Object.fromEntries(
      globSync('*.md', {
        cwd: new URL('../posts/docs/', import.meta.url),
      }).map(fileName => [
        fileName.replace(/\.md$/, ''),
        readFileSync(new URL(`../posts/docs/${fileName}`, import.meta.url), 'utf8'),
      ]),
    );

    assert.deepStrictEqual(markdownModules, postModules);
  });
});
