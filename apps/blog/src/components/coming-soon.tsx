/**
 * @fileoverview Shared placeholder for pages awaiting content.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Loading } from '@/components/loading';
import type { LangKey, LangRecord } from '@/data/lang';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    message: '아직 이 페이지는 준비 중입니다.',
  },
  en: {
    message: 'This page is coming soon.',
  },
} as const satisfies LangRecord<{ message: string }>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export async function ComingSoon({ params }: PageProps<'/[lang]'>) {
  const awaitedParams = await params;
  const lang = awaitedParams.lang as LangKey;

  return <Loading>{dictionary[lang].message}</Loading>;
}
