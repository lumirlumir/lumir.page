/**
 * @fileoverview Tests ported from `ngryman/reading-time/test/reading-time.spec.ts`.
 * Copyright (c) Nicolas Gryman <ngryman@gmail.com> (ngryman.sh)
 * MIT Licensed; see the full license in `readtime.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { countWords, readtime, readtimeWithCount } from './readtime.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('readtime', () => {
  it('should estimate two words as one display minute and 600 milliseconds', () => {
    assert.deepStrictEqual(readtime('word '.repeat(2)), {
      minutes: 1,
      time: 600,
      words: { total: 2 },
    });
  });

  it('should estimate 50 words as one display minute and 15 seconds', () => {
    assert.deepStrictEqual(readtime('word '.repeat(50)), {
      minutes: 1,
      time: 15000,
      words: { total: 50 },
    });
  });

  it('should estimate 100 words as one display minute and 30 seconds', () => {
    assert.deepStrictEqual(readtime('word '.repeat(100)), {
      minutes: 1,
      time: 30000,
      words: { total: 100 },
    });
  });

  it('should estimate 300 words as two display minutes and 90 seconds', () => {
    assert.deepStrictEqual(readtime('word '.repeat(300)), {
      minutes: 2,
      time: 90000,
      words: { total: 300 },
    });
  });

  it('should estimate 500 words as three display minutes and 150 seconds', () => {
    assert.deepStrictEqual(readtime('word '.repeat(500)), {
      minutes: 3,
      time: 150000,
      words: { total: 500 },
    });
  });

  it('should ignore repeated spaces between words', () => {
    assert.deepStrictEqual(readtime('word  word    word'), {
      minutes: 1,
      time: 900,
      words: { total: 3 },
    });
  });

  it('should ignore leading spaces', () => {
    assert.deepStrictEqual(readtime('   word word word'), {
      minutes: 1,
      time: 900,
      words: { total: 3 },
    });
  });

  it('should ignore trailing spaces', () => {
    assert.deepStrictEqual(readtime('word word word   '), {
      minutes: 1,
      time: 900,
      words: { total: 3 },
    });
  });

  it('should count a URL as one word', () => {
    assert.deepStrictEqual(readtime('word http://ngryman.sh word'), {
      minutes: 1,
      time: 900,
      words: { total: 3 },
    });
  });

  it('should count a Markdown link as one word', () => {
    assert.deepStrictEqual(readtime('word [blog](http://ngryman.sh) word'), {
      minutes: 1,
      time: 900,
      words: { total: 3 },
    });
  });

  it('should count a single numeric character as one word', () => {
    assert.deepStrictEqual(readtime('0'), {
      minutes: 1,
      time: 300,
      words: { total: 1 },
    });
  });

  it('should return zero minutes, milliseconds, and words for empty text', () => {
    assert.deepStrictEqual(readtime(''), {
      minutes: 0,
      time: 0,
      words: { total: 0 },
    });
  });

  it('should accept a custom reading speed', () => {
    assert.deepStrictEqual(readtime('word '.repeat(200), { wordsPerMinute: 100 }), {
      minutes: 2,
      time: 120000,
      words: { total: 200 },
    });
  });

  it('should count Chinese characters and consume adjacent punctuation', () => {
    assert.deepStrictEqual(
      readtime('今天，我要说中文！（没错，现在这个库也完全支持中文了）').words,
      { total: 22 },
    );
  });

  it('should count Latin words embedded in Chinese text', () => {
    assert.deepStrictEqual(readtime('你会说English吗？').words, { total: 5 });
  });

  it('should consume Latin punctuation following Chinese characters', () => {
    assert.deepStrictEqual(
      readtime('科学文章中, 经常使用英语标点... (虽然这段话并不科学)').words,
      { total: 22 },
    );
  });

  it('should count Latin words at both ends of Chinese text', () => {
    assert.deepStrictEqual(readtime('JoshCena喜欢GitHub').words, { total: 4 });
  });

  it('should count Korean syllables individually', () => {
    assert.deepStrictEqual(readtime('이것은 한국어 단락입니다').words, { total: 11 });
  });

  it('should count Japanese kanji and hiragana individually', () => {
    assert.deepStrictEqual(readtime('天気がいいから、散歩しましょう').words, {
      total: 14,
    });
  });

  it('should treat a Katakana sequence as one word', () => {
    assert.deepStrictEqual(readtime('メガナイトありませんか？').words, { total: 7 });
  });

  it('should return zero for whitespace-only text', () => {
    assert.deepStrictEqual(readtime(' \n\r\t '), {
      minutes: 0,
      time: 0,
      words: { total: 0 },
    });
  });

  it('should separate words with newlines, carriage returns, and tabs', () => {
    assert.deepStrictEqual(readtime('one\ntwo\rthree\tfour'), {
      minutes: 1,
      time: 1200,
      words: { total: 4 },
    });
  });

  it('should preserve accented Latin characters within words', () => {
    assert.deepStrictEqual(readtime('àâéèêôùûç ÀÂÉÈÔÙÛÇ').words, { total: 2 });
  });

  it('should apply custom word boundaries and reading speed together', () => {
    assert.deepStrictEqual(
      readtime('|one|two|three|', {
        wordBound: char => ' \n\r\t|'.includes(char),
        wordsPerMinute: 2,
      }),
      { minutes: 2, time: 90000, words: { total: 3 } },
    );
  });

  it('should preserve the original rounding at 201 words', () => {
    assert.deepStrictEqual(readtime('word '.repeat(201)), {
      minutes: 1,
      time: 60300,
      words: { total: 201 },
    });
  });

  it('should round up to two display minutes at 202 words', () => {
    assert.deepStrictEqual(readtime('word '.repeat(202)), {
      minutes: 2,
      time: 60600,
      words: { total: 202 },
    });
  });
});

describe('countWords', () => {
  it('should return zero for empty text', () => {
    assert.deepStrictEqual(countWords(''), { total: 0 });
  });

  it('should count mixed Korean and Latin words', () => {
    assert.deepStrictEqual(countWords('한글 hello world'), { total: 4 });
  });

  it('should accept custom word boundaries', () => {
    assert.deepStrictEqual(
      countWords('one,two,three', { wordBound: char => ' \n\r\t,'.includes(char) }),
      { total: 3 },
    );
  });
});

describe('readtimeWithCount', () => {
  it('should use 200 words per minute by default', () => {
    assert.deepStrictEqual(readtimeWithCount({ total: 200 }), {
      minutes: 1,
      time: 60000,
    });
  });

  it('should return zero for a zero word count', () => {
    assert.deepStrictEqual(readtimeWithCount({ total: 0 }), { minutes: 0, time: 0 });
  });

  it('should accept a custom speed and round milliseconds to an integer', () => {
    assert.deepStrictEqual(readtimeWithCount({ total: 1 }, { wordsPerMinute: 7 }), {
      minutes: 1,
      time: 8571,
    });
  });
});
