/**
 * @fileoverview Type test for `remark-blockquote-from-description.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  remarkBlockquoteFromDescription,
  type RemarkBlockquoteFromDescriptionOptions,
} from './remark-blockquote-from-description.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region RemarkBlockquoteFromDescriptionOptions

let options: RemarkBlockquoteFromDescriptionOptions;

options = {};
options = { description: 'description' };
options = { description: '' };
options = { description: undefined };

// @ts-expect-error - `description` should be a string or undefined.
options = { description: 123 };
// @ts-expect-error - `description` should be a string or undefined.
options = { description: null };
// @ts-expect-error - `unknown` is not a valid property of `RemarkBlockquoteFromDescriptionOptions`.
options = { unknown: 'unknown' };

// #endregion RemarkBlockquoteFromDescriptionOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region remarkBlockquoteFromDescription

({}) as typeof remarkBlockquoteFromDescription satisfies Function;
({}) as Parameters<typeof remarkBlockquoteFromDescription>[0] satisfies
  RemarkBlockquoteFromDescriptionOptions | undefined;
({}) as ReturnType<typeof remarkBlockquoteFromDescription> satisfies Function;

// @ts-expect-error - `remarkBlockquoteFromDescription` should be a function.
({}) as typeof remarkBlockquoteFromDescription satisfies boolean;
// @ts-expect-error - `remarkBlockquoteFromDescription` should be a function.
({}) as typeof remarkBlockquoteFromDescription satisfies string;

// #endregion remarkBlockquoteFromDescription
// --------------------------------------------------------------------------------
