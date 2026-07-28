/**
 * @fileoverview Layout.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import { Giscus } from '@/components/giscus';
import { type LangKey } from '@/data/lang';
import styles from './layout.module.css';

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
      {children}
      <section className={styles.section}>
        <Giscus lang={lang} />
      </section>
    </>
  );
}
