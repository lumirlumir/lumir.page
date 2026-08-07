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

import MiniSearch, { type SearchResult } from 'minisearch';
import { useRouter } from 'next/navigation';
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { type Frontmatter } from '@/data/frontmatter';
import { type PropsWithLang } from '@/data/lang';
import { type VMarkdownFileMeta } from '@/data/v-markdown-file';
import styles from './localsearch.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type SearchDocument = Pick<VMarkdownFileMeta, 'id' | 'slug'> &
  Pick<Frontmatter, 'title' | 'description' | 'created' | 'updated' | 'categories'>;

type StoredSearchDocument = SearchResult & SearchDocument;

/**
 * Props for the `SearchClient` component.
 */
export interface LocalSearchProps {
  /**
   * Search documents to index on the client.
   */
  readonly documents: SearchDocument[];

  /**
   * Translations for the search UI.
   */
  readonly translations: {
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
   *
   * @default undefined
   */
  readonly icon?: ReactNode;

  /**
   * The maximum number of search results to display.
   *
   * @default 10
   */
  readonly maxResults?: number;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function LocalSearch({
  lang,
  documents,
  translations: {
    placeholder,
    button: { buttonAriaLabel, buttonText },
    dialog: {
      dialogAriaLabel,
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
  },
  icon = undefined,
  maxResults = 10,
}: PropsWithLang<LocalSearchProps>) {
  // ------------------------------------------------------------------------------
  // Variable
  // ------------------------------------------------------------------------------

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const resultsId = useId();
  const [query, setQuery] = useState<string>('');
  const deferredQuery = useDeferredValue(query.trim());
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const miniSearch = useMemo(() => {
    const search = new MiniSearch<SearchDocument>({
      fields: ['title', 'description'],
      searchOptions: {
        boost: {
          title: 2,
          description: 1,
        },
        fuzzy: 0.2,
        prefix: true,
      },
      storeFields: [
        'id',
        'slug',
        'title',
        'description',
        'created',
        'updated',
        'categories',
      ] satisfies (keyof SearchDocument)[],
    });

    search.addAll(documents);

    return search;
  }, [documents]);

  const results = useMemo(() => {
    if (deferredQuery.length === 0) {
      return [];
    }

    return miniSearch
      .search(deferredQuery)
      .slice(0, maxResults) as StoredSearchDocument[];
  }, [maxResults, miniSearch, deferredQuery]);

  const activeResult = results[activeIndex];

  // ------------------------------------------------------------------------------
  // Callback
  // ------------------------------------------------------------------------------

  const openDialog = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog === null) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    inputRef.current?.focus();
  }, []);

  function closeDialog() {
    dialogRef.current?.close();
  }

  function resetSearch() {
    setQuery('');
    setActiveIndex(0);
    inputRef.current?.focus();
  }

  function navigateToResult(document: SearchDocument) {
    closeDialog();
    router.push(`/${lang}/posts/${document.slug}`);
  }

  function onDialogClose() {
    setQuery('');
    setActiveIndex(0);
  }

  function onQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setActiveIndex(0);
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex(index => (index + 1) % results.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex(index => (index - 1 + results.length) % results.length);
    }

    if (event.key === 'Enter' && activeResult !== undefined) {
      event.preventDefault();
      navigateToResult(activeResult);
    }
  }

  // ------------------------------------------------------------------------------
  // Effect
  // ------------------------------------------------------------------------------

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openDialog();
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openDialog]);

  // ------------------------------------------------------------------------------
  // Return
  // ------------------------------------------------------------------------------

  return (
    <div className={styles.localsearch}>
      <button type="button" aria-label={buttonAriaLabel} onClick={openDialog}>
        <span>
          <span>{icon}</span>
          <span>{buttonText}</span>
        </span>
        <span aria-hidden="true">
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={dialogAriaLabel}
        onClose={onDialogClose}
        // Specifies the types of user actions that can be used to close the `<dialog>` element.
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby
        closedby="any"
      >
        <div>
          <div>
            <div>
              <span>{icon}</span>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={onQueryChange}
                onKeyDown={onInputKeyDown}
                placeholder={placeholder}
                aria-label={searchInputLabel}
                aria-controls={resultsId}
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
            <button
              type="button"
              onClick={closeDialog}
              aria-label={cancelButtonAriaLabel}
            >
              {cancelButtonText}
            </button>
          </div>

          <div>
            {query.length === 0 ? (
              <section>
                <h3>{titleText}</h3>
                <p>{helpText}</p>
              </section>
            ) : null}

            {query.length > 0 && results.length === 0 ? (
              <section>
                <h3>{noResultsText}</h3>
                <p>&quot;{query}&quot;</p>
              </section>
            ) : null}

            {query.length > 0 && results.length > 0 ? (
              <section>
                <div>{sourceText}</div>
                <ul id={resultsId}>
                  {results.map((document, index) => (
                    <li key={document.id}>
                      <button
                        type="button"
                        data-active={index === activeIndex}
                        onClick={() => navigateToResult(document)}
                      >
                        <span>
                          <span>{document.title}</span>
                          <span>
                            {pathPrefix} / {document.slug}
                          </span>
                          <span>{document.description}</span>
                          <span>
                            <span>{document.created}</span>
                            <span>
                              {updatedText} {document.updated}
                            </span>
                            {document.categories.map(category => (
                              <span key={category}>{category}</span>
                            ))}
                          </span>
                        </span>
                      </button>
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
      </dialog>
    </div>
  );
}
