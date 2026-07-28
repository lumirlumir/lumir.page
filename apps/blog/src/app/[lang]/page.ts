/**
 * @fileoverview Root page for a localized route.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { author } from '@/data/author';
import { type LangKey, type LangRecord } from '@/data/lang';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dictionary = {
  ko: {
    name: (name: string) => `안녕하세요, ${name}의 블로그입니다.`,
  },
  en: {
    name: (name: string) => `Hello, It's ${name}'s blog.`,
  },
} as const satisfies LangRecord<{ name: (name: string) => string }>;

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const awaitedParams = await params;
  const lang = awaitedParams.lang as LangKey;

  return dictionary[lang].name(author.lumirlumir.name);
}
