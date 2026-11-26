/**
 * @fileoverview post-card.
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { categoryMeta } from '@/data/category';
import type { VMarkdownFileMeta } from '@/data/v-markdown';
import { markdownToText } from '@/utils/markdown-to-text';
import styles from './post-card.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface PostCardProps {
  readonly marker?: string;
  readonly variant?: 'series' | 'popular' | 'latest' | 'archive';
  readonly vMarkdownFileMeta: VMarkdownFileMeta;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export async function PostCard({
  marker,
  variant = 'archive',
  vMarkdownFileMeta: {
    lang,
    url,
    data: { title, description, updated, categories },
  },
}: PostCardProps) {
  const [plainTitle, plainDescription] = await Promise.all([
    markdownToText(title),
    markdownToText(description),
  ]);
  const primaryCategory = categories[0];
  const kicker = primaryCategory ? categoryMeta[primaryCategory].name[lang] : 'Journal';

  return (
    <Link className={styles.link} href={url}>
      <div className={styles['post-card']} data-variant={variant}>
        <div className={styles['art-frame']}>
          <img
            className={styles.image}
            src="/images/editorial/placeholder.webp"
            width={1536}
            height={1024}
            alt=""
          />
          {marker ? (
            <span className={styles.marker} aria-hidden="true">
              {marker}
            </span>
          ) : null}
        </div>

        <div className={styles.content}>
          <div className={styles.kicker}>{kicker}</div>
          <h3 className={styles.title}>{plainTitle}</h3>
          <p className={styles.description}>{plainDescription}</p>
          <footer className={styles.byline}>
            <span>lumir</span>
            <time dateTime={updated}>{updated}</time>
          </footer>
        </div>
      </div>
    </Link>
  );
}
