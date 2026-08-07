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
import { type PropsWithLang } from '@/data/lang';
import { type VMarkdownFileMeta } from '@/data/v-markdown-file';
import { markdownToText } from '@/utils/markdown-to-text';
import styles from './post-card.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type PostCardVariant = 'series' | 'popular' | 'latest' | 'archive';

interface PostCardProps {
  readonly marker?: string;
  readonly position?: number;
  readonly variant?: PostCardVariant;
  readonly vMarkdownFileMeta: VMarkdownFileMeta;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export async function PostCard({
  lang,
  marker,
  position,
  variant = 'archive',
  vMarkdownFileMeta: {
    slug,
    data: { title, description, updated, categories },
  },
}: PropsWithLang<PostCardProps>) {
  const [plainTitle, plainDescription] = await Promise.all([
    markdownToText(title),
    markdownToText(description),
  ]);
  const primaryCategory = categories[0];
  const kicker = primaryCategory ? categoryMeta[primaryCategory].name[lang] : 'Journal';

  return (
    <Link className={styles.link} href={`/${lang}/posts/${slug}`}>
      <article
        className={styles['post-card']}
        data-position={position}
        data-variant={variant}
      >
        <div className={styles['art-frame']}>
          <div className={styles.mat}>
            <img
              className={styles.image}
              src="/images/editorial/placeholder.webp"
              width={1536}
              height={1024}
              alt=""
            />
          </div>
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
      </article>
    </Link>
  );
}
