/**
 * @fileoverview Type test for `frontmatter.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { frontmatter, frontmatterData } from './frontmatter.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region frontmatter

({}) as typeof frontmatter satisfies Function;
({}) as Parameters<typeof frontmatter>[0] satisfies string;
({}) as ReturnType<typeof frontmatter> satisfies {
  content: string;
  data: unknown;
};

// @ts-expect-error - `frontmatter` should be a function.
({}) as typeof frontmatter satisfies boolean;
// @ts-expect-error - `frontmatter` should be a function.
({}) as typeof frontmatter satisfies string;
// @ts-expect-error - `content` should be a string.
({}) as ReturnType<typeof frontmatter> satisfies {
  content: number;
  data: unknown;
};

frontmatter('');
frontmatter('---\ntitle: Title\n---\nHello, world!');
frontmatter('').content satisfies string;
frontmatter('').data satisfies unknown;

// @ts-expect-error - `frontmatter` requires input.
frontmatter();
// @ts-expect-error - `input` should be a string.
frontmatter(123);
// @ts-expect-error - `data` is unknown and should be narrowed before use.
frontmatter('').data satisfies string;

// #endregion frontmatter
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region frontmatterData

({}) as typeof frontmatterData satisfies Function;
({}) as Parameters<typeof frontmatterData>[0] satisfies string;
({}) as ReturnType<typeof frontmatterData> satisfies {
  data: unknown;
};

// @ts-expect-error - `frontmatterData` should be a function.
({}) as typeof frontmatterData satisfies boolean;
// @ts-expect-error - `frontmatterData` should be a function.
({}) as typeof frontmatterData satisfies string;
// @ts-expect-error - `frontmatterData` should not return `content`.
({}) as ReturnType<typeof frontmatterData> satisfies {
  content: string;
  data: unknown;
};

frontmatterData('');
frontmatterData('---\ntitle: Title\n---\nHello, world!');
frontmatterData('').data satisfies unknown;

// @ts-expect-error - `frontmatterData` requires input.
frontmatterData();
// @ts-expect-error - `input` should be a string.
frontmatterData(123);
// @ts-expect-error - `content` should not exist in the return value.
frontmatterData('').content satisfies string;
// @ts-expect-error - `data` is unknown and should be narrowed before use.
frontmatterData('').data satisfies string;

// #endregion frontmatterData
// --------------------------------------------------------------------------------
