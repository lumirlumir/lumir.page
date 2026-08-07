/**
 * @fileoverview Type test for `cn.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { cn, type CnArgs } from './cn.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region CnArgs

let args: CnArgs;

args = [];
args = ['foo'];
args = ['foo', 1, true, false, null, undefined];

// @ts-expect-error - Objects are not valid input for `cn`.
args = [{}];
// @ts-expect-error - Arrays are not valid input for `cn`.
args = [['foo']];
// @ts-expect-error - Functions are not valid input for `cn`.
args = [() => {}];

// #endregion CnArgs
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region cn

({}) as typeof cn satisfies Function;
({}) as Parameters<typeof cn> satisfies CnArgs;
({}) as ReturnType<typeof cn> satisfies string;

// @ts-expect-error - `cn` should be a function.
({}) as typeof cn satisfies boolean;
// @ts-expect-error - `cn` should be a function.
({}) as typeof cn satisfies string;
// @ts-expect-error - `cn` should return a string.
({}) as ReturnType<typeof cn> satisfies number;

cn();
cn('foo');
cn('foo', 1, true, false, null, undefined);

// @ts-expect-error - Objects are not valid input for `cn`.
cn({});
// @ts-expect-error - Arrays are not valid input for `cn`.
cn(['foo']);
// @ts-expect-error - Functions are not valid input for `cn`.
cn(() => {});

// #endregion cn
// --------------------------------------------------------------------------------
