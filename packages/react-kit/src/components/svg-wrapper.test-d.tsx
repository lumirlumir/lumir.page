/**
 * @fileoverview Type test for `svg-wrapper.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type ComponentProps, type ReactElement } from 'react';
import { SVGWrapper, type SVGProps, type SVGWrapperProps } from './svg-wrapper.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region SVGWrapperProps

let wrapperProps: SVGWrapperProps;

wrapperProps = {
  attrs: {
    viewBox: '0 0 24 24',
  },
  children: <path d="M0 0h24v24H0z" />,
};
wrapperProps = {
  attrs: {
    viewBox: '0 0 24 24',
    role: 'img',
    strokeWidth: '2',
  },
  children: (
    <>
      <path d="M0 0h24v24H0z" />
      <path d="M4 4h16v16H4z" />
    </>
  ),
};

// @ts-expect-error - `viewBox` is required.
wrapperProps = { attrs: {}, children: <path d="M0 0h24v24H0z" /> };
// @ts-expect-error - `viewBox` should be a string.
wrapperProps = { attrs: { viewBox: 24 }, children: <path d="M0 0h24v24H0z" /> };
wrapperProps = {
  attrs: {
    viewBox: '0 0 24 24',
    // @ts-expect-error - additional attrs should be strings.
    strokeWidth: 2,
  },
  children: <path d="M0 0h24v24H0z" />,
};
// @ts-expect-error - `children` is required.
wrapperProps = { attrs: { viewBox: '0 0 24 24' } };
// @ts-expect-error - `children` should be a React element.
wrapperProps = { attrs: { viewBox: '0 0 24 24' }, children: 'path' };
wrapperProps = {
  attrs: { viewBox: '0 0 24 24' },
  children: <path d="M0 0h24v24H0z" />,
  // @ts-expect-error - `unknown` is not a valid property of `SVGWrapperProps`.
  unknown: 'unknown',
};

// #endregion SVGWrapperProps
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region SVGProps

let props: SVGProps;

props = {};
props = { size: '1em' };
props = { size: 24 };
props = { color: 'currentColor' };
props = { role: 'img' };
props = { 'aria-label': 'test icon' };
props = { style: { display: 'block' } };
props = { strokeWidth: 2 };
props = { onClick: () => {} };

// @ts-expect-error - `size` should be a string or number.
props = { size: false };
// @ts-expect-error - `color` should be a string.
props = { color: 123 };
// @ts-expect-error - `style` should be a CSS properties object.
props = { style: 'display: block' };
// @ts-expect-error - `unknown` is not a valid property of `SVGProps`.
props = { unknown: 'unknown' };

// #endregion SVGProps
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region SVGWrapper

({}) as typeof SVGWrapper satisfies Function;
({}) as Parameters<typeof SVGWrapper>[0] satisfies SVGWrapperProps;
({}) as ReturnType<typeof SVGWrapper> satisfies (props: SVGProps) => ReactElement;

// @ts-expect-error - `SVGWrapper` requires wrapper props.
SVGWrapper();
// @ts-expect-error - `SVGWrapper` requires a React element child.
SVGWrapper({ attrs: { viewBox: '0 0 24 24' }, children: 'path' });
// @ts-expect-error - `SVGWrapper` should be a function.
({}) as typeof SVGWrapper satisfies boolean;
// @ts-expect-error - `SVGWrapper` should be a function.
({}) as typeof SVGWrapper satisfies string;

const Icon = SVGWrapper({
  attrs: {
    viewBox: '0 0 24 24',
  },
  children: <path d="M0 0h24v24H0z" />,
});

({}) as typeof Icon satisfies Function;
({}) as Parameters<typeof Icon>[0] satisfies SVGProps;
({}) as ComponentProps<typeof Icon> satisfies SVGProps;
({}) as ReturnType<typeof Icon> satisfies ReactElement;

function SVGWrapperTypeTest() {
  return [
    <Icon key="default" />,
    <Icon key="custom-size" size={24} color="red" />,
    <Icon
      key="svg-attributes"
      aria-label="test icon"
      role="img"
      style={{ display: 'block' }}
      viewBox="0 0 48 48"
    />,

    // @ts-expect-error - `size` should be a string or number.
    <Icon key="invalid-size" size={false} />,
    // @ts-expect-error - `color` should be a string.
    <Icon key="invalid-color" color={123} />,
    // @ts-expect-error - `unknown` is not a valid property of `SVGProps`.
    <Icon key="unknown" unknown="unknown" />,
  ];
}

// #endregion SVGWrapper
// --------------------------------------------------------------------------------
