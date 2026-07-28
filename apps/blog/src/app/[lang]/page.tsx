/**
 * @fileoverview Root page for a localized route.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Article from '@/components/layouts/article';
import { author } from '@/data/author';
import type { LangKey } from '@/data/lang';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function getDictionary(name: string) {
  return {
    ko: `안녕하세요, ${name}의 블로그입니다.`,
    en: `Hello, It's ${name}'s blog.`,
  };
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const awaitedParams = await params;
  const lang = awaitedParams.lang as LangKey;

  const dictionary = getDictionary(author.lumirlumir.name);

  return <Article>{dictionary[lang]}</Article>;
}
