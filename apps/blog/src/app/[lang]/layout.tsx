/**
 * @fileoverview Root layout.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type Metadata } from 'next';
import { type PropsWithChildren } from 'react';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { GoogleAnalytics } from '@/components/common/google-analytics';
import { ThemeProvider } from '@/components/common/theme-context';
import ThemeScript from '@/components/common/theme-script';

import Aside from '@/components/layouts/aside';
import Body from '@/components/layouts/body';
import Header from '@/components/layouts/header';
import Main from '@/components/layouts/main';

import Categories from '@/components/aside/categories';
import Links from '@/components/aside/links';
import Profile from '@/components/aside/profile';

import DocSearch from '@/components/header/doc-search';
import FlexContainer from '@/components/header/flex-container';
import LangToggle from '@/components/header/lang-toggle';
import ScrollProgress from '@/components/header/scroll-progress';
import ThemeToggle from '@/components/header/theme-toggle';
import Title from '@/components/header/title';

import { GOOGLE_GA_ID } from '@/constants';
import { langKeys, type LangKey } from '@/data/lang';
import { getGithubUsers } from '@/utils/fetch';

import '@/styles/index.css';

// --------------------------------------------------------------------------------
// Named Export
// --------------------------------------------------------------------------------

/**
 * Control what happens when a dynamic segment is visited that was not generated with `generateStaticParams`.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/dynamicParams
 */
export const dynamicParams = false;

/**
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export function generateStaticParams(): Awaited<PageProps<'/[lang]'>['params']>[] {
  return langKeys.map(lang => ({
    lang,
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { bio, name } = await getGithubUsers();

  return {
    title: {
      template: `%s | ${name}`,
      default: name,
    },
    description: bio,
  };
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<LayoutProps<'/[lang]'>>) {
  const awaitedParams = await params;
  const lang = awaitedParams.lang as LangKey;

  return (
    // Use `suppressHydrationWarning` because `ThemeScript` may change the initial `data-theme`.
    // https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
    <html className="custom-scrollbar-y-bold" lang={lang} suppressHydrationWarning>
      <Body>
        <ThemeScript />
        <ThemeProvider>
          <ScrollProgress />
          <Header>
            <Title lang={lang} />
            <FlexContainer>
              <DocSearch />
              <LangToggle lang={lang} />
              <ThemeToggle />
            </FlexContainer>
          </Header>
          <Aside>
            <Profile lang={lang} />
            <Links lang={lang} />
            <Categories lang={lang} />
          </Aside>
          <Main>{children}</Main>

          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics gaId={GOOGLE_GA_ID} />
        </ThemeProvider>
      </Body>
    </html>
  );
}
