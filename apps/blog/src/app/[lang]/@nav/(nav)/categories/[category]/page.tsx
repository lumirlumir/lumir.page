/**
 * @fileoverview Navigation content for category routes.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Sort } from '@/components/sort';
import { type LangKey } from '@/data/lang';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({
  params,
}: PageProps<'/[lang]/categories/[category]'>) {
  const awaitedParams = await params;
  const lang = awaitedParams.lang as LangKey;

  return <Sort lang={lang} />;
}
