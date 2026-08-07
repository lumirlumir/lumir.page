/**
 * @fileoverview Server wrapper for local search.
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { LmSearch } from '@lumir/react-kit/svgs';
import { type LangRecord, type PropsWithLang } from '@/data/lang';
import { type VMarkdownFileMeta } from '@/data/v-markdown-file';
import createMarkdownCollection from '@/utils/markdown-collection';
import { markdownToText } from '@/utils/markdown-to-text';
import SearchClient, { type LocalSearchProps, type SearchDocument } from './localsearch';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Creates search documents from Markdown frontmatter only.
 * @param vMarkdownFiles The Markdown files to convert into search documents.
 */
async function createSearchDocuments(
  vMarkdownFiles: VMarkdownFileMeta[],
): Promise<SearchDocument[]> {
  return Promise.all(
    vMarkdownFiles.map(
      async ({
        slug,
        data: { title, description, created, updated, categories, references },
      }) => ({
        id: slug,
        slug,
        title: await markdownToText(title),
        description: await markdownToText(description),
        created,
        updated,
        categories,
        references,
        categoriesText: categories.join(' '),
        referencesText: references.join(' '),
      }),
    ),
  );
}

const dictionary = {
  ko: {
    placeholder: '검색',
    translations: {
      button: {
        buttonAriaLabel: '검색',
        buttonText: '검색',
      },
      dialog: {
        dialogAriaLabel: '검색',
        searchBox: {
          resetButtonText: '지우기',
          resetButtonTitle: '검색 창 지우기',
          resetButtonAriaLabel: '검색 창 지우기',
          cancelButtonText: '취소',
          cancelButtonAriaLabel: '취소',
          searchInputLabel: '검색',
        },
        startScreen: {
          titleText: '문서 메타데이터 검색',
          helpText:
            '제목, 설명, 날짜, 카테고리, 참조, 슬러그를 먼저 검색합니다. 본문 검색은 나중에 추가할 수 있습니다.',
          recentSearchesTitle: '최근 검색',
          noRecentSearchesText: '최근 검색 결과가 없습니다.',
          saveRecentSearchButtonTitle: '검색 결과 저장하기',
          removeRecentSearchButtonTitle: '히스토리에서 검색 결과 삭제하기',
          favoriteSearchesTitle: '즐겨찾기',
          removeFavoriteSearchButtonTitle: '즐겨찾기에서 검색 결과 삭제하기',
        },
        noResultsScreen: {
          noResultsText: '검색 결과가 없습니다',
          suggestedQueryText: '아래 검색어를 시도해보세요',
          reportMissingResultsText: '해당 쿼리가 결과를 반환해야 하나요?',
          reportMissingResultsLinkText: '알려주세요.',
        },
        resultsScreen: {
          sourceText: '문서',
          pathPrefix: 'blog / posts',
          updatedText: '수정',
        },
        footer: {
          selectText: '선택',
          selectKeyAriaLabel: '엔터',
          navigateText: '이동',
          navigateUpKeyAriaLabel: '위쪽 화살표',
          navigateDownKeyAriaLabel: '아래쪽 화살표',
          closeText: '닫기',
          closeKeyAriaLabel: '닫기',
          searchByText: '',
        },
      },
    },
  },
  en: {
    placeholder: 'Search',
    translations: {
      button: {
        buttonAriaLabel: 'Search',
        buttonText: 'Search',
      },
      dialog: {
        dialogAriaLabel: 'Search',
        searchBox: {
          resetButtonText: 'Clear',
          resetButtonTitle: 'Clear the query',
          resetButtonAriaLabel: 'Clear the query',
          cancelButtonText: 'Cancel',
          cancelButtonAriaLabel: 'Cancel',
          searchInputLabel: 'Search',
        },
        startScreen: {
          titleText: 'Search docs metadata',
          helpText:
            'Titles, descriptions, dates, categories, references, and slugs are indexed first. Body search can be added later.',
          recentSearchesTitle: 'Recent Searches',
          noRecentSearchesText: 'No recent searches.',
          saveRecentSearchButtonTitle: 'Save this search',
          removeRecentSearchButtonTitle: 'Remove this search from history',
          favoriteSearchesTitle: 'Favorite',
          removeFavoriteSearchButtonTitle: 'Remove this search from favorites',
        },
        noResultsScreen: {
          noResultsText: 'No results for',
          suggestedQueryText: 'Try searching for',
          reportMissingResultsText: 'Believe this query should return results?',
          reportMissingResultsLinkText: 'Let us know.',
        },
        resultsScreen: {
          sourceText: 'Posts',
          pathPrefix: 'blog / posts',
          updatedText: 'Updated',
        },
        footer: {
          selectText: 'Select',
          selectKeyAriaLabel: 'Enter',
          navigateText: 'Navigate',
          navigateUpKeyAriaLabel: 'Arrow up',
          navigateDownKeyAriaLabel: 'Arrow down',
          closeText: 'Close',
          closeKeyAriaLabel: 'Escape',
          searchByText: '',
        },
      },
    },
  },
} as const satisfies LangRecord<{
  placeholder: string;
  translations: LocalSearchProps['translations'];
}>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export async function Search({ lang }: PropsWithLang) {
  const documents = await createSearchDocuments(
    Object.values(createMarkdownCollection().byLangSlug[lang]),
  );

  return (
    <SearchClient
      icon={<LmSearch aria-hidden="true" color="white" size={28} strokeWidth="1.5" />}
      lang={lang}
      maxResults={10}
      placeholder={dictionary[lang].placeholder}
      translations={dictionary[lang].translations}
      documents={documents}
    />
  );
}
