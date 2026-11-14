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

type Matches = Partial<Record<SearchField, SearchMatch | null>>;

/**
 * Match offsets compatible with `slice(start, end)`: start inclusive, end exclusive.
 */
export type SearchMatch = readonly [start: number, end: number];

/**
 * Options for the static `highlight` method.
 */
export interface HighlightOptions {
  /**
   * The string to use as an ellipsis when excerpting long content.
   * @default '...'
   */
  readonly ellipsis?: string;

  /**
   * Whether to excerpt long content.
   * @default false
   */
  readonly excerpt?: boolean;
}

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
   * Whether to ignore letter case.
   * @default true
   */
  readonly ignoreCase?: boolean;

  /**
   * Fields to search and their ranking scores. Replaces the defaults; an empty object returns no results.
   * @default { text: 2, content: 1 }
   */
  readonly fields?: Readonly<Partial<Record<SearchField, number>>>;
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
   * First match range for each searched field, or null when it does not match.
   */
  readonly matches: Readonly<Matches>;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/** Heading fields to search and their ranking scores. */
const defaultSearchFields = {
  text: 2,
  content: 1,
} as const;

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
 * @returns The first match range, or `null` if not found.
 */
function findMatch(text: string, query: string): SearchMatch | null {
  const start = text.indexOf(query);

  if (start === -1) {
    return null;
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
 * Searches selected heading fields using substring matching.
 * Ranks matches by their highest field score and returns match ranges with document metadata and original heading references.
 * Recreate the instance when the source data changes.
 *
 * @example
 * ```ts
 * const engine = new Search(vMarkdownFiles);
 * const results = engine.search(' react ', { ignoreCase: true });
 * console.log(results[0].vMarkdownHeading.id); // The matching section's anchor.
 * console.log(results[0].vMarkdownFileMeta.url); // The document URL.
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
   * Splits text around the supplied match range; null leaves it unhighlighted.
   * Excerpts include up to 60 preceding characters and 220 total.
   */
  static highlight(
    text: string,
    match: SearchMatch | null,
    { ellipsis = '...', excerpt = false }: HighlightOptions = {},
  ): HighlightResult {
    const start = excerpt ? Math.max(0, (match?.[0] ?? 0) - 60) : 0;
    const end = excerpt ? Math.min(text.length, start + 220) : text.length;
    const matchStart = match?.[0] ?? end;
    const matchEnd = match === null ? end : Math.min(end, match[1]);

    return {
      before: `${start > 0 ? ellipsis : ''}${text.slice(start, matchStart)}`,
      match: text.slice(matchStart, matchEnd),
      after: `${text.slice(matchEnd, end)}${end < text.length ? ellipsis : ''}`,
    };
  }

  // ------------------------------------------------------------------------------
  // Public Method
  // ------------------------------------------------------------------------------

  /** Returns all matching sections in ranked order. */
  search(
    query: string,
    { ignoreCase = true, fields = defaultSearchFields }: SearchOptions = {},
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
