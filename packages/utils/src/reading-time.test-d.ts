/**
 * @fileoverview Type test for `reading-time.ts` and its public exports.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  countWords,
  readingTime,
  readingTimeWithCount,
  type ReadingTimeOptions,
  type ReadingTimeResult,
  type ReadingTimeStats,
  type WordCountStats,
} from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

({}) satisfies ReadingTimeOptions;
({ wordsPerMinute: 100, wordBound: char => char === ' ' }) satisfies ReadingTimeOptions;
({ total: 200 }) satisfies WordCountStats;
({ minutes: 1, time: 60000 }) satisfies ReadingTimeStats;
({ minutes: 1, time: 60000, words: { total: 200 } }) satisfies ReadingTimeResult;

readingTime('Hello, world!') satisfies ReadingTimeResult;
readingTime('Hello', undefined) satisfies ReadingTimeResult;
readingTime('Hello', { wordsPerMinute: 100, wordBound: char => char === ' ' });
readingTime('').minutes satisfies number;
readingTime('').time satisfies number;
readingTime('').words.total satisfies number;
countWords('Hello') satisfies WordCountStats;
countWords('Hello', { wordBound: char => char === ' ' }) satisfies WordCountStats;
readingTimeWithCount({ total: 200 }) satisfies ReadingTimeStats;
readingTimeWithCount({ total: 200 }, { wordsPerMinute: 100 }) satisfies ReadingTimeStats;

// @ts-expect-error - Text is required.
readingTime();
// @ts-expect-error - Text must be a string.
readingTime(123);
// @ts-expect-error - Reading speed must be numeric.
readingTime('Hello', { wordsPerMinute: '200' });
// @ts-expect-error - Word boundaries must return a boolean.
readingTime('Hello', { wordBound: char => char });
// @ts-expect-error - Word boundaries receive a string.
readingTime('Hello', { wordBound: (char: number) => char === 0 });
// @ts-expect-error - Minutes are numeric, not formatted text.
readingTime('').minutes satisfies string;
// @ts-expect-error - Words are returned as a stats object.
readingTime('').words satisfies number;
// @ts-expect-error - Text is required for word counting.
countWords();
// @ts-expect-error - Word counting requires a string.
countWords(123);
// @ts-expect-error - Count-based estimation requires word stats.
readingTimeWithCount();
// @ts-expect-error - A bare number is not word stats.
readingTimeWithCount(200);
// @ts-expect-error - The total must be numeric.
readingTimeWithCount({ total: '200' });
// @ts-expect-error - Count-based estimation does not return word stats.
readingTimeWithCount({ total: 200 }).words satisfies WordCountStats;
