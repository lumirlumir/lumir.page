/**
 * @fileoverview Table of contents for the current post.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { FaBookOpen } from '@lumir/react-kit/svgs';
import type { LangKey, LangRecord } from '@/data/lang';
import createMarkdownCollection from '@/utils/markdown-collection';
import styles from './page.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const markdownCollection = createMarkdownCollection();
const dictionary = {
  ko: {
    title: '목차',
  },
  en: {
    title: 'Table of contents',
  },
} as const satisfies LangRecord<{ title: string }>;

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({ params }: PageProps<'/[lang]/posts/[markdown]'>) {
  const awaitedParams = await params;
  const lang = awaitedParams.lang as LangKey;
  const { headings } = await markdownCollection.loadVMarkdownFileMetaWithHeadings(
    `${awaitedParams.markdown}.${lang}`,
  );

  if (headings.length === 0) {
    return null;
  }

  return (
    // TODO: Move this into a separate `TOC` component.
    <div className={styles.toc}>
      <p>
        {dictionary[lang].title}
        <FaBookOpen aria-hidden="true" />
      </p>
      <ul aria-label={dictionary[lang].title}>
        {headings.map(({ id, text, depth }) => (
          <li key={id} data-depth={depth}>
            <a href={`#${id}`}>{text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
