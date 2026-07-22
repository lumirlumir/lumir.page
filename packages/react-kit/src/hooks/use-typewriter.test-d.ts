/**
 * @fileoverview Type test for `use-typewriter.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useTypewriter, type UseTypewriterOptions } from './use-typewriter.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region UseTypewriterOptions

let options: UseTypewriterOptions;

options = {};
options = { mode: 'write' };
options = { mode: 'erase' };
options = { writeSpeed: 50 };
options = { eraseSpeed: 50 };
options = { writePreDelay: 0 };
options = { erasePreDelay: 0 };
options = { writePostDelay: 1_500 };
options = { erasePostDelay: 1_500 };
options = { loop: false };
options = { pause: false };
options = { onWriteComplete: () => {} };
options = { onEraseComplete: () => {} };

// @ts-expect-error - `text` is passed as the first argument, not as an option.
options = { text: 'Hello' };
// @ts-expect-error - `mode` should be `'write'` or `'erase'`.
options = { mode: 'idle' };
// @ts-expect-error - `writeSpeed` should be a number.
options = { writeSpeed: '50' };
// @ts-expect-error - `loop` should be a boolean.
options = { loop: 'false' };
// @ts-expect-error - `onWriteComplete` should be a function.
options = { onWriteComplete: true };
// @ts-expect-error - `unknown` is not a valid property of `UseTypewriterOptions`.
options = { unknown: 'unknown' };

// #endregion UseTypewriterOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region useTypewriter

({}) as typeof useTypewriter satisfies Function;
({}) as Parameters<typeof useTypewriter>[0] satisfies string;
({}) as Parameters<typeof useTypewriter>[1] satisfies UseTypewriterOptions | undefined;
({}) as ReturnType<typeof useTypewriter> satisfies readonly [string];

// @ts-expect-error - `useTypewriter` should be a function.
({}) as typeof useTypewriter satisfies boolean;
// @ts-expect-error - `useTypewriter` should be a function.
({}) as typeof useTypewriter satisfies string;

function useTypewriterTypeTest() {
  useTypewriter('Hello');
  useTypewriter('Hello', undefined);
  useTypewriter('Hello', {});
  useTypewriter('Hello', { mode: 'write' });
  useTypewriter('Hello', { mode: 'erase' });

  // @ts-expect-error - `useTypewriter` requires text.
  useTypewriter();
  // @ts-expect-error - `text` should be a string.
  useTypewriter(123);
  // @ts-expect-error - `text` should be passed as the first argument.
  useTypewriter({ text: 'Hello' });
  // @ts-expect-error - `text` should not be included in options.
  useTypewriter('Hello', { text: 'Hello' });
}

// #endregion useTypewriter
// --------------------------------------------------------------------------------
