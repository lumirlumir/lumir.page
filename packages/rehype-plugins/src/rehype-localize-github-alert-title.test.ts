/**
 * @fileoverview Test for `rehype-localize-github-alert-title.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import rehypeGitHubAlert from 'rehype-github-alert';
import { rehypeLocalizeGitHubAlertTitle } from './rehype-localize-github-alert-title.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('rehype-localize-github-alert-title', () => {
  it('should translate the configured title and keep other titles in English', async () => {
    const file = await unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeGitHubAlert)
      .use(rehypeLocalizeGitHubAlertTitle, { warning: '경고입니다' })
      .use(rehypeStringify)
      .process(
        '<blockquote><p>[!WARNING]\nWarning</p></blockquote><blockquote><p>[!TIP]\nAdvice</p></blockquote>',
      );

    assert.include(file.value, '</svg>경고입니다</p><p>Warning</p>');
    assert.include(file.value, '</svg>Tip</p><p>Advice</p>');
  });

  it('should keep the original English titles when called without options', async () => {
    const file = await unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeGitHubAlert)
      .use(rehypeLocalizeGitHubAlertTitle)
      .use(rehypeStringify)
      .process(
        '<blockquote><p>[!WARNING]\nWarning</p></blockquote><blockquote><p>[!TIP]\nAdvice</p></blockquote>',
      );

    assert.include(file.value, '</svg>Warning</p><p>Warning</p>');
    assert.include(file.value, '</svg>Tip</p><p>Advice</p>');
  });
});
