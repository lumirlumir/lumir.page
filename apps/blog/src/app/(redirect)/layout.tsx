/**
 * @fileoverview Root layout for the redirect-only root route.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import { langDefault } from '@/data/lang';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang={langDefault}>
      <body>{children}</body>
    </html>
  );
}
