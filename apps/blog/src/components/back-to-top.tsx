/**
 * @fileoverview back-to-top.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useScroll } from '@lumir/react-kit/hooks';
import type { PropsWithChildren } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function BackToTop({ children }: PropsWithChildren) {
  const [, scroll] = useScroll();

  return (
    <button type="button" onClick={() => scroll.to({ top: 0 })}>
      {children}
    </button>
  );
}
