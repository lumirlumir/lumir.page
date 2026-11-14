/**
 * @fileoverview Type test for `search.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  Search,
  type Match,
  type Matches,
  type HighlightResult,
  type SearchOptions,
  type SearchResult,
} from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region Match

let match: Match;

match = [0, 5];

// @ts-expect-error - A match requires both start and end offsets.
match = [0];
// @ts-expect-error - Match offsets are readonly.
match[0] = 1;

// #endregion Match
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region Matches

let matches: Matches<'title' | 'content'>;

matches = {};
matches = { title: [0, 5], content: undefined };

// @ts-expect-error - Matches only contain the specified fields.
matches = { author: [0, 5] };

// #endregion Matches
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region HighlightResult

let highlightResult: HighlightResult;

highlightResult = { before: '', match: 'React', after: '' };

// @ts-expect-error - All highlighted segments are required.
highlightResult = { before: '', match: 'React' };
// @ts-expect-error - Highlighted segments are readonly.
highlightResult.match = 'Guide';

// #endregion HighlightResult
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region SearchOptions

let options: SearchOptions<'title' | 'content'>;

options = {};
options = { fields: { title: 2 }, ignoreCase: false };

// @ts-expect-error - Search fields must match the specified field type.
options = { fields: { author: 1 } };
// @ts-expect-error - `ignoreCase` should be a boolean.
options = { ignoreCase: 'false' };

// #endregion SearchOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region SearchResult

let searchResult: SearchResult<string, 'text'>;

searchResult = { item: 'React', score: 1, matches: { text: [0, 5] } };

// @ts-expect-error - The item must match the specified item type.
searchResult = { item: 123, score: 1, matches: {} };
// @ts-expect-error - Search results are readonly.
searchResult.score = 1;
// @ts-expect-error - Result match ranges are readonly.
searchResult.matches.text = [0, 5];

// #endregion SearchResult
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region Search

({}) as typeof Search satisfies Function;
({}) as ConstructorParameters<typeof Search>[0] satisfies readonly unknown[];

// @ts-expect-error - `Search` should be a constructor.
({}) as typeof Search satisfies boolean;
// @ts-expect-error - `Search` should be a constructor.
({}) as typeof Search satisfies string;

const items: readonly { title: string; content: string }[] = [
  { title: 'React', content: 'Guide' },
];
const search = new Search(items, {
  fields: { title: 2, content: 1 },
  extractField: (item, field) => {
    item satisfies (typeof items)[number];
    field satisfies 'title' | 'content';
    return item[field];
  },
});

const invalidSearch = new Search(items, {
  fields: { title: 1 },
  // @ts-expect-error - Field extraction must return a string.
  extractField: () => 123,
});

// #endregion Search
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region Search.highlight

({}) as typeof Search.highlight satisfies Function;
({}) as Parameters<typeof Search.highlight>[0] satisfies string;
({}) as Parameters<typeof Search.highlight>[1] satisfies Match | undefined;
({}) as ReturnType<typeof Search.highlight> satisfies HighlightResult;

// @ts-expect-error - `highlight` should be a function.
({}) as typeof Search.highlight satisfies boolean;
// @ts-expect-error - `highlight` should return highlighted segments.
({}) as ReturnType<typeof Search.highlight> satisfies string;

Search.highlight('React', [0, 5]) satisfies HighlightResult;
Search.highlight('React') satisfies HighlightResult;
Search.highlight('React', undefined) satisfies HighlightResult;

// @ts-expect-error - Highlighting requires text.
Search.highlight();
// @ts-expect-error - A match requires both start and end offsets.
Search.highlight('React', [0]);

// #endregion Search.highlight
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region Search#search

({}) as typeof search.search satisfies Function;
({}) as Parameters<typeof search.search>[0] satisfies string;
({}) as Parameters<typeof search.search>[1] satisfies
  SearchOptions<'title' | 'content'> | undefined;
({}) as ReturnType<typeof search.search> satisfies SearchResult<
  (typeof items)[number],
  'title' | 'content'
>[];

// @ts-expect-error - `search` should be a function.
({}) as typeof search.search satisfies boolean;
// @ts-expect-error - `search` should return search results.
({}) as ReturnType<typeof search.search> satisfies string;

search.search('React');
search.search('React', { fields: { title: 2 }, ignoreCase: false });
search.search('React', { fields: {} });

const [result] = search.search('React');
result.matches satisfies Readonly<Matches<'title' | 'content'>>;
result.matches.title satisfies Match | undefined;

// @ts-expect-error - A query is required.
search.search();
// @ts-expect-error - The query must be a string.
search.search(123);
// @ts-expect-error - Search fields must be configured in the constructor.
search.search('React', { fields: { author: 1 } });
// @ts-expect-error - Field scores must be numeric.
search.search('React', { fields: { title: '2' } });
// @ts-expect-error - Matches only contain configured fields.
result.matches.author satisfies Match | undefined;

// #endregion Search#search
// --------------------------------------------------------------------------------
