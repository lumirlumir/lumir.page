/**
 * @fileoverview Type test for `rehype-image-lazy-loading.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { rehypeImageLazyLoading } from './rehype-image-lazy-loading.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region rehypeImageLazyLoading

({}) as typeof rehypeImageLazyLoading satisfies Function;
({}) as ReturnType<typeof rehypeImageLazyLoading> satisfies Function;

// @ts-expect-error - `rehypeImageLazyLoading` should not accept options.
rehypeImageLazyLoading({});
// @ts-expect-error - `rehypeImageLazyLoading` should be a function.
({}) as typeof rehypeImageLazyLoading satisfies boolean;
// @ts-expect-error - `rehypeImageLazyLoading` should be a function.
({}) as typeof rehypeImageLazyLoading satisfies string;

// #endregion rehypeImageLazyLoading
// --------------------------------------------------------------------------------
