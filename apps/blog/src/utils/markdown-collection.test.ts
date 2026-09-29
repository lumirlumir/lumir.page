/**
 * @fileoverview Test for `markdown-collection.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, beforeEach, describe, it, vi } from 'vitest';

let createMarkdownCollection: (typeof import('./markdown-collection.js'))['default'];

// --------------------------------------------------------------------------------
// Mock
// --------------------------------------------------------------------------------

// Vite transforms `import.meta.glob` before runtime, so intercept `Object.entries`
// before the collection module is imported. Replace entries matching Markdown
// paths with mock data, then immediately restore the original function.
beforeEach(async () => {
  vi.resetModules();

  const markdownModules = {
    'simple-post.ko': `---
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
    'simple-post.en': `---
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
    'long-post.en': `---
title: Long Post
description: ${'metadata '.repeat(300)}
created: '2024-01-01'
updated: '2024-01-02'
categories: []
references: []
---
${'word '.repeat(300)}`,
    'empty-post.en': `---
title: Empty Post
description: ${'metadata '.repeat(300)}
created: '2024-01-01'
updated: '2024-01-02'
categories: []
references: []
---`,
  };
  const { entries } = Object;

  const entriesMock = vi.spyOn(Object, 'entries').mockImplementation(value => {
    const result = entries(value);

    if (
      result.length > 0 &&
      result.every(([path]) => path.startsWith('./') && path.endsWith('.md'))
    ) {
      entriesMock.mockRestore();

      return entries(markdownModules).map(([id, markdown]) => [`./${id}.md`, markdown]);
    }

    return result;
  });

  try {
    ({ default: createMarkdownCollection } = await import('./markdown-collection.js'));
  } finally {
    entriesMock.mockRestore();
  }
});

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-collection', () => {
  it('should reuse the same instance', () => {
    const markdownCollection1 = createMarkdownCollection();
    const markdownCollection2 = createMarkdownCollection();

    assert.strictEqual(markdownCollection1, markdownCollection2);
  });

  describe('loadVMarkdownFileMeta', () => {
    it('should store display minutes calculated from the body without frontmatter', async () => {
      const markdownCollection = createMarkdownCollection();
      const metadata = await markdownCollection.loadVMarkdownFileMeta('long-post.en');

      assert.strictEqual(metadata.readtime, 2);
      assert.notProperty(metadata, 'content');
      assert.strictEqual(
        await markdownCollection.loadVMarkdownFileMeta('long-post.en'),
        metadata,
      );
      assert.strictEqual(markdownCollection.byLangSlug.en['long-post'], metadata);
    });

    it('should store zero minutes for an empty body even with long frontmatter', async () => {
      const markdownCollection = createMarkdownCollection();
      const metadata = await markdownCollection.loadVMarkdownFileMeta('empty-post.en');

      assert.strictEqual(metadata.readtime, 0);
    });

    it('should load Markdown metadata from the module registry - ko', async () => {
      const markdownCollection = createMarkdownCollection();

      assert.deepStrictEqual(
        await markdownCollection.loadVMarkdownFileMeta('simple-post.ko'),
        {
          id: 'simple-post.ko',
          slug: 'simple-post',
          lang: 'ko',
          readtime: 1,
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

    it('should load Markdown metadata from the module registry - en', async () => {
      const markdownCollection = createMarkdownCollection();

      assert.deepStrictEqual(
        await markdownCollection.loadVMarkdownFileMeta('simple-post.en'),
        {
          id: 'simple-post.en',
          slug: 'simple-post',
          lang: 'en',
          readtime: 1,
          data: {
            title: 'English Mock Post',
            description: 'English mock post description.',
            created: '2024-02-01',
            updated: '2024-02-02',
            categories: ['nextjs'],
            references: [],
          },
        },
      );
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
      assert.strictEqual(
        caughtError.message,
        'Markdown file not found: `missing-post.ko`',
      );
    });
  });

  describe('loadVMarkdownFile', () => {
    it('should cache reading time when content is loaded before metadata', async () => {
      const markdownCollection = createMarkdownCollection();
      const file = await markdownCollection.loadVMarkdownFile('long-post.en');
      const metadata = await markdownCollection.loadVMarkdownFileMeta('long-post.en');

      assert.strictEqual(file.content, 'word '.repeat(300));
      assert.strictEqual(file.readtime, 2);
      assert.strictEqual(metadata.readtime, 2);
      assert.strictEqual(markdownCollection.byLangSlug.en['long-post'], metadata);
    });

    it('should preserve reading time when metadata is loaded before content', async () => {
      const markdownCollection = createMarkdownCollection();
      const metadata = await markdownCollection.loadVMarkdownFileMeta('long-post.en');
      const file = await markdownCollection.loadVMarkdownFile('long-post.en');

      assert.strictEqual(metadata.readtime, 2);
      assert.strictEqual(file.readtime, 2);
      assert.strictEqual(
        await markdownCollection.loadVMarkdownFileMeta('long-post.en'),
        metadata,
      );
    });

    it('should return and cache zero minutes for an empty body', async () => {
      const markdownCollection = createMarkdownCollection();
      const file = await markdownCollection.loadVMarkdownFile('empty-post.en');
      const metadata = await markdownCollection.loadVMarkdownFileMeta('empty-post.en');

      assert.strictEqual(file.content, '');
      assert.strictEqual(file.readtime, 0);
      assert.strictEqual(metadata.readtime, 0);
    });

    it('should load Markdown content from the module registry - ko', async () => {
      const markdownCollection = createMarkdownCollection();

      assert.deepStrictEqual(
        await markdownCollection.loadVMarkdownFile('simple-post.ko'),
        {
          id: 'simple-post.ko',
          slug: 'simple-post',
          lang: 'ko',
          readtime: 1,
          data: {
            title: 'Korean Mock Post',
            description: 'Korean mock post description.',
            created: '2024-01-01',
            updated: '2024-01-02',
            categories: ['javascript', 'markdown'],
            references: ['https://example.com/ko'],
          },
          content: '## Korean Mock Post\n\nKorean body.',
        },
      );
    });

    it('should load Markdown content from the module registry - en', async () => {
      const markdownCollection = createMarkdownCollection();

      assert.deepStrictEqual(
        await markdownCollection.loadVMarkdownFile('simple-post.en'),
        {
          id: 'simple-post.en',
          slug: 'simple-post',
          lang: 'en',
          readtime: 1,
          data: {
            title: 'English Mock Post',
            description: 'English mock post description.',
            created: '2024-02-01',
            updated: '2024-02-02',
            categories: ['nextjs'],
            references: [],
          },
          content: '## English Mock Post\n\nEnglish body.',
        },
      );
    });

    it('should throw when a requested Markdown file is missing from the module registry', async () => {
      const markdownCollection = createMarkdownCollection();
      let caughtError: unknown;

      try {
        await markdownCollection.loadVMarkdownFile('missing-post.ko');
      } catch (error) {
        caughtError = error;
      }

      assert.ok(caughtError instanceof Error);
      assert.strictEqual(
        caughtError.message,
        'Markdown file not found: `missing-post.ko`',
      );
    });
  });

  describe('byLangSlug', () => {
    it('should calculate reading time when the slug index is accessed before loading files', async () => {
      const markdownCollection = createMarkdownCollection();
      const metadata = markdownCollection.byLangSlug.en['long-post'];

      assert.strictEqual(metadata.readtime, 2);
      assert.strictEqual(markdownCollection.byLangSlug.en['empty-post'].readtime, 0);
      assert.strictEqual(
        await markdownCollection.loadVMarkdownFileMeta('long-post.en'),
        metadata,
      );
      assert.strictEqual(
        (await markdownCollection.loadVMarkdownFile('long-post.en')).readtime,
        2,
      );
    });

    it('should index Markdown metadata by language and slug', () => {
      const markdownCollection = createMarkdownCollection();

      assert.deepStrictEqual(markdownCollection.byLangSlug.ko['simple-post'], {
        id: 'simple-post.ko',
        slug: 'simple-post',
        lang: 'ko',
        readtime: 1,
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
        readtime: 1,
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
  });

  describe('byLangCategory', () => {
    it('should index Markdown metadata by language and category', () => {
      const markdownCollection = createMarkdownCollection();

      assert.deepStrictEqual(markdownCollection.byLangCategory.ko.javascript, [
        {
          id: 'simple-post.ko',
          slug: 'simple-post',
          lang: 'ko',
          readtime: 1,
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
          readtime: 1,
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
          readtime: 1,
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
  });

  describe('nonEmptyCategoryKeys', () => {
    it('should return non-empty category keys from the module registry', () => {
      const markdownCollection = createMarkdownCollection();

      assert.deepStrictEqual(markdownCollection.nonEmptyCategoryKeys, {
        ko: ['markdown', 'javascript'],
        en: ['nextjs'],
      });
    });
  });
});
