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
import { GoogleAnalytics } from '@next/third-parties/google';

import { ThemeProvider } from '@/components/common/theme-context';
import ThemeScript from '@/components/common/theme-script';

import Aside from '@/components/layouts/aside';
import Body from '@/components/layouts/body';
import Header from '@/components/layouts/header';
import Main from '@/components/layouts/main';

import Categories from '@/components/aside/categories';
import Links from '@/components/aside/links';
import Profile from '@/components/aside/profile';

import DarkModeToggle from '@/components/header/dark-mode-toggle';
import FlexContainer from '@/components/header/flex-container';
import Search from '@/components/header/search';
import Title from '@/components/header/title';

import { GOOGLE_GA_ID } from '@/constants';
import { getGithubUsers } from '@/utils/fetch';

import '@/styles/index.css';

// --------------------------------------------------------------------------------
// Named Export
// --------------------------------------------------------------------------------

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

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    // Use `suppressHydrationWarning` because `ThemeScript` may change the initial `data-theme`.
    // https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
    <html lang="ko" suppressHydrationWarning>
      <Body>
        <ThemeScript />
        <ThemeProvider>
          <Header>
            <Title />
            <FlexContainer>
              <Search />
              <DarkModeToggle />
            </FlexContainer>
          </Header>
          <Aside>
            <Profile />
            <Links />
            <Categories />
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
