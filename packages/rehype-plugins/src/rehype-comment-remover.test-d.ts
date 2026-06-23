/**
 * @fileoverview Type test for `rehype-comment-remover.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { rehypeCommentRemover } from './rehype-comment-remover.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region rehypeCommentRemover

({}) as typeof rehypeCommentRemover satisfies Function;
({}) as ReturnType<typeof rehypeCommentRemover> satisfies Function;

// @ts-expect-error - `rehypeCommentRemover` should not accept options.
rehypeCommentRemover({});
// @ts-expect-error - `rehypeCommentRemover` should be a function.
({}) as typeof rehypeCommentRemover satisfies boolean;
// @ts-expect-error - `rehypeCommentRemover` should be a function.
({}) as typeof rehypeCommentRemover satisfies string;

// #endregion rehypeCommentRemover
// --------------------------------------------------------------------------------
