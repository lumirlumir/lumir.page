/**
 * @fileoverview Type test for `remark-heading-from-title.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  remarkHeadingFromTitle,
  type RemarkHeadingFromTitleOptions,
} from './remark-heading-from-title.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region RemarkHeadingFromTitleOptions

let options: RemarkHeadingFromTitleOptions;

options = {};
options = { title: 'title' };
options = { title: '' };
options = { title: undefined };

// @ts-expect-error - `title` should be a string or undefined.
options = { title: 123 };
// @ts-expect-error - `title` should be a string or undefined.
options = { title: null };
// @ts-expect-error - `unknown` is not a valid property of `RemarkHeadingFromTitleOptions`.
options = { unknown: 'unknown' };

// #endregion RemarkHeadingFromTitleOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region remarkHeadingFromTitle

({}) as typeof remarkHeadingFromTitle satisfies Function;
({}) as Parameters<typeof remarkHeadingFromTitle>[0] satisfies
  | RemarkHeadingFromTitleOptions
  | undefined;
({}) as ReturnType<typeof remarkHeadingFromTitle> satisfies Function;

// @ts-expect-error - `remarkHeadingFromTitle` should be a function.
({}) as typeof remarkHeadingFromTitle satisfies boolean;
// @ts-expect-error - `remarkHeadingFromTitle` should be a function.
({}) as typeof remarkHeadingFromTitle satisfies string;

// #endregion remarkHeadingFromTitle
// --------------------------------------------------------------------------------
