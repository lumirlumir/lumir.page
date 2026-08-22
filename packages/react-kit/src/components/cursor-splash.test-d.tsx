/**
 * @fileoverview Type test for `cursor-splash.tsx`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type ComponentProps, type ReactElement } from 'react';
import { CursorSplash, type CursorSplashProps } from './cursor-splash.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region CursorSplashProps

let props: CursorSplashProps;

props = {};
props = { className: 'cursor-splash' };
props = { SIM_RESOLUTION: 128 };
props = { DYE_RESOLUTION: 1_440 };
props = { DENSITY_DISSIPATION: 3.5 };
props = { VELOCITY_DISSIPATION: 2 };
props = { PRESSURE: 0.1 };
props = { PRESSURE_ITERATIONS: 20 };
props = { CURL: 3 };
props = { SPLAT_RADIUS: 0.2 };
props = { SPLAT_FORCE: 6_000 };
props = { SHADING: true };
props = { COLOR_UPDATE_SPEED: 10 };
props = { BACK_COLOR: { r: 0.5, g: 0, b: 0 } };
props = { TRANSPARENT: true };
props = { RAINBOW_MODE: false };
props = { COLOR: '#ff0000' };
props = { 'aria-hidden': true, id: 'cursor-effect' };

// @ts-expect-error - `SIM_RESOLUTION` should be a number.
props = { SIM_RESOLUTION: '128' };
// @ts-expect-error - `SHADING` should be a boolean.
props = { SHADING: 'true' };
// @ts-expect-error - `canvasClassName` is not a supported property.
props = { canvasClassName: 'cursor-splash-canvas' };
// @ts-expect-error - `children` are not supported.
props = { children: <span /> };
// @ts-expect-error - `unknown` is not a valid property of `CursorSplashProps`.
props = { unknown: 'unknown' };

// #endregion CursorSplashProps
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region CursorSplash

({}) as typeof CursorSplash satisfies Function;
({}) as Parameters<typeof CursorSplash>[0] satisfies CursorSplashProps;
({}) as ComponentProps<typeof CursorSplash> satisfies CursorSplashProps;
({}) as ReturnType<typeof CursorSplash> satisfies ReactElement;

// @ts-expect-error - `CursorSplash` should be a function.
({}) as typeof CursorSplash satisfies boolean;
// @ts-expect-error - `CursorSplash` should be a function.
({}) as typeof CursorSplash satisfies string;

function CursorSplashTypeTest() {
  return [
    <CursorSplash key="default" />,
    <CursorSplash key="styled" className="cursor-splash" />,
    <CursorSplash key="configured" RAINBOW_MODE={false} COLOR="#ffffff" />,

    // @ts-expect-error - `COLOR` should be a string.
    <CursorSplash key="invalid-color" COLOR={false} />,
    // @ts-expect-error - `children` are not supported.
    <CursorSplash key="invalid-children">
      <span />
    </CursorSplash>,
  ];
}

// #endregion CursorSplash
// --------------------------------------------------------------------------------
