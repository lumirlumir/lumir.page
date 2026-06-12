/**
 * @fileoverview Layout.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import Article from '@/components/layouts/article';
import Nav from '@/components/layouts/nav';
import Section from '@/components/layouts/section';
import Giscus from '@/components/section/giscus';
import { type LangKey } from '@/data/lang';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Layout({
  children,
  params,
}: PropsWithChildren<LayoutProps<'/[lang]/posts/[markdown]'>>) {
  const awaitedParams = await params;
  const lang = awaitedParams.lang as LangKey;

  return (
    <>
      <Article>
        {children}
        <Section>
          <Giscus lang={lang} />
        </Section>
      </Article>
      <Nav />
    </>
  );
}
