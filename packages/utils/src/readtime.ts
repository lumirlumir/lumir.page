/**
 * @fileoverview Reading time estimation, ported from `ngryman/reading-time` without streams.
 * @see https://github.com/ngryman/reading-time/tree/v2.0.0-1
 */

/*
 * The MIT License (MIT)
 *
 * Copyright (c) Nicolas Gryman <ngryman@gmail.com> (ngryman.sh)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export interface WordCountStats {
  total: number;
}

export interface ReadtimeStats {
  /**
   * Estimated reading time in milliseconds.
   */
  time: number;

  /**
   * Display minutes, rounded to two decimal places and then rounded up.
   */
  minutes: number;
}

export interface ReadtimeOptions {
  /**
   * Defaults to spaces, tabs, carriage returns, and line feeds.
   */
  isWordBound?: (char: string) => boolean;

  /**
   * Reading speed in words per minute.
   * @default 200
   */
  wordsPerMinute?: number;
}

export type ReadtimeResult = ReadtimeStats & {
  words: WordCountStats;
};

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Checks whether a numeric character code falls within any inclusive range.
 * @param number The character code to check.
 * @param arrayOfRanges Pairs of inclusive lower and upper bounds.
 * @returns Whether at least one range contains the character code.
 */
function codeIsInRanges(number: number, arrayOfRanges: number[][]): boolean {
  return arrayOfRanges.some(
    ([lowerBound, upperBound]) => lowerBound <= number && number <= upperBound,
  );
}

/**
 * Checks whether a character is counted as an individual CJK word.
 * Uses the first UTF-16 code unit, preserving the original algorithm's behavior.
 * Katakana is excluded, and supplementary CJK code points are not recognized.
 * @param char The character to check.
 * @returns Whether the first code unit falls within the configured CJK ranges.
 */
function isCJK(char: string): boolean {
  return codeIsInRanges(char.charCodeAt(0), [
    // Hiragana. Katakana is intentionally counted as a word, as in the original.
    // https://github.com/ngryman/reading-time/pull/35#issuecomment-853364526
    [0x3040, 0x309f],
    // CJK Unified Ideographs.
    [0x4e00, 0x9fff],
    // Hangul.
    [0xac00, 0xd7a3],
    // CJK extensions (kept as in the original UTF-16 implementation).
    [0x20000, 0x2ebe0],
  ]);
}

/**
 * Checks whether a character is a default word boundary: space, tab, carriage return, or line feed.
 * @param char The character to check.
 * @returns Whether the character matches a default word boundary.
 */
function isAnsiWordBound(char: string): boolean {
  return ' \t\r\n'.includes(char);
}

/**
 * Checks whether a character belongs to a punctuation range consumed after CJK words.
 * Includes ASCII punctuation, CJK symbols and punctuation, and the full-width forms range.
 * @param char The character to check.
 * @returns Whether the first UTF-16 code unit falls within a configured punctuation range.
 */
function isPunctuation(char: string): boolean {
  return codeIsInRanges(char.charCodeAt(0), [
    [0x21, 0x2f],
    [0x3a, 0x40],
    [0x5b, 0x60],
    [0x7b, 0x7e],
    // CJK Symbols and Punctuation.
    [0x3000, 0x303f],
    // Full-width ASCII punctuation variants.
    [0xff00, 0xffef],
  ]);
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Counts words using the original reading-time algorithm, including CJK characters.
 * Markdown and HTML are counted as supplied, without parsing their markup.
 */
export function countWords(
  text: string,
  { isWordBound = isAnsiWordBound }: ReadtimeOptions = {},
): WordCountStats {
  let words = 0;
  let start = 0;
  let end = text.length - 1;

  // Fetch bounds.
  while (isWordBound(text[start])) start++;
  while (isWordBound(text[end])) end--;

  // Add a trailing word bound to make handling edges more convenient.
  const normalizedText = `${text}\n`;

  for (let i = start; i <= end; i++) {
    // A CJK character is always a word. A non-boundary followed by a boundary
    // or a CJK character is the end of a word.
    if (
      isCJK(normalizedText[i]) ||
      (!isWordBound(normalizedText[i]) &&
        (isWordBound(normalizedText[i + 1]) || isCJK(normalizedText[i + 1])))
    ) {
      words++;
    }

    // Consume punctuation and word boundaries following CJK characters.
    if (isCJK(normalizedText[i])) {
      while (
        i <= end &&
        (isPunctuation(normalizedText[i + 1]) || isWordBound(normalizedText[i + 1]))
      ) {
        i++;
      }
    }
  }

  return { total: words };
}

/**
 * Estimates reading time from an existing word count at 200 words per minute by default.
 * Returns display minutes and the estimated duration in milliseconds.
 */
export function readtimeWithCount(
  words: WordCountStats,
  { wordsPerMinute = 200 }: ReadtimeOptions = {},
): ReadtimeStats {
  const minutes = words.total / wordsPerMinute;
  const time = Math.round(minutes * 60 * 1000);
  const displayed = Math.ceil(parseFloat(minutes.toFixed(2)));

  return { minutes: displayed, time };
}

/**
 * Estimates reading time for text, Markdown, or HTML using the original algorithm.
 * @example
 * ```ts
 * import { readtime } from '@lumir/utils';
 *
 * readtime('Hello, world!');
 * // { minutes: 1, time: 600, words: { total: 2 } }
 * ```
 */
export function readtime(text: string, options: ReadtimeOptions = {}): ReadtimeResult {
  const words = countWords(text, options);

  return { ...readtimeWithCount(words, options), words };
}
