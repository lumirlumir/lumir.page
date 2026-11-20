/**
 * @fileoverview Type test for `remark-append-references.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  remarkAppendReferences,
  type RemarkAppendReferencesOptions,
} from './remark-append-references.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region RemarkAppendReferencesOptions

let options: RemarkAppendReferencesOptions;

options = {};
options = { references: [] };
options = { references: ['https://example.com'] as const };
options = { referencesHeading: '참고 링크' };
options = {
  references: ['https://example.com'] as const,
  referencesHeading: '참고 링크',
};
options = { references: undefined, referencesHeading: undefined };

// @ts-expect-error - `references` should be an array of strings or undefined.
options = { references: 'https://example.com' };
// @ts-expect-error - Each reference should be a string.
options = { references: [123] };
// @ts-expect-error - `references` should be an array of strings or undefined.
options = { references: null };
// @ts-expect-error - `referencesHeading` should be a string or undefined.
options = { referencesHeading: 123 };
// @ts-expect-error - `referencesHeading` should be a string or undefined.
options = { referencesHeading: null };
// @ts-expect-error - `unknown` is not a valid property of `RemarkAppendReferencesOptions`.
options = { unknown: 'unknown' };

// #endregion RemarkAppendReferencesOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region remarkAppendReferences

({}) as typeof remarkAppendReferences satisfies Function;
({}) as Parameters<typeof remarkAppendReferences>[0] satisfies
  RemarkAppendReferencesOptions | undefined;
({}) as ReturnType<typeof remarkAppendReferences> satisfies Function;
remarkAppendReferences() satisfies Function;

// @ts-expect-error - `remarkAppendReferences` should be a function.
({}) as typeof remarkAppendReferences satisfies boolean;
// @ts-expect-error - `remarkAppendReferences` should be a function.
({}) as typeof remarkAppendReferences satisfies string;

// #endregion remarkAppendReferences
// --------------------------------------------------------------------------------
