/**
 * @fileoverview React search component using `minisearch`.
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

import { Dialog, type DialogHandle } from '@lumir/react-kit/components';
import { useOs, useShortcut } from '@lumir/react-kit/hooks';
import { LmSearch } from '@lumir/react-kit/svgs';
import MiniSearch, { type SearchResult } from 'minisearch';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useDeferredValue,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { type LangKey, type LangRecord } from '@/data/lang';
import {
  type VMarkdownFileMetaWithHeadings,
  type VMarkdownHeading,
} from '@/data/v-markdown';
import styles from './localsearch.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Props for the `LocalSearch` component.
 */
export interface LocalSearchProps {
  /**
   * Language of the static search documents to fetch when opening the dialog.
   */
  readonly lang: LangKey;

  /**
   * Translations for the search UI. Defaults to the selected language.
   */
  readonly translations?: {
    /**
     * The placeholder for the search input.
     */
    readonly placeholder: string;

    /**
     * Translations for the search button.
     */
    readonly button: {
      /**
       * The aria-label for the search button.
       */
      readonly buttonAriaLabel: string;

      /**
       * The text to display on the search button.
       */
      readonly buttonText: string;
    };

    /**
     * Translations for the search dialog.
     */
    readonly dialog: {
      /**
       * The aria-label for the search dialog.
       */
      readonly dialogAriaLabel: string;

      /**
       * The status displayed while search data is loading.
       */
      readonly loadingText: string;

      /**
       * The status displayed when search data fails to load.
       */
      readonly errorText: string;

      /**
       * The text for the button that retries loading search data.
       */
      readonly retryButtonText: string;

      /**
       * Translations for the search box controls.
       */
      readonly searchBox: {
        /**
         * The text to display on the reset button.
         */
        readonly resetButtonText: string;

        /**
         * The title for the reset button.
         */
        readonly resetButtonTitle: string;

        /**
         * The aria-label for the reset button.
         */
        readonly resetButtonAriaLabel: string;

        /**
         * The text to display on the cancel button.
         */
        readonly cancelButtonText: string;

        /**
         * The aria-label for the cancel button.
         */
        readonly cancelButtonAriaLabel: string;

        /**
         * The aria-label for the search input.
         */
        readonly searchInputLabel: string;
      };

      /**
       * Translations for the initial empty search screen.
       */
      readonly startScreen: {
        /**
         * The title to display before the user enters a query.
         */
        readonly titleText: string;

        /**
         * The help text to display before the user enters a query.
         */
        readonly helpText: string;

        /**
         * The title for recent searches.
         */
        readonly recentSearchesTitle: string;

        /**
         * The text displayed when there are no recent searches.
         */
        readonly noRecentSearchesText: string;

        /**
         * The title for the button that saves a recent search.
         */
        readonly saveRecentSearchButtonTitle: string;

        /**
         * The title for the button that removes a recent search.
         */
        readonly removeRecentSearchButtonTitle: string;

        /**
         * The title for favorite searches.
         */
        readonly favoriteSearchesTitle: string;

        /**
         * The title for the button that removes a favorite search.
         */
        readonly removeFavoriteSearchButtonTitle: string;
      };

      /**
       * Translations for the no-results screen.
       */
      readonly noResultsScreen: {
        /**
         * The text to display when no results match the query.
         */
        readonly noResultsText: string;

        /**
         * The text displayed before a suggested query.
         */
        readonly suggestedQueryText: string;

        /**
         * The text prompting users to report missing results.
         */
        readonly reportMissingResultsText: string;

        /**
         * The text for the link that reports missing results.
         */
        readonly reportMissingResultsLinkText: string;
      };

      /**
       * Translations for the results screen.
       */
      readonly resultsScreen: {
        /**
         * The source label to display above search results.
         */
        readonly sourceText: string;

        /**
         * The path prefix to display before each result slug.
         */
        readonly pathPrefix: string;

        /**
         * The label to display before each result update date.
         */
        readonly updatedText: string;
      };

      /**
       * Translations for the search dialog footer.
       */
      readonly footer: {
        /**
         * The text that explains the select command.
         */
        readonly selectText: string;

        /**
         * The aria-label for the select keycap.
         */
        readonly selectKeyAriaLabel: string;

        /**
         * The text that explains the navigate command.
         */
        readonly navigateText: string;

        /**
         * The aria-label for the navigate-up keycap.
         */
        readonly navigateUpKeyAriaLabel: string;

        /**
         * The aria-label for the navigate-down keycap.
         */
        readonly navigateDownKeyAriaLabel: string;

        /**
         * The text that explains the close command.
         */
        readonly closeText: string;

        /**
         * The aria-label for the close keycap.
         */
        readonly closeKeyAriaLabel: string;

        /**
         * The text displayed before the search provider name.
         */
        readonly searchByText: string;
      };
    };
  };

  /**
   * The icon to display.
   * @default A search icon.
   */
  readonly icon?: ReactNode;

  /**
   * The maximum number of search results to display.
   * @default 10
   */
  readonly maxResults?: number;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const defaultIcon = (
  <LmSearch aria-hidden="true" color="white" size={28} strokeWidth="1.5" />
);

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
        loadingText: '검색 데이터를 불러오는 중입니다.',
        errorText: '검색 데이터를 불러오지 못했습니다.',
        retryButtonText: '다시 시도',
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
        loadingText: 'Loading search data.',
        errorText: 'Failed to load search data.',
        retryButtonText: 'Retry',
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
  translations: NonNullable<LocalSearchProps['translations']>;
}>;

// Keep both pending requests and completed indexes across component mounts.
const localSearchByLang: Partial<
  Record<LangKey, Promise<ReturnType<typeof createLocalSearch>>>
> = {};

async function loadLocalSearch(lang: LangKey) {
  localSearchByLang[lang] ??= (async () => {
    try {
      const response = await fetch(`/${lang}/search.json`);

      if (!response.ok) {
        throw new Error('Failed to load search data.');
      }

      const documents = (await response.json()) as VMarkdownFileMetaWithHeadings[];
      return createLocalSearch(documents);
    } catch (error) {
      delete localSearchByLang[lang];
      throw error;
    }
  })();

  return localSearchByLang[lang];
}

/**
 * Creates and populates a MiniSearch instance, preserving its native search API.
 */
export function createLocalSearch(documents: readonly VMarkdownFileMetaWithHeadings[]) {
  const search = new MiniSearch<
    Omit<VMarkdownFileMetaWithHeadings, 'id' | 'headings'> & VMarkdownHeading
  >({
    fields: ['title', 'description', 'heading', 'content'],
    extractField: (document, fieldName) => {
      if (fieldName === 'title' || fieldName === 'description') {
        // Keep post metadata searches on the post record instead of every section.
        return document.text ? '' : document.data[fieldName];
      }

      if (fieldName === 'heading') {
        return document.text;
      }

      return MiniSearch.getDefault('extractField')(document, fieldName);
    },
    searchOptions: {
      boost: { title: 2, description: 1, heading: 2, content: 1 },
      fuzzy: 0.2,
      prefix: true,
    },
    storeFields: ['slug', 'lang', 'readtime', 'data', 'url', 'text', 'depth', 'content'],
  });

  documents.forEach(({ headings, ...metadata }) => {
    headings.forEach((section, index) => {
      search.add({
        ...metadata,
        ...section,
        id: `${metadata.id}:${index}`,
        text: index === 0 ? '' : section.text,
        url: `${metadata.url}#${encodeURIComponent(section.id)}`,
      });
    });
  });

  return search;
}

function highlightMatches(
  document: SearchResult & VMarkdownHeading & Pick<VMarkdownFileMetaWithHeadings, 'data'>,
  field: 'title' | 'description' | 'heading' | 'content',
) {
  // Use the actual matched document terms, including prefix and fuzzy matches, for this field.
  const terms = new Set(
    document.terms.filter(term => document.match[term]?.includes(field)),
  );
  let text =
    field === 'title' || field === 'description'
      ? document.data[field]
      : field === 'heading'
        ? document.text
        : document.content;

  if (field === 'content') {
    let start = 0;

    for (const part of text.matchAll(/[^\n\r\p{Z}\p{P}]+/gu)) {
      if (terms.has(part[0].toLowerCase())) {
        start = Math.max(0, part.index - 60);
        break;
      }
    }

    const end = Math.min(text.length, start + 220);
    text = `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`;
  }

  // Preserve the original text using MiniSearch's default word boundaries and React nodes.
  return Array.from(text.matchAll(/[^\n\r\p{Z}\p{P}]+|[\n\r\p{Z}\p{P}]+/gu), part =>
    terms.has(part[0].toLowerCase()) ? <mark key={part.index}>{part[0]}</mark> : part[0],
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function LocalSearch({
  lang,
  translations: {
    placeholder,
    button: { buttonAriaLabel, buttonText },
    dialog: {
      dialogAriaLabel,
      loadingText,
      errorText,
      retryButtonText,
      searchBox: {
        resetButtonText,
        resetButtonTitle,
        resetButtonAriaLabel,
        cancelButtonText,
        cancelButtonAriaLabel,
        searchInputLabel,
      },
      startScreen: { titleText, helpText },
      noResultsScreen: { noResultsText },
      resultsScreen: { sourceText, pathPrefix, updatedText },
      footer: {
        selectText,
        selectKeyAriaLabel,
        navigateText,
        navigateUpKeyAriaLabel,
        navigateDownKeyAriaLabel,
        closeText,
        closeKeyAriaLabel,
      },
    },
  } = dictionary[lang].translations,
  icon = defaultIcon,
  maxResults = 10,
}: LocalSearchProps) {
  const dialogRef = useRef<DialogHandle | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultsPanelRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const deferredQuery = useDeferredValue(query.trim());
  const router = useRouter();
  const os = useOs();

  const [searchState, setSearchState] = useState<{
    lang: LangKey;
    miniSearch: ReturnType<typeof createLocalSearch> | null;
    failed: boolean;
  } | null>(null);
  const miniSearch = searchState?.lang === lang ? searchState.miniSearch : null;
  const failed = searchState?.lang === lang && searchState.failed;

  const results = useMemo(() => {
    if (miniSearch === null || deferredQuery.length === 0) {
      return [];
    }

    return miniSearch.search(deferredQuery).slice(0, maxResults) as (SearchResult &
      Omit<VMarkdownFileMetaWithHeadings, 'id' | 'headings'> &
      VMarkdownHeading)[];
  }, [maxResults, miniSearch, deferredQuery]);

  const activeResult = results[activeIndex];

  // ------------------------------------------------------------------------------
  // Callback
  // ------------------------------------------------------------------------------

  const loadSearch = async () => {
    if (miniSearch !== null) {
      return;
    }

    setSearchState({ lang, miniSearch: null, failed: false });

    try {
      const search = await loadLocalSearch(lang);
      // Ignore completion of an older language request after another load starts.
      setSearchState(current =>
        current?.lang === lang ? { lang, miniSearch: search, failed: false } : current,
      );
    } catch {
      setSearchState(current =>
        current?.lang === lang ? { lang, miniSearch: null, failed: true } : current,
      );
    }
  };

  function openSearch() {
    dialogRef.current?.open();
    loadSearch();
  }

  function toggleSearch() {
    dialogRef.current?.toggle();
    loadSearch();
  }

  function updateQuery(nextQuery: string) {
    setQuery(nextQuery);
    setActiveIndex(0);
  }

  function resetSearch() {
    updateQuery('');
    inputRef.current?.focus();
  }

  function navigateToResult(document: Pick<VMarkdownFileMetaWithHeadings, 'url'>) {
    dialogRef.current?.close();
    router.push(document.url);
  }

  function activateResult(index: number) {
    setActiveIndex(index);

    const panel = resultsPanelRef.current;
    const link = panel?.querySelectorAll<HTMLAnchorElement>('li > a')[index];

    if (panel === null || link === undefined) {
      return;
    }

    // Compare the result with the panel's visible area, keeping the input focused.
    const panelTop = panel.getBoundingClientRect().top + panel.clientTop;
    const linkRect = link.getBoundingClientRect();

    if (linkRect.top < panelTop || linkRect.bottom > panelTop + panel.clientHeight) {
      link.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });
    }
  }

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    // Accept a single alphanumeric character, leaving shortcuts and IME composition alone.
    // Shift is allowed so uppercase letters can also start a search.
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.nativeEvent.isComposing ||
      !/^[a-z0-9]$/i.test(event.key)
    ) {
      return;
    }

    // Prevent the same character from being inserted again after focus moves to the input.
    event.preventDefault();
    // Seed the query to trigger the existing search flow, then open and focus the input.
    updateQuery(event.key);
    openSearch();
  };

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      activateResult((activeIndex + direction + results.length) % results.length);
    }

    if (event.key === 'Enter' && activeResult !== undefined) {
      event.preventDefault();
      navigateToResult(activeResult);
    }
  }

  // ------------------------------------------------------------------------------
  // Hook
  // ------------------------------------------------------------------------------

  useShortcut('/', openSearch);
  useShortcut('k', toggleSearch, {
    ctrlKey: true,
    ignoreEditable: false,
  });
  useShortcut('k', toggleSearch, {
    metaKey: true,
    ignoreEditable: false,
  });

  // ------------------------------------------------------------------------------
  // Return
  // ------------------------------------------------------------------------------

  return (
    <Dialog.Root ref={dialogRef} initialFocusRef={inputRef}>
      <Dialog.Open
        className={styles.button}
        aria-label={buttonAriaLabel}
        onClick={loadSearch}
        onKeyDown={onButtonKeyDown}
      >
        <span>
          <span>{icon}</span>
          <span>{buttonText}</span>
        </span>
        <span aria-hidden="true">
          <kbd>{os === 'macos' || os === 'ios' ? 'Cmd' : 'Ctrl'}</kbd>
          <kbd>K</kbd>
        </span>
      </Dialog.Open>

      <Dialog.Content
        className={styles.dialog}
        aria-label={dialogAriaLabel}
        onClose={() => updateQuery('')}
      >
        <div>
          <div>
            <div>
              <span>{icon}</span>
              <input
                ref={inputRef}
                type="search"
                spellCheck={false}
                value={query}
                onChange={event => updateQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder={placeholder}
                aria-label={searchInputLabel}
              />
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={resetSearch}
                  title={resetButtonTitle}
                  aria-label={resetButtonAriaLabel}
                >
                  {resetButtonText}
                </button>
              )}
            </div>
            <Dialog.Close aria-label={cancelButtonAriaLabel}>
              {cancelButtonText}
            </Dialog.Close>
          </div>

          <div ref={resultsPanelRef}>
            {miniSearch === null ? (
              <section role="status">
                <h3>{failed ? errorText : loadingText}</h3>
                {failed ? (
                  <button type="button" onClick={loadSearch}>
                    {retryButtonText}
                  </button>
                ) : null}
              </section>
            ) : null}

            {miniSearch !== null && query.length === 0 ? (
              <section>
                <h3>{titleText}</h3>
                <p>{helpText}</p>
              </section>
            ) : null}

            {miniSearch !== null && query.length > 0 && results.length === 0 ? (
              <section>
                <h3>{noResultsText}</h3>
                <p>&quot;{query}&quot;</p>
              </section>
            ) : null}

            {query.length > 0 && results.length > 0 ? (
              <section>
                <div>{sourceText}</div>
                <ul>
                  {results.map((document, index) => (
                    <li key={document.id}>
                      <Link
                        href={document.url}
                        data-active={index === activeIndex}
                        // Close on same-tab navigation; modifier clicks keep the search open.
                        onNavigate={() => dialogRef.current?.close()}
                      >
                        <span>
                          <span>
                            {highlightMatches(document, 'title')}
                            {document.text ? (
                              <> / {highlightMatches(document, 'heading')}</>
                            ) : null}
                          </span>
                          <span>
                            {pathPrefix} / {document.slug}
                          </span>
                          <span>
                            {highlightMatches(
                              document,
                              document.text ||
                                document.terms.some(term =>
                                  document.match[term]?.includes('content'),
                                )
                                ? 'content'
                                : 'description',
                            )}
                          </span>
                          <span>
                            <span>{document.data.created}</span>
                            <span>
                              {updatedText} {document.data.updated}
                            </span>
                            {document.data.categories.map(category => (
                              <span key={category}>{category}</span>
                            ))}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <footer>
            <span>
              <kbd aria-label={selectKeyAriaLabel}>Enter</kbd>
              <span>{selectText}</span>
            </span>
            <span>
              <kbd aria-label={navigateUpKeyAriaLabel}>↑</kbd>
              <kbd aria-label={navigateDownKeyAriaLabel}>↓</kbd>
              <span>{navigateText}</span>
            </span>
            <span>
              <kbd aria-label={closeKeyAriaLabel}>Esc</kbd>
              <span>{closeText}</span>
            </span>
          </footer>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
