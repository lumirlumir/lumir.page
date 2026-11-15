/**
 * @fileoverview Test for `search.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { Search } from './search.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('search', () => {
  describe('constructor', () => {
    it('should extract nested fields and preserve the original item', () => {
      const item = { id: 42, details: { title: 'React', body: 'Use React' } };
      const search = new Search([item], {
        fields: { title: 3, body: 1 },
        extractField: (entry, field) => entry.details[field],
      });
      const results = search.search('react');

      assert.deepStrictEqual(results, [
        { item, matches: { title: [0, 5], body: [4, 9] }, score: 4 },
      ]);
      assert.strictEqual(results[0].item, item);
    });

    it('should accept primitive items with an extractor', () => {
      const search = new Search(['React', 'Other tools'], {
        fields: { label: 4 },
        extractField: item => item,
      });

      assert.deepStrictEqual(search.search('react'), [
        { item: 'React', matches: { label: [0, 5] }, score: 4 },
      ]);
    });

    it('should use the configured fields and scores', () => {
      const item = { id: 'react-hooks', text: 'Overview' };
      const search = new Search([item], {
        fields: { id: 5 },
        extractField: (entry, field) => entry[field],
      });

      assert.deepStrictEqual(search.search('react'), [
        { item, matches: { id: [0, 5] }, score: 5 },
      ]);
      assert.deepStrictEqual(search.search('Overview'), []);
    });

    it('should use the configured case sensitivity', () => {
      const item = { text: 'React', content: 'Use REACT' };
      const search = new Search([item], {
        fields: { text: 2, content: 1 },
        extractField: (entry, field) => entry[field],
        ignoreCase: false,
      });

      assert.deepStrictEqual(search.search('react'), []);
      assert.deepStrictEqual(search.search('React'), [
        { item, matches: { text: [0, 5], content: undefined }, score: 2 },
      ]);
    });
  });

  describe('static method', () => {
    describe('highlight', () => {
      it('should split text around a range while preserving casing and HTML-like text', () => {
        assert.deepStrictEqual(Search.highlight('React & Reactivity', [0, 5]), {
          before: '',
          match: 'React',
          after: ' & Reactivity',
        });
        assert.deepStrictEqual(Search.highlight('Try REACT; a guide.', [4, 9]), {
          before: 'Try ',
          match: 'REACT',
          after: '; a guide.',
        });
        assert.deepStrictEqual(Search.highlight('Example: <img src=x>', [9, 20]), {
          before: 'Example: ',
          match: '<img src=x>',
          after: '',
        });
      });

      it('should accept a range from a search result', () => {
        const search = new Search(['Use React'], {
          fields: { text: 1 },
          extractField: item => item,
        });
        const [result] = search.search(' ReAcT ');

        assert.deepStrictEqual(Search.highlight(result.item, result.matches.text), {
          before: 'Use ',
          match: 'React',
          after: '',
        });
      });

      it('should preserve unmatched and empty text', () => {
        const text = 'x'.repeat(250);

        assert.deepStrictEqual(Search.highlight(text, undefined), {
          before: text,
          match: '',
          after: '',
        });
        assert.deepStrictEqual(Search.highlight('Usage'), {
          before: 'Usage',
          match: '',
          after: '',
        });
        assert.deepStrictEqual(Search.highlight(''), {
          before: '',
          match: '',
          after: '',
        });
      });

      it('should preserve long matches and surrounding text without excerpts', () => {
        const before = 'x'.repeat(100);
        const match = 'R'.repeat(300);

        assert.deepStrictEqual(Search.highlight(`${before}${match}End`, [100, 400]), {
          before,
          match,
          after: 'End',
        });
      });
    });
  });

  describe('public method', () => {
    describe('search', () => {
      it('should return no results for blank queries', () => {
        const search = new Search(['React'], {
          fields: { text: 1 },
          extractField: item => item,
        });

        assert.deepStrictEqual(search.search(''), []);
        assert.deepStrictEqual(search.search(' \n\t '), []);
      });

      it('should sum field scores, exclude unrelated items, and preserve ties', () => {
        const search = new Search(
          [
            { text: 'Body first', content: 'React introduction' },
            { text: 'React first', content: '' },
            { text: 'Body second', content: 'Use React' },
            { text: 'React second', content: '' },
            { text: 'React both', content: 'React state' },
            { text: 'Other tools', content: 'Unrelated' },
          ],
          { fields: { text: 2, content: 1 }, extractField: (item, field) => item[field] },
        );

        assert.deepStrictEqual(
          search.search(' rEaCt ').map(({ item, score }) => [item.text, score]),
          [
            ['React both', 3],
            ['React first', 2],
            ['React second', 2],
            ['Body first', 1],
            ['Body second', 1],
          ],
        );
      });

      it('should search only the fields selected for the call', () => {
        const items = [
          { text: 'React hooks', content: 'State' },
          { text: 'Overview', content: 'Use React' },
        ];
        const search = new Search(items, {
          fields: { text: 2, content: 1 },
          extractField: (item, field) => item[field],
        });

        assert.deepStrictEqual(search.search('react', { fields: { content: 1 } }), [
          { item: items[1], matches: { content: [4, 9] }, score: 1 },
        ]);
        assert.deepStrictEqual(search.search('react', { fields: { text: 4 } }), [
          { item: items[0], matches: { text: [0, 5] }, score: 4 },
        ]);
        assert.deepStrictEqual(
          search.search('react', { fields: { content: 1 }, ignoreCase: false }),
          [],
        );
      });

      it('should return no results when no fields are selected', () => {
        const search = new Search(['React'], {
          fields: { text: 1 },
          extractField: item => item,
        });

        assert.deepStrictEqual(search.search('react', { fields: {} }), []);
      });

      it('should apply custom scores once per matched field, regardless of repeated matches', () => {
        const search = new Search(
          [
            { text: 'React title', content: 'State' },
            { text: 'Body only', content: 'Use React' },
            { text: 'React both', content: 'React examples' },
            { text: 'React React', content: 'React React examples' },
          ],
          {
            fields: { text: 2, content: 1 },
            extractField: (item, field) => item[field],
          },
        );

        assert.deepStrictEqual(
          search
            .search('react', { fields: { text: 1, content: 3 } })
            .map(({ item, score }) => [item.text, score]),
          [
            ['React both', 4],
            ['React React', 4],
            ['Body only', 3],
            ['React title', 1],
          ],
        );
      });

      it('should keep field overrides local to each search', () => {
        const item = { text: 'React hooks', content: 'Use React' };
        const search = new Search([item], {
          fields: Object.freeze({ text: 5, content: 2 }),
          extractField: (entry, field) => entry[field],
        });
        const fields = Object.freeze({ content: 4 });

        assert.deepStrictEqual(search.search('react', { fields }), [
          { item, matches: { content: [4, 9] }, score: 4 },
        ]);
        assert.deepStrictEqual(search.search('react', { fields: { text: 7 } }), [
          { item, matches: { text: [0, 5] }, score: 7 },
        ]);
        assert.deepStrictEqual(search.search('react'), [
          { item, matches: { text: [0, 5], content: [4, 9] }, score: 7 },
        ]);
      });

      it('should match case exactly when `ignoreCase` is `false`', () => {
        const items = [
          { text: 'REACT usage', content: 'Learn React here.' },
          { text: 'React hooks', content: 'Use REACT.' },
        ];
        const search = new Search(items, {
          fields: { text: 2, content: 1 },
          extractField: (item, field) => item[field],
        });

        assert.deepStrictEqual(search.search(' React ', { ignoreCase: false }), [
          { item: items[1], matches: { text: [0, 5], content: undefined }, score: 2 },
          { item: items[0], matches: { text: undefined, content: [6, 11] }, score: 1 },
        ]);
        assert.deepStrictEqual(search.search('react', { ignoreCase: false }), []);
      });

      it('should keep case overrides local without changing the source text', () => {
        const item = Object.freeze({ text: 'React', content: 'Use REACT' });
        const search = new Search([item], {
          fields: { text: 2, content: 1 },
          extractField: (entry, field) => entry[field],
          ignoreCase: false,
        });

        assert.deepStrictEqual(search.search('react', { ignoreCase: true }), [
          { item, matches: { text: [0, 5], content: [4, 9] }, score: 3 },
        ]);
        assert.deepStrictEqual(search.search('react'), []);
        assert.deepStrictEqual(search.search('react', {}), []);
        assert.deepStrictEqual(search.search('react', { fields: { text: 5 } }), []);
      });

      it('should match Korean substrings without splitting words', () => {
        const search = new Search(['검색 엔진 구현'], {
          fields: { text: 1 },
          extractField: item => item,
        });

        assert.deepStrictEqual(search.search('색 엔')[0].matches.text, [1, 4]);
        assert.deepStrictEqual(search.search('검색 구현'), []);
      });
    });
  });
});
