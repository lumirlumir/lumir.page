/**
 * @fileoverview Test for `markdown-collection.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { strict as assert } from 'node:assert';
import { globSync } from 'node:fs';
import { describe, it } from 'vitest';
import createMarkdownCollection from './markdown-collection.js';

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
    it('should load Korean Markdown metadata from a matching file', async () => {
      const markdownCollection = createMarkdownCollection();
      const metadata = await markdownCollection.loadVMarkdownFileMeta('2558.ko');

      assert.strictEqual(metadata.id, '2558.ko');
      assert.strictEqual(metadata.slug, '2558');
      assert.strictEqual(metadata.lang, 'ko');
      assert.strictEqual(metadata.data.title, '2558번: A+B - 2');
      assert.deepStrictEqual(metadata.data.categories, ['baekjoon']);
    });

    it('should load English Markdown metadata from a matching file', async () => {
      const markdownCollection = createMarkdownCollection();
      const metadata = await markdownCollection.loadVMarkdownFileMeta('2558.en');

      assert.strictEqual(metadata.id, '2558.en');
      assert.strictEqual(metadata.slug, '2558');
      assert.strictEqual(metadata.lang, 'en');
      assert.strictEqual(metadata.data.title, '2558: A+B - 2');
      assert.deepStrictEqual(metadata.data.categories, ['baekjoon']);
    });

    it('should reject a Markdown id without a matching file', async () => {
      const markdownCollection = createMarkdownCollection();

      await assert.rejects(
        markdownCollection.loadVMarkdownFileMeta('missing-post.ko'),
        /Markdown file not found: `missing-post.ko`/,
      );
    });
  });

  describe('loadVMarkdownFile', () => {
    it('should load Korean Markdown content from a matching file', async () => {
      const markdownCollection = createMarkdownCollection();
      const file = await markdownCollection.loadVMarkdownFile('2558.ko');

      assert.strictEqual(file.id, '2558.ko');
      assert.strictEqual(file.lang, 'ko');
      assert.strictEqual(file.data.title, '2558번: A+B - 2');
      assert.match(file.content, /6개월만에 코딩공부를 다시 시작했더니/);
    });

    it('should load English Markdown content from a matching file', async () => {
      const markdownCollection = createMarkdownCollection();
      const file = await markdownCollection.loadVMarkdownFile('2558.en');

      assert.strictEqual(file.id, '2558.en');
      assert.strictEqual(file.lang, 'en');
      assert.strictEqual(file.data.title, '2558: A+B - 2');
      assert.match(file.content, /After starting to study coding again/);
    });

    it('should reject a Markdown id without a matching file', async () => {
      const markdownCollection = createMarkdownCollection();

      await assert.rejects(
        markdownCollection.loadVMarkdownFile('missing-post.ko'),
        /Markdown file not found: `missing-post.ko`/,
      );
    });
  });

  describe('byLangSlug', () => {
    it('should index every Markdown file by language and slug', () => {
      const markdownCollection = createMarkdownCollection();
      const fileNames = globSync('*.md', {
        cwd: new URL('../posts/docs/', import.meta.url),
      });

      assert.deepStrictEqual(
        Object.keys(markdownCollection.byLangSlug.ko).sort(),
        fileNames
          .filter(name => name.endsWith('.ko.md'))
          .map(name => name.slice(0, -6))
          .sort(),
      );
      assert.deepStrictEqual(
        Object.keys(markdownCollection.byLangSlug.en).sort(),
        fileNames
          .filter(name => name.endsWith('.en.md'))
          .map(name => name.slice(0, -6))
          .sort(),
      );
    });
  });

  describe('byLangCategory', () => {
    it('should index Markdown metadata under its language and category', () => {
      const markdownCollection = createMarkdownCollection();

      assert.ok(
        markdownCollection.byLangCategory.ko.baekjoon.some(file => file.id === '2558.ko'),
      );
      assert.ok(
        markdownCollection.byLangCategory.en.baekjoon.some(file => file.id === '2558.en'),
      );
    });
  });

  describe('nonEmptyCategoryKeys', () => {
    it('should include categories used by Markdown files in each language', () => {
      const markdownCollection = createMarkdownCollection();

      assert.ok(markdownCollection.nonEmptyCategoryKeys.ko.includes('baekjoon'));
      assert.ok(markdownCollection.nonEmptyCategoryKeys.en.includes('baekjoon'));
    });
  });
});
