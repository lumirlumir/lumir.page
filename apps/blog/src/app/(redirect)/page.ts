/**
 * @fileoverview Root redirect page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { redirect } from 'next/navigation';
import { langDefault } from '@/data/lang';
import { navMeta } from '@/data/nav';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default function Page() {
  redirect(`/${langDefault}${navMeta.home.pathname}`);
}
