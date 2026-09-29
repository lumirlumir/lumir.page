/**
 * @fileoverview Type test for `readtime.ts` and its public exports.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  countWords,
  readtime,
  readtimeWithCount,
  type ReadtimeOptions,
  type ReadtimeResult,
  type ReadtimeStats,
  type WordCountStats,
} from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

({}) satisfies ReadtimeOptions;
({ wordsPerMinute: 100, wordBound: char => char === ' ' }) satisfies ReadtimeOptions;
({ total: 200 }) satisfies WordCountStats;
({ minutes: 1, time: 60000 }) satisfies ReadtimeStats;
({ minutes: 1, time: 60000, words: { total: 200 } }) satisfies ReadtimeResult;

readtime('Hello, world!') satisfies ReadtimeResult;
readtime('Hello', undefined) satisfies ReadtimeResult;
readtime('Hello', { wordsPerMinute: 100, wordBound: char => char === ' ' });
readtime('').minutes satisfies number;
readtime('').time satisfies number;
readtime('').words.total satisfies number;
countWords('Hello') satisfies WordCountStats;
countWords('Hello', { wordBound: char => char === ' ' }) satisfies WordCountStats;
readtimeWithCount({ total: 200 }) satisfies ReadtimeStats;
readtimeWithCount({ total: 200 }, { wordsPerMinute: 100 }) satisfies ReadtimeStats;

// @ts-expect-error - Text is required.
readtime();
// @ts-expect-error - Text must be a string.
readtime(123);
// @ts-expect-error - Reading speed must be numeric.
readtime('Hello', { wordsPerMinute: '200' });
// @ts-expect-error - Word boundaries must return a boolean.
readtime('Hello', { wordBound: char => char });
// @ts-expect-error - Word boundaries receive a string.
readtime('Hello', { wordBound: (char: number) => char === 0 });
// @ts-expect-error - Minutes are numeric, not formatted text.
readtime('').minutes satisfies string;
// @ts-expect-error - Words are returned as a stats object.
readtime('').words satisfies number;
// @ts-expect-error - Text is required for word counting.
countWords();
// @ts-expect-error - Word counting requires a string.
countWords(123);
// @ts-expect-error - Count-based estimation requires word stats.
readtimeWithCount();
// @ts-expect-error - A bare number is not word stats.
readtimeWithCount(200);
// @ts-expect-error - The total must be numeric.
readtimeWithCount({ total: '200' });
// @ts-expect-error - Count-based estimation does not return word stats.
readtimeWithCount({ total: 200 }).words satisfies WordCountStats;
