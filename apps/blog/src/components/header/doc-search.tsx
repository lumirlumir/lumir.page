/**
 * @fileoverview doc-search.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'client-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { DocSearch as DocSearchOriginal } from '@docsearch/react';
import { cn } from '@lumir/utils';
import styles from './doc-search.module.css';
import '@docsearch/css';
import './doc-search.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function DocSearch() {
  return (
    <div className={cn(styles['doc-search'], 'custom-flex-center')}>
      <DocSearchOriginal
        // required
        appId="TDWHMEE0BV"
        indexName="lumir"
        apiKey="efdaf0563b2410865299d1ad43c1a3d7"
        // optional
        maxResultsPerGroup={10}
        placeholder="Search / 검색"
        translations={{
          button: {
            buttonText: 'Search / 검색',
            buttonAriaLabel: 'Search / 검색',
          },
          modal: {
            searchBox: {
              resetButtonTitle: 'Clear the query / 검색 창 지우기',
              resetButtonAriaLabel: 'Clear the query / 검색 창 지우기',
              cancelButtonText: 'Cancel / 취소',
              cancelButtonAriaLabel: 'Cancel / 취소',
              searchInputLabel: 'Search / 검색',
            },
            startScreen: {
              recentSearchesTitle: 'Recent Searches / 최근 검색',
              noRecentSearchesText: 'No recent searches. / 최근 검색 결과가 없습니다.',
              saveRecentSearchButtonTitle: 'Save this search / 검색 결과 저장하기',
              removeRecentSearchButtonTitle:
                'Remove this search from history / 히스토리에서 검색 결과 삭제하기',
              favoriteSearchesTitle: 'Favorite / 즐겨찾기',
              removeFavoriteSearchButtonTitle:
                'Remove this search from favorites / 즐겨찾기에서 검색 결과 삭제하기',
            },
            errorScreen: {
              titleText: 'Unable to fetch results / 결과를 가져올 수 없습니다',
              helpText:
                'You might want to check your network connection. / 네트워크 연결을 확인해주세요.',
            },
            footer: {
              selectText: 'Select / 선택',
              selectKeyAriaLabel: 'Enter / 엔터',
              navigateText: 'Navigate / 이동',
              navigateUpKeyAriaLabel: 'Arrow up / 위쪽 화살표',
              navigateDownKeyAriaLabel: 'Arrow down / 아래쪽 화살표',
              closeText: 'Close / 닫기',
              closeKeyAriaLabel: 'Escape / 닫기',
              searchByText: '',
            },
            noResultsScreen: {
              noResultsText: 'No results for / 검색 결과가 없습니다',
              suggestedQueryText: 'Try searching for / 아래 검색어를 시도해보세요',
              reportMissingResultsText:
                'Believe this query should return results? / 해당 쿼리가 결과를 반환해야 하나요?',
              reportMissingResultsLinkText: 'Let us know. / 알려주세요.',
            },
          },
        }}
        searchParameters={{
          /**
           * {@link https://www.algolia.com/doc/api-reference/api-parameters/attributesToSnippet/}
           */
          attributesToSnippet: ['*:40'],
        }}
      />
    </div>
  );
}
