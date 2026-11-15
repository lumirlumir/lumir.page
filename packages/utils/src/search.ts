/**
 * @fileoverview Searches extracted text fields and ranks matching items.
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Mapping of field names to their respective scores.
 */
type FieldScores<Field extends string> = Readonly<Record<Field, number>>;

/**
 * Mapping of field names to their respective score entries.
 */
type FieldScoreEntries<Field extends string> = [field: Field, score: number][];

/**
 * Match offsets compatible with `slice(start, end)`: start inclusive, end exclusive.
 */
export type Match = readonly [start: number, end: number];

/**
 * Mapping of field names to their first match range, if any.
 */
export type Matches<Field extends string> = Partial<Record<Field, Match | undefined>>;

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
export interface SearchOptions<Field extends string> {
  /**
   * Fields to search and their ranking scores. Replaces the constructor defaults; an empty object returns no results.
   */
  readonly fields?: Partial<FieldScores<Field>>;

  /**
   * Whether to ignore letter case. Defaults to the constructor setting.
   */
  readonly ignoreCase?: boolean;
}

/**
 * A matching item with its score and match ranges.
 */
export interface SearchResult<Item, Field extends string> {
  /**
   * The original item.
   */
  readonly item: Item;

  /**
   * Sum of matched field scores. Higher scores rank first.
   */
  readonly score: number;

  /**
   * First match range for each searched field, or undefined when it does not match.
   */
  readonly matches: Readonly<Matches<Field>>;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Adds each matched field's configured score once.
 * @typeParam Field The type of the field names.
 * @param matches The match ranges for each field.
 * @param fields The configured field scores.
 * @returns The total score based on matched fields.
 */
function calculateScore<Field extends string>(
  matches: Matches<Field>,
  fields: Readonly<FieldScoreEntries<Field>>,
): SearchResult<unknown, Field>['score'] {
  let totalScore = 0;

  for (const [field, score] of fields) {
    if (matches[field]) {
      totalScore += score;
    }
  }

  return totalScore;
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
 * Searches extracted text fields and ranks the original items.
 * @typeParam Item The type of the items being searched.
 * @typeParam Field The type of the field names.
 * @example
 * ```ts
 * const search = new Search([{ title: 'React' }], {
 *   fields: { title: 2 },
 *   extractField: (item, field) => item[field],
 * });
 * const results = search.search('react');
 * ```
 */
export class Search<Item, Field extends string> {
  // ------------------------------------------------------------------------------
  // Private Property
  // ------------------------------------------------------------------------------

  readonly #items: readonly Item[];
  readonly #fields: FieldScores<Field>;
  readonly #ignoreCase: boolean;
  readonly #extractField: (item: Item, field: Field) => string;

  // ------------------------------------------------------------------------------
  // Constructor
  // ------------------------------------------------------------------------------

  constructor(
    items: readonly Item[],
    {
      fields,
      ignoreCase = true,
      extractField,
    }: {
      readonly fields: FieldScores<Field>;
      readonly extractField: (item: Item, field: NoInfer<Field>) => string;
      /**
       * Whether searches ignore letter case by default.
       * @default true
       */
      readonly ignoreCase?: boolean;
    },
  ) {
    this.#items = items;
    this.#fields = fields;
    this.#ignoreCase = ignoreCase;
    this.#extractField = extractField;
  }

  // ------------------------------------------------------------------------------
  // Static Method
  // ------------------------------------------------------------------------------

  /**
   * Splits text around the supplied match range. `undefined` leaves it unhighlighted.
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
   * Searches extracted text fields and ranks matching items.
   * @param query The search query string.
   * @param options The search options including `fields` and `ignoreCase`.
   * @returns An array of search results sorted by relevance.
   */
  search(
    query: string,
    { fields = this.#fields, ignoreCase = this.#ignoreCase }: SearchOptions<Field> = {},
  ): SearchResult<Item, Field>[] {
    const normalizedQuery = normalize(query.trim(), ignoreCase);
    const fieldEntries = Object.entries(fields) as FieldScoreEntries<Field>;

    if (normalizedQuery.length === 0 || fieldEntries.length === 0) {
      return [];
    }

    return this.#items
      .map(item => {
        const matches: Matches<Field> = {};

        for (const [field] of fieldEntries) {
          matches[field] = findMatch(
            normalize(this.#extractField(item, field), ignoreCase),
            normalizedQuery,
          );
        }

        return {
          item,
          matches,
          score: calculateScore(matches, fieldEntries),
        };
      })
      .filter(({ score }) => score > 0)
      .toSorted((a, b) => b.score - a.score);
  }
}
