/**
 * @fileoverview Type test for `readtime.ts` and its public exports.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  countWords,
  readtimeWithCount,
  readtime,
  type WordCountStats,
  type ReadtimeStats,
  type ReadtimeOptions,
  type ReadtimeResult,
} from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region WordCountStats

({ total: 200 }) satisfies WordCountStats;

// #endregion WordCountStats
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region ReadtimeStats

({ time: 60000, minutes: 1 }) satisfies ReadtimeStats;

// #endregion ReadtimeStats
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region ReadtimeOptions

({}) satisfies ReadtimeOptions;
({ wordsPerMinute: 100, isWordBound: char => char === ' ' }) satisfies ReadtimeOptions;

// #endregion ReadtimeOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region ReadtimeResult

({ minutes: 1, time: 60000, words: { total: 200 } }) satisfies ReadtimeResult;

// #endregion ReadtimeResult
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region countWords

countWords('Hello') satisfies WordCountStats;
countWords('Hello', { isWordBound: char => char === ' ' }) satisfies WordCountStats;

// @ts-expect-error - Text is required for word counting.
countWords();
// @ts-expect-error - Word counting requires a string.
countWords(123);

// #endregion countWords
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region readtimeWithCount

readtimeWithCount({ total: 200 }) satisfies ReadtimeStats;
readtimeWithCount({ total: 200 }, { wordsPerMinute: 100 }) satisfies ReadtimeStats;

// @ts-expect-error - Count-based estimation requires word stats.
readtimeWithCount();
// @ts-expect-error - A bare number is not word stats.
readtimeWithCount(200);
// @ts-expect-error - The total must be numeric.
readtimeWithCount({ total: '200' });
// @ts-expect-error - Count-based estimation does not return word stats.
readtimeWithCount({ total: 200 }).words satisfies WordCountStats;

// #endregion readtimeWithCount
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region readtime

readtime('Hello, world!') satisfies ReadtimeResult;
readtime('Hello', undefined) satisfies ReadtimeResult;
readtime('Hello', { wordsPerMinute: 100, isWordBound: char => char === ' ' });
readtime('').minutes satisfies number;
readtime('').time satisfies number;
readtime('').words.total satisfies number;

// @ts-expect-error - Text is required.
readtime();
// @ts-expect-error - Text must be a string.
readtime(123);
// @ts-expect-error - Reading speed must be numeric.
readtime('Hello', { wordsPerMinute: '200' });
// @ts-expect-error - Word boundaries must return a boolean.
readtime('Hello', { isWordBound: char => char });
// @ts-expect-error - Word boundaries receive a string.
readtime('Hello', { isWordBound: (char: number) => char === 0 });
// @ts-expect-error - Minutes are numeric, not formatted text.
readtime('').minutes satisfies string;
// @ts-expect-error - Words are returned as a stats object.
readtime('').words satisfies number;

// #endregion readtime
// --------------------------------------------------------------------------------
