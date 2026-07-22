/**
 * @fileoverview Root page for a localized route.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Article from '@/components/layouts/article';
import type { LangKey } from '@/data/lang';
import { getGithubUsers } from '@/utils/fetch';

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

  const { name } = await getGithubUsers();
  const dictionary = getDictionary(name);

  return <Article>{dictionary[lang]}</Article>;
}
