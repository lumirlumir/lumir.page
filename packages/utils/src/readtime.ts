/**
 * @fileoverview Reading time estimation, ported from `ngryman/reading-time` without streams.
 * @see https://github.com/ngryman/reading-time/tree/1d07a5cb1c01950e4a0b0dce9aab7192fedd9b92
 */

/*!
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

export interface ReadtimeOptions {
  /** Defaults to spaces, newlines, carriage returns, and tabs. */
  wordBound?: (char: string) => boolean;
  /** Reading speed in words per minute. Defaults to 200. */
  wordsPerMinute?: number;
}

export interface ReadtimeStats {
  /** Estimated reading time in milliseconds. */
  time: number;
  /** Display minutes, rounded to two decimal places and then rounded up. */
  minutes: number;
}

export interface WordCountStats {
  total: number;
}

export type ReadtimeResult = ReadtimeStats & {
  words: WordCountStats;
};

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function codeIsInRanges(number: number, arrayOfRanges: number[][]): boolean {
  return arrayOfRanges.some(
    ([lowerBound, upperBound]) => lowerBound <= number && number <= upperBound,
  );
}

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

function isAnsiWordBound(char: string): boolean {
  return ' \n\r\t'.includes(char);
}

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
export function countWords(text: string, options: ReadtimeOptions = {}): WordCountStats {
  let words = 0;
  let start = 0;
  let end = text.length - 1;
  const { wordBound: isWordBound = isAnsiWordBound } = options;

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
  options: ReadtimeOptions = {},
): ReadtimeStats {
  const { wordsPerMinute = 200 } = options;
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
