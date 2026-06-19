/**
 * @fileoverview Type test for `typewriter.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type ComponentProps, type ReactElement } from 'react';
import { Typewriter, type TypewriterProps } from './typewriter.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region TypewriterProps

let props: TypewriterProps;

props = { text: 'Hello' };
props = { text: 'Hello', cursor: '|' };
props = { text: 'Hello', cursor: null };
props = { text: 'Hello', cursorClassName: 'cursor' };
props = { text: 'Hello', mode: 'write' };
props = { text: 'Hello', mode: 'erase' };
props = { text: 'Hello', writeSpeed: 50 };
props = { text: 'Hello', eraseSpeed: 50 };
props = { text: 'Hello', writePreDelay: 0 };
props = { text: 'Hello', erasePreDelay: 0 };
props = { text: 'Hello', writePostDelay: 1_500 };
props = { text: 'Hello', erasePostDelay: 1_500 };
props = { text: 'Hello', loop: false };
props = { text: 'Hello', pause: false };
props = { text: 'Hello', onWriteComplete: () => {} };
props = { text: 'Hello', onEraseComplete: () => {} };
props = {
  text: 'Hello',
  className: 'typewriter',
  'aria-label': 'typewriter text',
  style: { whiteSpace: 'pre' },
};

// @ts-expect-error - `text` is required.
props = {};
// @ts-expect-error - `text` should be a string.
props = { text: 123 };
// @ts-expect-error - `cursor` should be a string, null, or undefined.
props = { text: 'Hello', cursor: false };
// @ts-expect-error - `cursorClassName` should be a string.
props = { text: 'Hello', cursorClassName: 123 };
// @ts-expect-error - `mode` should be `'write'` or `'erase'`.
props = { text: 'Hello', mode: 'idle' };
// @ts-expect-error - `writeSpeed` should be a number.
props = { text: 'Hello', writeSpeed: '50' };
// @ts-expect-error - `href` is not a valid span attribute.
props = { text: 'Hello', href: 'https://example.com' };
// @ts-expect-error - `unknown` is not a valid property of `TypewriterProps`.
props = { text: 'Hello', unknown: 'unknown' };

// #endregion TypewriterProps
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region Typewriter

({}) as typeof Typewriter satisfies Function;
({}) as Parameters<typeof Typewriter>[0] satisfies TypewriterProps;
({}) as ComponentProps<typeof Typewriter> satisfies TypewriterProps;
({}) as ReturnType<typeof Typewriter> satisfies ReactElement;

// @ts-expect-error - `Typewriter` should be a function.
({}) as typeof Typewriter satisfies boolean;
// @ts-expect-error - `Typewriter` should be a function.
({}) as typeof Typewriter satisfies string;

function TypewriterTypeTest() {
  return [
    <Typewriter key="default" text="Hello" />,
    <Typewriter key="cursor" text="Hello" cursor={null} cursorClassName="cursor" />,
    <Typewriter key="options" text="Hello" mode="erase" loop pause />,
    <Typewriter key="span-attributes" text="Hello" aria-label="typewriter text" />,

    // @ts-expect-error - `text` is required.
    <Typewriter key="missing-text" />,
    // @ts-expect-error - `text` should be a string.
    <Typewriter key="invalid-text" text={123} />,
    // @ts-expect-error - `text` should not be duplicated through an option object.
    <Typewriter key="invalid-option" text="Hello" options={{ text: 'Hello' }} />,
  ];
}

// #endregion Typewriter
// --------------------------------------------------------------------------------
