/**
 * @fileoverview Type test for `rehype-image-url-replace.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  rehypeImageUrlReplace,
  type RehypeImageUrlReplaceOptions,
} from './rehype-image-url-replace.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region RehypeImageUrlReplaceOptions

let options: RehypeImageUrlReplaceOptions;

options = { searchValue: /^\/public/, replaceValue: '' };

// @ts-expect-error - `searchValue` should be a RegExp.
options = { searchValue: '^/public', replaceValue: '' };
// @ts-expect-error - `replaceValue` should be a string.
options = { searchValue: /^\/public/, replaceValue: 123 };
// @ts-expect-error - `searchValue` is required.
options = { replaceValue: '' };
// @ts-expect-error - `replaceValue` is required.
options = { searchValue: /^\/public/ };
// @ts-expect-error - `unknown` is not a valid property of `RehypeImageUrlReplaceOptions`.
options = { searchValue: /^\/public/, replaceValue: '', unknown: 'unknown' };

// #endregion RehypeImageUrlReplaceOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region rehypeImageUrlReplace

({}) as typeof rehypeImageUrlReplace satisfies Function;
({}) as Parameters<
  typeof rehypeImageUrlReplace
>[0] satisfies RehypeImageUrlReplaceOptions;
({}) as ReturnType<typeof rehypeImageUrlReplace> satisfies Function;

// @ts-expect-error - `rehypeImageUrlReplace` requires options.
rehypeImageUrlReplace();
// @ts-expect-error - `rehypeImageUrlReplace` should be a function.
({}) as typeof rehypeImageUrlReplace satisfies boolean;
// @ts-expect-error - `rehypeImageUrlReplace` should be a function.
({}) as typeof rehypeImageUrlReplace satisfies string;

// #endregion rehypeImageUrlReplace
// --------------------------------------------------------------------------------
