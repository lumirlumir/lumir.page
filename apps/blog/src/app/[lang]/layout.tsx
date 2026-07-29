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

import { GoogleAnalytics } from '@/components/google-analytics';
import { ThemeProvider } from '@/components/theme-context';
import { ThemeScript } from '@/components/theme-script';

import { Aside } from '@/components/layouts/aside';

import { Categories } from '@/components/aside/categories';
import { Links } from '@/components/aside/links';
import { Profile } from '@/components/aside/profile';

import { DocSearch } from '@/components/header/doc-search';
import { LangToggle } from '@/components/lang-toggle';
import { ScrollProgress } from '@/components/scroll-progress';
import { ThemeToggle } from '@/components/theme-toggle';
import { Title } from '@/components/title';

import { GOOGLE_GA_ID } from '@/constants';
import { author } from '@/data/author';
import { langKeys, type LangKey } from '@/data/lang';

import '@/styles/index.css';
import styles from './layout.module.css';

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

export const metadata: Metadata = {
  title: {
    template: `%s | ${author.lumirlumir.name}`,
    default: author.lumirlumir.name,
  },
  description: author.lumirlumir.bio,
};

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function RootLayout({
  children,
  nav,
  params,
}: PropsWithChildren<LayoutProps<'/[lang]'>>) {
  const awaitedParams = await params;
  const lang = awaitedParams.lang as LangKey;

  return (
    // Use `suppressHydrationWarning` because `ThemeScript` may change the initial `data-theme`.
    // https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
    <html className="custom-scrollbar-y-bold" lang={lang} suppressHydrationWarning>
      <body className={styles.body}>
        <ThemeScript />
        <ThemeProvider>
          <ScrollProgress />
          <header>
            <Title lang={lang} />
            <div>
              <DocSearch />
              <LangToggle lang={lang} />
              <ThemeToggle lang={lang} />
            </div>
          </header>
          <Aside>
            <Profile lang={lang} />
            <Links lang={lang} />
            <Categories lang={lang} />
          </Aside>
          <main>
            <article>{children}</article>
          </main>
          {nav}

          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics gaId={GOOGLE_GA_ID} />
        </ThemeProvider>
      </body>
    </html>
  );
}
