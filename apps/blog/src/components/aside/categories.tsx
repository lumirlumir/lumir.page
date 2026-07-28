/**
 * @fileoverview categories.
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { FaPen } from '@lumir/react-kit/svgs';
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
      {markdownCollection.nonEmptyCategoryKeys[lang].map(categoryKey => {
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
              <div className={styles['react-icons']}>{reactIcons}</div>
              <div className={styles['name-en']}>{en}</div>
              <div className={styles['name-ko']}>{ko}</div>
              <div className={styles['count-docs']}>
                <span className="flex-center">
                  {markdownCollection.byLangCategory[lang][categoryKey].length}
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
