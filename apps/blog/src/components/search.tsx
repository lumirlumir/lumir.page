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
import { type LangKey, type LangRecord, type PropsWithLang } from '@/data/lang';
import createMarkdownCollection from '@/utils/markdown-collection';
import { markdownToSearchData } from '@/utils/markdown-to-search-data';
import { createSearchDocuments, type SearchDocument } from '@/utils/search';
import { LocalSearch, type LocalSearchProps } from './localsearch';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const markdownCollection = createMarkdownCollection();
const searchDocumentsByLang: Partial<Record<LangKey, Promise<SearchDocument[]>>> = {};

const dictionary = {
  ko: {
    translations: {
      placeholder: '검색',
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
          titleText: '문서 검색',
          helpText: '제목, 설명, 섹션 제목과 본문을 검색합니다.',
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
    translations: {
      placeholder: 'Search',
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
          titleText: 'Search docs',
          helpText: 'Search titles, descriptions, section headings, and body text.',
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
  translations: LocalSearchProps['translations'];
}>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export async function Search({ lang }: PropsWithLang) {
  const documents = await (searchDocumentsByLang[lang] ??= Promise.all(
    Object.values(markdownCollection.byLangSlug[lang]).map(async metadata => {
      const file = await markdownCollection.loadVMarkdownFile(metadata.id);
      const sections = await markdownToSearchData(file.content, {
        title: `${metadata.data.title} {#${metadata.slug}}`,
      });

      return createSearchDocuments(metadata, sections);
    }),
  ).then(posts => posts.flat()));

  return (
    <LocalSearch
      documents={documents}
      translations={dictionary[lang].translations}
      icon={<LmSearch aria-hidden="true" color="white" size={28} strokeWidth="1.5" />}
      maxResults={10}
    />
  );
}
