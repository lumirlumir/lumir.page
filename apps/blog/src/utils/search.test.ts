/**
 * @fileoverview Test for `search.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, expectTypeOf, it } from 'vitest';
import { Search, type Match } from './search.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('Search', () => {
  it('should return no results for blank queries or empty items', () => {
    const engine = new Search([{ text: 'React', content: 'Hooks' }], {
      fields: { text: 2, content: 1 },
      extractField: (item, field) => item[field],
    });
    const emptyEngine = new Search<string, 'text'>([], {
      fields: { text: 1 },
      extractField: item => item,
    });

    assert.deepStrictEqual(engine.search(''), []);
    assert.deepStrictEqual(engine.search(' \n\t '), []);
    assert.deepStrictEqual(emptyEngine.search('React'), []);
  });

  it('should rank matches in both fields first and preserve input order for equal scores', () => {
    const engine = new Search(
      [
        { id: 'body-first', text: 'Overview', content: 'React introduction' },
        { id: 'title-first', text: 'React hooks', content: '' },
        { id: 'body-second', text: 'Usage', content: 'Use React' },
        { id: 'title-second', text: 'REACT state', content: '' },
        { id: 'both', text: 'React examples', content: 'React state' },
        { id: 'unrelated', text: 'Other tools', content: 'No match' },
      ],
      { fields: { text: 2, content: 1 }, extractField: (item, field) => item[field] },
    );
    const results = engine.search(' rEaCt ');

    assert.deepStrictEqual(
      results.map(({ item, score }) => [item.id, score]),
      [
        ['both', 3],
        ['title-first', 2],
        ['title-second', 2],
        ['body-first', 1],
        ['body-second', 1],
      ],
    );
    assert.deepStrictEqual(results[0].matches.text, [0, 5]);
    assert.deepStrictEqual(results[0].matches.content, [0, 5]);
    assert.isUndefined(results[1].matches.content);
  });

  it('should search only content when fields contains only content', () => {
    const engine = new Search(
      [
        { id: 'title-only', text: 'React hooks', content: 'State' },
        { id: 'body-only', text: 'Overview', content: 'Use React' },
      ],
      { fields: { text: 2, content: 1 }, extractField: (item, field) => item[field] },
    );
    const results = engine.search(' react ', { fields: { content: 1 } });

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].item.id, 'body-only');
    assert.strictEqual(results[0].score, 1);
    assert.deepStrictEqual(results[0].matches, { content: [4, 9] });
    assert.deepStrictEqual(
      engine.search('react', { ignoreCase: false, fields: { content: 1 } }),
      [],
    );
  });

  it('should search only text when fields contains only text', () => {
    const engine = new Search(
      [
        { id: 'body-only', text: 'Overview', content: 'Use React' },
        { id: 'title-only', text: 'React hooks', content: 'State' },
      ],
      { fields: { text: 2, content: 1 }, extractField: (item, field) => item[field] },
    );
    const results = engine.search('react', { fields: { text: 4 } });

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].item.id, 'title-only');
    assert.strictEqual(results[0].score, 4);
    assert.deepStrictEqual(results[0].matches, { text: [0, 5] });
  });

  it('should return no results when fields is empty even if the query matches', () => {
    const engine = new Search([{ text: 'React', content: 'React' }], {
      fields: { text: 2, content: 1 },
      extractField: (item, field) => item[field],
    });

    assert.deepStrictEqual(engine.search('react', { fields: {} }), []);
  });

  it('should sum custom scores once per matched field and preserve ties', () => {
    const engine = new Search(
      [
        { id: 'title-only', text: 'React hooks', content: 'State' },
        { id: 'body-only', text: 'Overview', content: 'Use React' },
        { id: 'both', text: 'React state', content: 'React examples' },
        { id: 'both-second', text: 'React React', content: 'React React examples' },
      ],
      { fields: { text: 2, content: 1 }, extractField: (item, field) => item[field] },
    );
    const results = engine.search('react', { fields: { text: 1, content: 3 } });

    assert.deepStrictEqual(
      results.map(({ item, score }) => [item.id, score]),
      [
        ['both', 4],
        ['both-second', 4],
        ['body-only', 3],
        ['title-only', 1],
      ],
    );
    assert.deepStrictEqual(results[0].matches, { text: [0, 5], content: [0, 5] });
    assert.deepStrictEqual(results[2].matches, { text: undefined, content: [4, 9] });
  });

  it('should keep field options local to each search and restore constructor defaults when omitted', () => {
    const defaults = Object.freeze({ text: 5, content: 2 });
    const engine = new Search([{ text: 'React hooks', content: 'Use React' }], {
      fields: defaults,
      extractField: (item, field) => item[field],
    });
    const fields = Object.freeze({ content: 4 });
    const [contentResult] = engine.search('react', { fields });
    const [titleResult] = engine.search('react', { fields: { text: 7 } });
    const [defaultResult] = engine.search('react');

    assert.deepStrictEqual(contentResult.matches, { content: [4, 9] });
    assert.strictEqual(contentResult.score, 4);
    assert.deepStrictEqual(titleResult.matches, { text: [0, 5] });
    assert.strictEqual(titleResult.score, 7);
    assert.deepStrictEqual(defaultResult.matches, { text: [0, 5], content: [4, 9] });
    assert.strictEqual(defaultResult.score, 7);
    assert.deepStrictEqual(fields, { content: 4 });
    assert.deepStrictEqual(defaults, { text: 5, content: 2 });
  });

  it('should extract nested values through registered names and preserve the original item', () => {
    const item = { id: 42, details: { name: 'React guide', description: 'Use React' } };
    const engine = new Search([item], {
      fields: { title: 3, body: 1 },
      extractField: (entry, field) => {
        expectTypeOf(entry).toEqualTypeOf<typeof item>();
        expectTypeOf(field).toEqualTypeOf<'title' | 'body'>();
        return field === 'title' ? entry.details.name : entry.details.description;
      },
    });
    const [result] = engine.search('react');

    assert.strictEqual(result.item, item);
    assert.strictEqual(result.item.details, item.details);
    assert.deepStrictEqual(result, {
      item,
      matches: { title: [0, 5], body: [4, 9] },
      score: 4,
    });
    expectTypeOf(result.item).toEqualTypeOf<typeof item>();
    expectTypeOf(result.matches).toEqualTypeOf<
      Readonly<Partial<Record<'title' | 'body', Match | undefined>>>
    >();
    expectTypeOf<
      NonNullable<Parameters<typeof engine.search>[1]>['fields']
    >().toEqualTypeOf<Readonly<Partial<Record<'title' | 'body', number>>> | undefined>();
  });

  it('should search primitive items through an extractor', () => {
    const engine = new Search(['React', 'Other tools'], {
      fields: { label: 4 },
      extractField: item => item,
    });

    assert.deepStrictEqual(engine.search('react'), [
      { item: 'React', matches: { label: [0, 5] }, score: 4 },
    ]);
  });

  it('should search an ID when it is registered as a search field', () => {
    const engine = new Search([{ id: 'react-hooks', text: 'Overview' }], {
      fields: { id: 5 },
      extractField: (item, field) => item[field],
    });
    const [result] = engine.search('react');

    assert.strictEqual(result.item.id, 'react-hooks');
    assert.strictEqual(result.score, 5);
    assert.deepStrictEqual(result.matches, { id: [0, 5] });
    assert.deepStrictEqual(engine.search('Overview'), []);
  });

  it('should search literal punctuation and HTML-like text without fuzzy matching', () => {
    const engine = new Search(
      [{ text: 'React [a+b]', content: 'Example: <img src=x>' }],
      {
        fields: { text: 2, content: 1 },
        extractField: (item, field) => item[field],
      },
    );

    assert.deepStrictEqual(engine.search('raect'), []);
    assert.deepStrictEqual(engine.search('.*'), []);
    assert.deepStrictEqual(engine.search('[a+b]')[0].matches.text, [6, 11]);
    assert.deepStrictEqual(engine.search('<IMG SRC=X>')[0].matches.content, [9, 20]);
  });

  it('should match case exactly in both fields when ignoreCase is false and rank matching text first', () => {
    const engine = new Search(
      [
        { id: 'body', text: 'REACT usage', content: 'Learn React here.' },
        { id: 'title', text: 'React hooks', content: 'Use REACT.' },
      ],
      { fields: { text: 2, content: 1 }, extractField: (item, field) => item[field] },
    );
    const results = engine.search(' React ', { ignoreCase: false });

    assert.deepStrictEqual(
      results.map(({ item, score }) => [item.id, score]),
      [
        ['title', 2],
        ['body', 1],
      ],
    );
    assert.deepStrictEqual(results[0].matches.text, [0, 5]);
    assert.isUndefined(results[0].matches.content);
    assert.isUndefined(results[1].matches.text);
    assert.deepStrictEqual(results[1].matches.content, [6, 11]);
    assert.deepStrictEqual(engine.search('react', { ignoreCase: false }), []);
    assert.deepStrictEqual(engine.search(' \n\t ', { ignoreCase: false }), []);
  });

  it('should use the constructor case setting unless a search overrides it', () => {
    const item = { text: 'React', content: 'Use REACT' };
    const engine = new Search([item], {
      fields: { text: 2, content: 1 },
      extractField: (entry, field) => entry[field],
      ignoreCase: false,
    });

    assert.deepStrictEqual(engine.search('react'), []);
    assert.deepStrictEqual(engine.search('React'), [
      { item, matches: { text: [0, 5], content: undefined }, score: 2 },
    ]);
    assert.deepStrictEqual(engine.search('react', { ignoreCase: true }), [
      { item, matches: { text: [0, 5], content: [4, 9] }, score: 3 },
    ]);
    assert.deepStrictEqual(engine.search('react'), []);
    assert.deepStrictEqual(engine.search('react', { fields: { text: 5 } }), []);
  });

  it('should allow toggling ignoreCase per search without changing source text', () => {
    const item = { text: 'React hooks', content: 'Use REACT.' };
    const original = structuredClone(item);
    const engine = new Search([item], {
      fields: { text: 2, content: 1 },
      extractField: (entry, field) => entry[field],
    });

    assert.deepStrictEqual(engine.search('react', { ignoreCase: false }), []);
    assert.deepStrictEqual(
      engine.search('react', { ignoreCase: true })[0].matches.text,
      [0, 5],
    );
    assert.deepStrictEqual(
      engine.search('react', { ignoreCase: true })[0].matches.content,
      [4, 9],
    );
    assert.strictEqual(engine.search('react')[0].item, item);
    assert.strictEqual(engine.search('react', {})[0].item, item);
    assert.deepStrictEqual(engine.search('react', { ignoreCase: false }), []);
    assert.deepStrictEqual(item, original);
  });

  it('should search Korean substrings without splitting the query into tokens', () => {
    const engine = new Search(
      [{ text: '검색 엔진 구현', content: '간단한 검색 기능입니다.' }],
      { fields: { text: 2, content: 1 }, extractField: (item, field) => item[field] },
    );

    assert.deepStrictEqual(engine.search('색 엔')[0].matches.text, [1, 4]);
    assert.deepStrictEqual(engine.search('검색 구현'), []);
  });

  it('should return the original item and first match ranges without preparing highlights', () => {
    const item = { text: 'React & Reactivity', content: 'Try REACT; a reaction guide.' };
    const engine = new Search([item], {
      fields: { text: 2, content: 1 },
      extractField: (entry, field) => entry[field],
    });
    const [result] = engine.search('react');

    assert.strictEqual(result.item, item);
    assert.deepStrictEqual(result, {
      item,
      matches: { text: [0, 5], content: [4, 9] },
      score: 3,
    });
  });

  it('should return all matching items in ranked order when more than ten match', () => {
    const items = [
      ...Array.from({ length: 11 }, (_, id) => ({
        id: `section-${id}`,
        text: `Section ${id}`,
        content: 'React',
      })),
      { id: 'react', text: 'React', content: '' },
    ];
    const original = structuredClone(items);
    const engine = new Search(items, {
      fields: { text: 2, content: 1 },
      extractField: (item, field) => item[field],
    });
    const results = engine.search('react');

    assert.deepStrictEqual(
      results.map(({ item }) => item.id),
      [
        'react',
        'section-0',
        'section-1',
        'section-2',
        'section-3',
        'section-4',
        'section-5',
        'section-6',
        'section-7',
        'section-8',
        'section-9',
        'section-10',
      ],
    );
    assert.deepStrictEqual(results[11].matches.content, [0, 5]);
    assert.strictEqual(results[0].item, items[11]);
    assert.strictEqual(results[1].item, items[0]);
    assert.deepStrictEqual(items, original);
  });
});

describe('Search.highlight', () => {
  it('should highlight the supplied match and preserve the surrounding text and casing', () => {
    assert.deepStrictEqual(Search.highlight('React & Reactivity', [0, 5]), {
      before: '',
      match: 'React',
      after: ' & Reactivity',
    });
    assert.deepStrictEqual(Search.highlight('Try REACT; a reaction guide.', [4, 9]), {
      before: 'Try ',
      match: 'REACT',
      after: '; a reaction guide.',
    });
    assert.deepStrictEqual(Search.highlight('Example: <img src=x>', [9, 20]), {
      before: 'Example: ',
      match: '<img src=x>',
      after: '',
    });
  });

  it('should accept match metadata from search results without repeating the search', () => {
    const engine = new Search([{ text: 'Use React', content: 'Hooks and state' }], {
      fields: { text: 2, content: 1 },
      extractField: (item, field) => item[field],
    });
    const [result] = engine.search(' ReAcT ');

    assert.deepStrictEqual(Search.highlight(result.item.text, result.matches.text), {
      before: 'Use ',
      match: 'React',
      after: '',
    });
  });

  it('should preserve all unmatched text without highlighting or excerpting it', () => {
    assert.deepStrictEqual(Search.highlight('x'.repeat(250), undefined), {
      before: 'x'.repeat(250),
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

  it('should preserve a long match and all surrounding text without adding ellipses', () => {
    assert.deepStrictEqual(
      Search.highlight(`${'x'.repeat(100)}${'R'.repeat(300)}End`, [100, 400]),
      { before: 'x'.repeat(100), match: 'R'.repeat(300), after: 'End' },
    );
  });
});
