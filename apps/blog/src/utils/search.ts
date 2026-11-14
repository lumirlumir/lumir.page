/**
 * @fileoverview Searches heading text and section content in virtual Markdown documents.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type {
  VMarkdownHeading,
  VMarkdownFileMeta,
  VMarkdownFileMetaWithHeadings,
} from '@/data/v-markdown';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type SearchField = {
  [Key in keyof VMarkdownHeading]: VMarkdownHeading[Key] extends string ? Key : never;
}[keyof VMarkdownHeading];

type Matches = Partial<Record<SearchField, Match | undefined>>;

/**
 * Match offsets compatible with `slice(start, end)`: start inclusive, end exclusive.
 */
export type Match = readonly [start: number, end: number];

/**
 * Result of highlighting a match within text.
 */
export interface HighlightResult {
  /**
   * The text before the match.
   */
  readonly before: string;

  /**
   * The matched text.
   */
  readonly match: string;

  /**
   * The text after the match.
   */
  readonly after: string;
}

/**
 * Options for the `search` method.
 */
export interface SearchOptions {
  /**
   * Fields to search and their ranking scores. Replaces the defaults; an empty object returns no results.
   * @default { text: 2, content: 1 }
   */
  readonly fields?: Readonly<Partial<Record<SearchField, number>>>;

  /**
   * Whether to ignore letter case.
   * @default true
   */
  readonly ignoreCase?: boolean;
}

/**
 * Result of searching a virtual Markdown document.
 */
export interface SearchResult {
  /**
   * `vMarkdownFileMeta`.
   */
  readonly vMarkdownFileMeta: VMarkdownFileMeta;

  /**
   * `vMarkdownHeading`.
   */
  readonly vMarkdownHeading: VMarkdownHeading;

  /**
   * Highest score among matched fields. Higher scores rank first.
   */
  readonly score: number;

  /**
   * First match range for each searched field, or undefined when it does not match.
   */
  readonly matches: Readonly<Matches>;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/** Returns the highest configured score among the matched fields. */
function calculateScore(
  matches: Matches,
  fields: readonly [SearchField, number][],
): SearchResult['score'] {
  let score = 0;

  for (const [key, fieldScore] of fields) {
    if (matches[key]) {
      score = Math.max(score, fieldScore);
    }
  }

  return score;
}

/**
 * Returns the first match range in normalized text.
 * @param text The text to search in.
 * @param query The query string to search for.
 * @returns The first match range, or `undefined` if not found.
 */
function findMatch(text: string, query: string): Match | undefined {
  const start = text.indexOf(query);

  if (start === -1) {
    return undefined;
  }

  return [start, start + query.length];
}

/**
 * Normalizes the text based on the `ignoreCase` flag.
 * @param text The text to normalize.
 * @param ignoreCase Whether to ignore letter case.
 * @returns The normalized text.
 */
function normalize(text: string, ignoreCase: boolean): string {
  return ignoreCase ? text.toLowerCase() : text;
}

// --------------------------------------------------------------------------------
// Class
// --------------------------------------------------------------------------------

/**
 * Searches Markdown sections and ranks the results.
 *
 * @example
 * ```ts
 * const search = new Search(vMarkdownFileMetaWithHeadings);
 * const results = search.search('react');
 * ```
 */
export class Search {
  // ------------------------------------------------------------------------------
  // Private Property
  // ------------------------------------------------------------------------------

  readonly #vMarkdownFileMetaWithHeadings: readonly VMarkdownFileMetaWithHeadings[];

  // ------------------------------------------------------------------------------
  // Constructor
  // ------------------------------------------------------------------------------

  constructor(vMarkdownFileMetaWithHeadings: readonly VMarkdownFileMetaWithHeadings[]) {
    this.#vMarkdownFileMetaWithHeadings = vMarkdownFileMetaWithHeadings;
  }

  // ------------------------------------------------------------------------------
  // Static Method
  // ------------------------------------------------------------------------------

  /**
   * Splits text around the supplied match range. `undefined` leaves it unhighlighted.\
   * @param text The text to highlight.
   * @param match The match range to highlight.
   * @returns The highlighted result with `before`, `match`, and `after` segments.
   */
  static highlight(text: string, match?: Match): HighlightResult {
    const [start, end] = match ?? [text.length, text.length];

    return {
      before: text.slice(0, start),
      match: text.slice(start, end),
      after: text.slice(end),
    };
  }

  // ------------------------------------------------------------------------------
  // Public Method
  // ------------------------------------------------------------------------------

  /**
   * Searches all matching sections in ranked order.
   * @param query The search query string.
   * @param options The search options including `fields` and `ignoreCase`.
   * @returns An array of search results sorted by relevance.
   */
  search(
    query: string,
    {
      fields = {
        text: 2,
        content: 1,
      },
      ignoreCase = true,
    }: SearchOptions = {},
  ): SearchResult[] {
    const normalizedQuery = normalize(query.trim(), ignoreCase);
    const fieldEntries = Object.entries(fields) as [SearchField, number][];

    if (normalizedQuery.length === 0 || fieldEntries.length === 0) {
      return [];
    }

    return this.#vMarkdownFileMetaWithHeadings
      .flatMap(({ headings, ...vMarkdownFileMeta }) =>
        headings.map(vMarkdownHeading => {
          const matches: Matches = {};

          for (const [key] of fieldEntries) {
            matches[key] = findMatch(
              normalize(vMarkdownHeading[key], ignoreCase),
              normalizedQuery,
            );
          }

          return {
            vMarkdownFileMeta,
            vMarkdownHeading,
            matches,
            score: calculateScore(matches, fieldEntries),
          };
        }),
      )
      .filter(({ score }) => score > 0)
      .toSorted((a, b) => b.score - a.score);
  }
}
