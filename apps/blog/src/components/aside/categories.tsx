/**
 * @fileoverview categories.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { FaPen } from '@lumir/react-kit/svgs';
import { cn } from '@lumir/utils';
import { categoryMeta } from '@/data/category';
import { type PropsWithLang } from '@/data/lang';
import createMarkdownCollection from '@/utils/markdown-collection';
import styles from './categories.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const markdownCollection = createMarkdownCollection();

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default async function Categories({ lang }: PropsWithLang) {
  return (
    <ul className={styles.categories}>
      {markdownCollection.nonEmptyCategoryKeys
        .sort((a, b) => categoryMeta[a].order - categoryMeta[b].order) // Ascending.
        .map(categoryKey => {
          const {
            name: { en, ko },
            reactIcons,
          } = categoryMeta[categoryKey];

          return (
            <li key={categoryKey}>
              <Link
                className="custom-hover-effect"
                href={`/${lang}/categories/${categoryKey}`}
              >
                <div className={cn(styles['react-icons'], 'custom-flex-center')}>
                  {reactIcons}
                </div>
                <div className={styles['name-en']}>{en}</div>
                <div className={styles['name-ko']}>{ko}</div>
                <div className={cn(styles['count-docs'], 'custom-flex-center')}>
                  <span className="custom-flex-center">
                    {markdownCollection.category[categoryKey]?.length}
                  </span>
                  <FaPen />
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
