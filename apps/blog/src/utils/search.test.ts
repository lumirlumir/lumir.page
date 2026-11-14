/**
 * @fileoverview Test for `search.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import type { VMarkdownFileMeta, VMarkdownFileMetaWithHeadings } from '@/data/v-markdown';
import { Search } from './search.js';

// --------------------------------------------------------------------------------
// Fixture
// --------------------------------------------------------------------------------

const vMarkdownFileMeta: VMarkdownFileMeta = {
  id: 'example.en',
  slug: 'example',
  lang: 'en',
  url: '/en/posts/example',
  readtime: 1,
  data: {
    title: 'Example article',
    description: 'Example description',
    created: '2026-10-03',
    updated: '2026-10-03',
    categories: [],
    references: [],
  },
};

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('Search', () => {
  it('should return no results for blank queries or empty documents', () => {
    const engine = new Search([
      {
        ...vMarkdownFileMeta,
        headings: [{ id: 'react', text: 'React', depth: 1, content: 'Hooks' }],
      },
    ]);

    assert.deepStrictEqual(engine.search(''), []);
    assert.deepStrictEqual(engine.search(' \n\t '), []);
    assert.deepStrictEqual(new Search([]).search('React'), []);
    assert.deepStrictEqual(
      new Search([{ ...vMarkdownFileMeta, headings: [] }]).search('Example'),
      [],
    );
  });

  it('should rank title matches first and preserve input order for both kinds of ties', () => {
    const engine = new Search([
      {
        ...vMarkdownFileMeta,
        headings: [
          { id: 'body-first', text: 'Overview', depth: 1, content: 'React introduction' },
          { id: 'title-first', text: 'React hooks', depth: 2, content: '' },
        ],
      },
      {
        ...vMarkdownFileMeta,
        id: 'second.en',
        slug: 'second',
        url: '/en/posts/second',
        headings: [
          { id: 'body-second', text: 'Usage', depth: 1, content: 'Use React' },
          { id: 'title-second', text: 'REACT state', depth: 2, content: 'React state' },
          { id: 'unrelated', text: 'Other tools', depth: 2, content: 'No match' },
        ],
      },
    ]);
    const results = engine.search(' rEaCt ');

    assert.deepStrictEqual(
      results.map(({ vMarkdownHeading, score }) => [vMarkdownHeading.id, score]),
      [
        ['title-first', 2],
        ['title-second', 2],
        ['body-first', 1],
        ['body-second', 1],
      ],
    );
    assert.deepStrictEqual(results[0].matches.text, [0, 5]);
    assert.isNull(results[0].matches.content);
    assert.deepStrictEqual(results[1].matches.content, [0, 5]);
  });

  it('should search only content when fields contains only content', () => {
    const engine = new Search([
      {
        ...vMarkdownFileMeta,
        headings: [
          { id: 'title-only', text: 'React hooks', depth: 1, content: 'State' },
          { id: 'body-only', text: 'Overview', depth: 2, content: 'Use React' },
        ],
      },
    ]);
    const results = engine.search(' react ', { fields: { content: 1 } });

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].vMarkdownHeading.id, 'body-only');
    assert.strictEqual(results[0].score, 1);
    assert.deepStrictEqual(results[0].matches, { content: [4, 9] });
    assert.deepStrictEqual(
      engine.search('react', { ignoreCase: false, fields: { content: 1 } }),
      [],
    );
  });

  it('should search only heading text when fields contains only text', () => {
    const engine = new Search([
      {
        ...vMarkdownFileMeta,
        headings: [
          { id: 'body-only', text: 'Overview', depth: 1, content: 'Use React' },
          { id: 'title-only', text: 'React hooks', depth: 2, content: 'State' },
        ],
      },
    ]);
    const results = engine.search('react', { fields: { text: 4 } });

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].vMarkdownHeading.id, 'title-only');
    assert.strictEqual(results[0].score, 4);
    assert.deepStrictEqual(results[0].matches, { text: [0, 5] });
  });

  it('should return no results when fields is empty even if the query matches', () => {
    const engine = new Search([
      {
        ...vMarkdownFileMeta,
        headings: [{ id: 'react', text: 'React', depth: 1, content: 'React' }],
      },
    ]);

    assert.deepStrictEqual(engine.search('react', { fields: {} }), []);
  });

  it('should rank by the highest custom field score without adding scores and preserve ties', () => {
    const engine = new Search([
      {
        ...vMarkdownFileMeta,
        headings: [
          { id: 'title-only', text: 'React hooks', depth: 1, content: 'State' },
          { id: 'body-only', text: 'Overview', depth: 2, content: 'Use React' },
          { id: 'both', text: 'React state', depth: 2, content: 'React examples' },
        ],
      },
    ]);
    const results = engine.search('react', { fields: { text: 1, content: 3 } });

    assert.deepStrictEqual(
      results.map(({ vMarkdownHeading, score }) => [vMarkdownHeading.id, score]),
      [
        ['body-only', 3],
        ['both', 3],
        ['title-only', 1],
      ],
    );
    assert.deepStrictEqual(results[0].matches, { text: null, content: [4, 9] });
    assert.deepStrictEqual(results[1].matches, { text: [0, 5], content: [0, 5] });
  });

  it('should keep field options local to each search and restore defaults when omitted', () => {
    const engine = new Search([
      {
        ...vMarkdownFileMeta,
        headings: [{ id: 'react', text: 'React hooks', depth: 1, content: 'Use React' }],
      },
    ]);
    const fields = Object.freeze({ content: 4 });
    const [contentResult] = engine.search('react', { fields });
    const [titleResult] = engine.search('react', { fields: { text: 7 } });
    const [defaultResult] = engine.search('react');

    assert.deepStrictEqual(contentResult.matches, { content: [4, 9] });
    assert.strictEqual(contentResult.score, 4);
    assert.deepStrictEqual(titleResult.matches, { text: [0, 5] });
    assert.strictEqual(titleResult.score, 7);
    assert.deepStrictEqual(defaultResult.matches, { text: [0, 5], content: [4, 9] });
    assert.strictEqual(defaultResult.score, 2);
    assert.deepStrictEqual(fields, { content: 4 });
  });

  it('should search a heading ID only when it is explicitly selected', () => {
    const engine = new Search([
      {
        ...vMarkdownFileMeta,
        headings: [{ id: 'react-hooks', text: 'Overview', depth: 1, content: 'State' }],
      },
    ]);

    assert.deepStrictEqual(engine.search('react'), []);

    const [result] = engine.search('react', { fields: { id: 5 } });

    assert.strictEqual(result.vMarkdownHeading.id, 'react-hooks');
    assert.strictEqual(result.score, 5);
    assert.deepStrictEqual(result.matches, { id: [0, 5] });
  });

  it('should search literal punctuation and HTML-like text without fuzzy matching', () => {
    const engine = new Search([
      {
        ...vMarkdownFileMeta,
        headings: [
          { id: 'react', text: 'React [a+b]', depth: 1, content: 'Example: <img src=x>' },
        ],
      },
    ]);

    assert.deepStrictEqual(engine.search('raect'), []);
    assert.deepStrictEqual(engine.search('.*'), []);
    assert.deepStrictEqual(engine.search('[a+b]')[0].matches.text, [6, 11]);
    assert.deepStrictEqual(engine.search('<IMG SRC=X>')[0].matches.content, [9, 20]);
  });

  it('should match case exactly in both fields when ignoreCase is false and rank matching heading text first', () => {
    const engine = new Search([
      {
        ...vMarkdownFileMeta,
        headings: [
          { id: 'body', text: 'REACT usage', depth: 1, content: 'Learn React here.' },
          { id: 'title', text: 'React hooks', depth: 2, content: 'Use REACT.' },
        ],
      },
    ]);
    const results = engine.search(' React ', { ignoreCase: false });

    assert.deepStrictEqual(
      results.map(({ vMarkdownHeading, score }) => [vMarkdownHeading.id, score]),
      [
        ['title', 2],
        ['body', 1],
      ],
    );
    assert.deepStrictEqual(results[0].matches.text, [0, 5]);
    assert.isNull(results[0].matches.content);
    assert.isNull(results[1].matches.text);
    assert.deepStrictEqual(results[1].matches.content, [6, 11]);
    assert.deepStrictEqual(engine.search('react', { ignoreCase: false }), []);
    assert.deepStrictEqual(engine.search(' \n\t ', { ignoreCase: false }), []);
  });

  it('should allow toggling ignoreCase per search without changing source text', () => {
    const document: VMarkdownFileMetaWithHeadings = {
      ...vMarkdownFileMeta,
      headings: [{ id: 'react', text: 'React hooks', depth: 1, content: 'Use REACT.' }],
    };
    const original = structuredClone(document);
    const engine = new Search([document]);

    assert.deepStrictEqual(engine.search('react', { ignoreCase: false }), []);
    assert.deepStrictEqual(
      engine.search('react', { ignoreCase: true })[0].matches.text,
      [0, 5],
    );
    assert.deepStrictEqual(
      engine.search('react', { ignoreCase: true })[0].matches.content,
      [4, 9],
    );
    assert.strictEqual(engine.search('react')[0].vMarkdownHeading, document.headings[0]);
    assert.deepStrictEqual(
      engine.search('react', {})[0].vMarkdownFileMeta,
      vMarkdownFileMeta,
    );
    assert.deepStrictEqual(engine.search('react', { ignoreCase: false }), []);
    assert.deepStrictEqual(document, original);
  });

  it('should search Korean substrings without splitting the query into tokens', () => {
    const engine = new Search([
      {
        ...vMarkdownFileMeta,
        id: 'example.ko',
        lang: 'ko',
        url: '/ko/posts/example',
        headings: [
          {
            id: '검색',
            text: '검색 엔진 구현',
            depth: 1,
            content: '간단한 검색 기능입니다.',
          },
        ],
      },
    ]);

    assert.deepStrictEqual(engine.search('색 엔')[0].matches.text, [1, 4]);
    assert.deepStrictEqual(engine.search('검색 구현'), []);
  });

  it('should return first match ranges keyed by heading fields without preparing highlights', () => {
    const document: VMarkdownFileMetaWithHeadings = {
      ...vMarkdownFileMeta,
      headings: [
        {
          id: 'react',
          text: 'React & Reactivity',
          depth: 1,
          content: 'Try REACT; a reaction guide.',
        },
      ],
    };
    const engine = new Search([document]);
    const [result] = engine.search('react');

    assert.deepStrictEqual(result, {
      vMarkdownFileMeta,
      vMarkdownHeading: document.headings[0],
      matches: { text: [0, 5], content: [4, 9] },
      score: 2,
    });
  });

  it('should return metadata without headings and preserve matching heading references across documents', () => {
    const documents: readonly VMarkdownFileMetaWithHeadings[] = [
      {
        ...vMarkdownFileMeta,
        headings: [{ id: 'shared', text: 'React hooks', depth: 1, content: 'State' }],
      },
      {
        ...vMarkdownFileMeta,
        id: 'second.en',
        slug: 'second',
        url: '/en/posts/second',
        headings: [{ id: 'shared', text: 'State', depth: 1, content: 'React' }],
      },
    ];
    const original = structuredClone(documents);
    const engine = new Search(documents);

    const reactResults = engine.search('react');
    const stateResults = engine.search('state');

    assert.deepStrictEqual(reactResults[0].vMarkdownFileMeta, vMarkdownFileMeta);
    assert.isFalse('headings' in reactResults[0].vMarkdownFileMeta);
    assert.strictEqual(reactResults[0].vMarkdownFileMeta.data, documents[0].data);
    assert.strictEqual(reactResults[0].vMarkdownHeading, documents[0].headings[0]);
    assert.deepStrictEqual(reactResults[1].vMarkdownFileMeta, {
      ...vMarkdownFileMeta,
      id: 'second.en',
      slug: 'second',
      url: '/en/posts/second',
    });
    assert.isFalse('headings' in reactResults[1].vMarkdownFileMeta);
    assert.strictEqual(reactResults[1].vMarkdownHeading, documents[1].headings[0]);
    assert.deepStrictEqual(
      stateResults[0].vMarkdownFileMeta,
      reactResults[1].vMarkdownFileMeta,
    );
    assert.strictEqual(stateResults[0].vMarkdownHeading, documents[1].headings[0]);
    assert.strictEqual(
      engine.search('react')[0].vMarkdownHeading,
      documents[0].headings[0],
    );
    assert.deepStrictEqual(documents, original);
  });

  it('should return all matching sections in ranked order when more than ten match', () => {
    const engine = new Search([
      {
        ...vMarkdownFileMeta,
        headings: [
          ...Array.from({ length: 11 }, (_, id) => ({
            id: `section-${id}`,
            text: `Section ${id}`,
            depth: 2 as const,
            content: 'React',
          })),
          { id: 'react', text: 'React', depth: 2, content: '' },
        ],
      },
    ]);

    const results = engine.search('react');

    assert.deepStrictEqual(
      results.map(({ vMarkdownHeading }) => vMarkdownHeading.id),
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
    const engine = new Search([
      {
        ...vMarkdownFileMeta,
        headings: [{ id: 'react', text: 'Use React', depth: 1, content: '' }],
      },
    ]);
    const [result] = engine.search(' ReAcT ');

    assert.deepStrictEqual(
      Search.highlight(result.vMarkdownHeading.text, result.matches.text ?? null),
      { before: 'Use ', match: 'React', after: '' },
    );
  });

  it('should leave unmatched fields unhighlighted and excerpt long content from its start', () => {
    assert.deepStrictEqual(Search.highlight('x'.repeat(250), null, { excerpt: true }), {
      before: 'x'.repeat(220),
      match: '',
      after: '...',
    });
    assert.deepStrictEqual(Search.highlight('Usage', null), {
      before: 'Usage',
      match: '',
      after: '',
    });
    assert.deepStrictEqual(Search.highlight('', null), {
      before: '',
      match: '',
      after: '',
    });
  });

  it('should keep 60 characters before a distant match and cap the excerpt at 220 characters', () => {
    assert.deepStrictEqual(
      Search.highlight(`${'x'.repeat(100)}React${'y'.repeat(300)}`, [100, 105], {
        excerpt: true,
      }),
      {
        before: `...${'x'.repeat(60)}`,
        match: 'React',
        after: `${'y'.repeat(155)}...`,
      },
    );
  });

  it('should omit the leading ellipsis for a match at the start of the content', () => {
    assert.deepStrictEqual(
      Search.highlight(`React${'x'.repeat(300)}`, [0, 5], { excerpt: true }),
      {
        before: '',
        match: 'React',
        after: `${'x'.repeat(215)}...`,
      },
    );
  });

  it('should omit the trailing ellipsis when the excerpt reaches the end of the content', () => {
    assert.deepStrictEqual(
      Search.highlight(`${'x'.repeat(100)}React`, [100, 105], { excerpt: true }),
      {
        before: `...${'x'.repeat(60)}`,
        match: 'React',
        after: '',
      },
    );
  });

  it('should clip a match longer than the excerpt without repeating text after it', () => {
    assert.deepStrictEqual(
      Search.highlight(`${'x'.repeat(100)}${'R'.repeat(300)}End`, [100, 400], {
        excerpt: true,
      }),
      {
        before: `...${'x'.repeat(60)}`,
        match: 'R'.repeat(160),
        after: '...',
      },
    );
  });

  it('should use a custom ellipsis at both truncated ends of an excerpt', () => {
    assert.deepStrictEqual(
      Search.highlight(`${'x'.repeat(100)}React${'y'.repeat(300)}`, [100, 105], {
        excerpt: true,
        ellipsis: '…',
      }),
      {
        before: `…${'x'.repeat(60)}`,
        match: 'React',
        after: `${'y'.repeat(155)}…`,
      },
    );
  });

  it('should allow an empty ellipsis while still excerpting the content', () => {
    assert.deepStrictEqual(
      Search.highlight(`${'x'.repeat(100)}React${'y'.repeat(300)}`, [100, 105], {
        excerpt: true,
        ellipsis: '',
      }),
      {
        before: 'x'.repeat(60),
        match: 'React',
        after: 'y'.repeat(155),
      },
    );
  });

  it('should use the custom ellipsis when excerpting content without a match', () => {
    assert.deepStrictEqual(
      Search.highlight('x'.repeat(250), null, { excerpt: true, ellipsis: ' [more]' }),
      { before: 'x'.repeat(220), match: '', after: ' [more]' },
    );
  });

  it('should preserve the full text when excerpt is omitted or false', () => {
    assert.deepStrictEqual(Search.highlight(`React${'x'.repeat(300)}`, [0, 5], {}), {
      before: '',
      match: 'React',
      after: 'x'.repeat(300),
    });
    assert.deepStrictEqual(
      Search.highlight(`React${'x'.repeat(300)}`, [0, 5], { ellipsis: '…' }),
      { before: '', match: 'React', after: 'x'.repeat(300) },
    );
    assert.deepStrictEqual(
      Search.highlight(`React${'x'.repeat(300)}`, [0, 5], {
        excerpt: false,
        ellipsis: '…',
      }),
      { before: '', match: 'React', after: 'x'.repeat(300) },
    );
  });
});
