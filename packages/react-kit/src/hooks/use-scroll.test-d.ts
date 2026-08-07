/**
 * @fileoverview Type test for `use-scroll.ts`
 */

/* global ScrollOptions:readonly, ScrollIntoViewOptions:readonly, ScrollToOptions:readonly */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { RefObject } from 'react';
import { useScroll } from './use-scroll.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region useScroll

({}) as typeof useScroll satisfies Function;
({}) as Parameters<typeof useScroll>[0] satisfies ScrollOptions | undefined;
({}) as ReturnType<typeof useScroll> satisfies readonly [
  RefObject<HTMLElement | null>,
  {
    intoView: (scrollIntoViewOptions?: ScrollIntoViewOptions) => void;
    to: (scrollToOptions?: ScrollToOptions) => void;
  },
];

// @ts-expect-error - `useScroll` should be a function.
({}) as typeof useScroll satisfies boolean;
// @ts-expect-error - `useScroll` should be a function.
({}) as typeof useScroll satisfies string;

function useScrollTypeTest() {
  useScroll();
  useScroll(undefined);
  useScroll({});
  useScroll({ behavior: 'auto' });
  useScroll({ behavior: 'instant' });
  useScroll({ behavior: 'smooth' });
  useScroll<HTMLDivElement>();
  useScroll<HTMLButtonElement>({ behavior: 'smooth' });

  const [ref, scroll] = useScroll();
  ref satisfies RefObject<HTMLElement | null>;
  scroll satisfies {
    intoView: (scrollIntoViewOptions?: ScrollIntoViewOptions) => void;
    to: (scrollToOptions?: ScrollToOptions) => void;
  };

  scroll.intoView();
  scroll.intoView(undefined);
  scroll.intoView({ behavior: 'smooth' });
  scroll.intoView({ behavior: 'instant', block: 'center', inline: 'end' });

  scroll.to();
  scroll.to(undefined);
  scroll.to({ behavior: 'smooth' });
  scroll.to({ behavior: 'instant', left: 10, top: 20 });

  const [divRef, divScroll] = useScroll<HTMLDivElement>();
  divRef satisfies RefObject<HTMLDivElement | null>;
  divScroll satisfies {
    intoView: (scrollIntoViewOptions?: ScrollIntoViewOptions) => void;
    to: (scrollToOptions?: ScrollToOptions) => void;
  };

  // @ts-expect-error - `behavior` should be a valid scroll behavior.
  useScroll({ behavior: 'fast' });
  // @ts-expect-error - `useScroll` accepts only one argument.
  useScroll({}, {});
  // @ts-expect-error - The ref target should be an `HTMLElement`.
  useScroll<SVGElement>();
  // @ts-expect-error - `intoView` options should match `ScrollIntoViewOptions`.
  scroll.intoView({ top: 10 });
  // @ts-expect-error - `to` options should match `ScrollToOptions`.
  scroll.to({ block: 'center' });
}

// #endregion useScroll
// --------------------------------------------------------------------------------
