/**
 * @fileoverview Server wrapper for doc-search.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { LmSearch } from '@lumir/react-kit/svgs';
import { type VMarkdownFile } from '@/data/v-markdown-file';
import { markdownCollectionSlug } from '@/utils/markdown-collection';
import { markdownToText } from '@/utils/markdown-to-text';
import SearchClient, { type SearchClientProps, type SearchDocument } from './localsearch';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Creates search documents from Markdown frontmatter only.
 * @param vMarkdownFiles The Markdown files to convert into search documents.
 */
async function createDocSearchDocuments(
  vMarkdownFiles: VMarkdownFile[],
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

const koTranslations = {
  button: {
    buttonAriaLabel: '검색 창 열기',
    buttonText: '검색',
  },
  dialog: {
    dialogAriaLabel: '검색',
    searchBox: {
      resetButtonText: '지우기',
      resetButtonTitle: '검색어 지우기',
      resetButtonAriaLabel: '검색어 지우기',
      cancelButtonText: '취소',
      cancelButtonAriaLabel: '취소',
      searchInputLabel: '검색',
    },
    startScreen: {
      titleText: '문서 메타데이터 검색',
      helpText:
        '제목, 설명, 날짜, 카테고리, 참조, 슬러그를 먼저 검색합니다. 본문 검색은 나중에 추가할 수 있습니다.',
    },
    noResultsScreen: {
      noResultsText: '검색 결과가 없습니다',
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
    },
  },
} as const satisfies SearchClientProps['translations'];

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default async function DocSearch({ lang = 'ko' }: { lang?: 'en' | 'ko' } = {}) {
  const documents = await createDocSearchDocuments(Object.values(markdownCollectionSlug));

  return (
    <SearchClient
      icon={<LmSearch aria-hidden="true" color="white" size={28} strokeWidth="1.5" />}
      maxResults={10}
      placeholder={lang === 'ko' ? '검색' : 'Search'}
      translations={lang === 'ko' ? koTranslations : {}}
      documents={documents}
    />
  );
}
