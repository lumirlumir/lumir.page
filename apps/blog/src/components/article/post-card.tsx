/**
 * @fileoverview post-card.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { type JSX, type PropsWithChildren } from 'react';
import { cn } from '@lumir/utils';
import { categoryMeta } from '@/data/category';
import { frontmatterMeta } from '@/data/frontmatter';
import { type VMarkdownFileMeta } from '@/data/v-markdown-file';
import { markdownToHtmlLite } from '@/utils/markdown-to-html';
import styles from './post-card.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function PostCardMetaContainer({ children }: PropsWithChildren) {
  return (
    <div className={cn(styles['post-card-meta-container'], 'custom-scrollbar-x')}>
      {children}
    </div>
  );
}

function PostCardMetaItem({ icon, text }: { icon: JSX.Element; text: string }) {
  return (
    <span className={styles['post-card-meta-item']}>
      <span className={styles['react-icons']}>{icon}</span>
      <span>{text}</span>
    </span>
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default async function PostCard({
  vMarkdownFileMeta: {
    slug,
    data: { title, description, created, updated, categories },
  },
}: {
  vMarkdownFileMeta: VMarkdownFileMeta;
}) {
  return (
    <Link href={`/posts/${slug}`}>
      <div className={cn(styles['post-card'], 'custom-hover-effect')}>
        <div
          className={cn(styles.title, 'markdown-body')}
          // eslint-disable-next-line react/no-danger -- Safe because the title comes from the local file and is controlled.
          dangerouslySetInnerHTML={{ __html: await markdownToHtmlLite(title) }}
        />

        <div
          className={cn(styles.description, 'markdown-body')}
          // eslint-disable-next-line react/no-danger -- Safe because the description comes from the local file and is controlled.
          dangerouslySetInnerHTML={{ __html: await markdownToHtmlLite(description) }}
        />

        <PostCardMetaContainer>
          <PostCardMetaItem icon={frontmatterMeta.created.reactIcons} text={created} />
          <PostCardMetaItem icon={frontmatterMeta.updated.reactIcons} text={updated} />
        </PostCardMetaContainer>

        <PostCardMetaContainer>
          {categories.map(category => (
            <PostCardMetaItem
              key={category}
              icon={frontmatterMeta.categories.reactIcons}
              text={categoryMeta[category].name.en}
            />
          ))}
        </PostCardMetaContainer>
      </div>
    </Link>
  );
}
