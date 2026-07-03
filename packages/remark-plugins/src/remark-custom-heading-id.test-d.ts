/**
 * @fileoverview Type test for `remark-custom-heading-id.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { remarkCustomHeadingId } from './remark-custom-heading-id.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region remarkCustomHeadingId

({}) as typeof remarkCustomHeadingId satisfies Function;
({}) as ReturnType<typeof remarkCustomHeadingId> satisfies Function;

// @ts-expect-error - `remarkCustomHeadingId` should be a function.
({}) as typeof remarkCustomHeadingId satisfies boolean;
// @ts-expect-error - `remarkCustomHeadingId` should be a function.
({}) as typeof remarkCustomHeadingId satisfies string;

// #endregion remarkCustomHeadingId
// --------------------------------------------------------------------------------
