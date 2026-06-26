/**
 * @fileoverview Test for `markdown-collection.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it, vi } from 'vitest';
import createMarkdownCollection from './markdown-collection.js';

// --------------------------------------------------------------------------------
// Mock
// --------------------------------------------------------------------------------

vi.mock('@/utils/markdown-modules', () => ({
  default: {
    '../posts/docs/simple-post.ko.md': `---
title: Korean Mock Post
description: Korean mock post description.
created: '2024-01-01'
updated: '2024-01-02'
categories:
  - javascript
  - markdown
references:
  - https://example.com/ko
---
## Korean Mock Post

Korean body.`,
    '../posts/docs/simple-post.en.md': `---
title: English Mock Post
description: English mock post description.
created: '2024-02-01'
updated: '2024-02-02'
categories:
  - nextjs
references: []
---
## English Mock Post

English body.`,
  },
}));

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-collection', () => {
  it('should reuse the same instance', () => {
    const markdownCollection1 = createMarkdownCollection();
    const markdownCollection2 = createMarkdownCollection();

    assert.strictEqual(markdownCollection1, markdownCollection2);
  });

  it('should load Markdown metadata from the module registry', async () => {
    const markdownCollection = createMarkdownCollection();

    assert.deepStrictEqual(
      await markdownCollection.loadVMarkdownFileMeta('simple-post.ko'),
      {
        id: 'simple-post.ko',
        slug: 'simple-post',
        lang: 'ko',
        data: {
          title: 'Korean Mock Post',
          description: 'Korean mock post description.',
          created: '2024-01-01',
          updated: '2024-01-02',
          categories: ['javascript', 'markdown'],
          references: ['https://example.com/ko'],
        },
      },
    );
  });

  it('should load Markdown content from the module registry', async () => {
    const markdownCollection = createMarkdownCollection();

    assert.deepStrictEqual(await markdownCollection.loadVMarkdownFile('simple-post.en'), {
      id: 'simple-post.en',
      slug: 'simple-post',
      lang: 'en',
      data: {
        title: 'English Mock Post',
        description: 'English mock post description.',
        created: '2024-02-01',
        updated: '2024-02-02',
        categories: ['nextjs'],
        references: [],
      },
      content: '## English Mock Post\n\nEnglish body.',
    });
  });

  it('should index Markdown metadata by language and slug', () => {
    const markdownCollection = createMarkdownCollection();

    assert.deepStrictEqual(markdownCollection.byLangSlug.ko['simple-post'], {
      id: 'simple-post.ko',
      slug: 'simple-post',
      lang: 'ko',
      data: {
        title: 'Korean Mock Post',
        description: 'Korean mock post description.',
        created: '2024-01-01',
        updated: '2024-01-02',
        categories: ['javascript', 'markdown'],
        references: ['https://example.com/ko'],
      },
    });
    assert.deepStrictEqual(markdownCollection.byLangSlug.en['simple-post'], {
      id: 'simple-post.en',
      slug: 'simple-post',
      lang: 'en',
      data: {
        title: 'English Mock Post',
        description: 'English mock post description.',
        created: '2024-02-01',
        updated: '2024-02-02',
        categories: ['nextjs'],
        references: [],
      },
    });
  });

  it('should index Markdown metadata by language and category', () => {
    const markdownCollection = createMarkdownCollection();

    assert.deepStrictEqual(markdownCollection.byLangCategory.ko.javascript, [
      {
        id: 'simple-post.ko',
        slug: 'simple-post',
        lang: 'ko',
        data: {
          title: 'Korean Mock Post',
          description: 'Korean mock post description.',
          created: '2024-01-01',
          updated: '2024-01-02',
          categories: ['javascript', 'markdown'],
          references: ['https://example.com/ko'],
        },
      },
    ]);
    assert.deepStrictEqual(markdownCollection.byLangCategory.ko.markdown, [
      {
        id: 'simple-post.ko',
        slug: 'simple-post',
        lang: 'ko',
        data: {
          title: 'Korean Mock Post',
          description: 'Korean mock post description.',
          created: '2024-01-01',
          updated: '2024-01-02',
          categories: ['javascript', 'markdown'],
          references: ['https://example.com/ko'],
        },
      },
    ]);
    assert.deepStrictEqual(markdownCollection.byLangCategory.en.nextjs, [
      {
        id: 'simple-post.en',
        slug: 'simple-post',
        lang: 'en',
        data: {
          title: 'English Mock Post',
          description: 'English mock post description.',
          created: '2024-02-01',
          updated: '2024-02-02',
          categories: ['nextjs'],
          references: [],
        },
      },
    ]);
    assert.deepStrictEqual(markdownCollection.byLangCategory.en.javascript, []);
  });

  it('should return non-empty category keys from the module registry', () => {
    const markdownCollection = createMarkdownCollection();

    assert.deepStrictEqual(markdownCollection.nonEmptyCategoryKeys, {
      ko: ['markdown', 'javascript'],
      en: ['nextjs'],
    });
  });

  it('should throw when a requested Markdown file is missing from the module registry', async () => {
    const markdownCollection = createMarkdownCollection();
    let caughtError: unknown;

    try {
      await markdownCollection.loadVMarkdownFileMeta('missing-post.ko');
    } catch (error) {
      caughtError = error;
    }

    assert.ok(caughtError instanceof Error);
    assert.strictEqual(caughtError.message, 'Markdown file not found: `missing-post.ko`');
  });
});
