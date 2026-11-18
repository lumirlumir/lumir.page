/**
 * @fileoverview Test for `rehype-localize-github-alert-title.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeGitHubAlert from 'rehype-github-alert';
import rehypeStringify from 'rehype-stringify';
import { rehypeLocalizeGitHubAlertTitle } from './rehype-localize-github-alert-title.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeGitHubAlert)
  .use(rehypeLocalizeGitHubAlertTitle, {
    note: 'Remarque',
    tip: 'Conseil',
    important: 'Important',
    warning: 'Avertissement',
    caution: 'Attention',
  })
  .use(rehypeStringify);

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('rehype-localize-github-alert-title', () => {
  it('should use the supplied translation for the generated title only', async () => {
    const file = await processor.process(
      '<blockquote><p>[!WARNING]\nWarning</p></blockquote>',
    );

    assert.include(String(file), '</svg>Avertissement</p><p>Warning</p>');
  });

  it('should preserve an alert title written directly in HTML', async () => {
    const html =
      '<div class="markdown-alert markdown-alert-warning"><p class="markdown-alert-title">Warning</p></div>';

    assert.strictEqual(String(await processor.process(html)), html);
  });
});
