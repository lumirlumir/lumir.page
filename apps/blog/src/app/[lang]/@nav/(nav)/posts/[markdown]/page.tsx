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
  const sections = headings.slice(1); // The first heading is the post title.

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className={styles.toc}>
      <h2 id="post-toc-title">
        {dictionary[lang].title}
        <FaBookOpen aria-hidden="true" />
      </h2>
      <ul aria-labelledby="post-toc-title">
        {sections.map(({ id, text, depth }) => (
          <li
            key={id}
            style={{ marginInlineStart: `${Math.max(0, depth - 2) * 0.5}rem` }}
          >
            <a className="custom-hover-effect" href={`#${id}`}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
