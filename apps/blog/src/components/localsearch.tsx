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

import MiniSearch from 'minisearch';
import { type Route } from 'next';
import { useRouter } from 'next/navigation';
import {
  useCallback,
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
import { type LangKey } from '@/data/lang';
import styles from './localsearch.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface SearchDocument extends Frontmatter {
  /**
   * Stable identifier used by MiniSearch and result lookup.
   */
  readonly id: string;

  /**
   * Post slug used to build the result href.
   */
  readonly slug: string;

  /**
   * Searchable categories joined into a single string.
   */
  readonly categoriesText: string;

  /**
   * Searchable references joined into a single string.
   */
  readonly referencesText: string;
}

/**
 * Props for the `SearchClient` component.
 */
export interface LocalSearchProps {
  /**
   * Language key used to build localized result routes.
   */
  readonly lang: LangKey;

  /**
   * Search documents to index on the client.
   */
  readonly documents: SearchDocument[];

  /**
   * Translations for the search UI.
   */
  readonly translations: {
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

  /**
   * The placeholder for the search input.
   *
   * @default "Search"
   */
  readonly placeholder?: string;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function getPostHref(lang: LangKey, slug: string): Route {
  return `/${lang}/posts/${slug}` as Route;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function LocalSearch({
  lang,
  icon = undefined,
  maxResults = 10,
  placeholder = 'Search',
  translations: {
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

  // TODO: From here
  documents,
}: LocalSearchProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const resultsId = useId();
  const [query, setQuery] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const documentsById = useMemo(
    () => new Map(documents.map(document => [document.id, document])),
    [documents],
  );

  const miniSearch = useMemo(() => {
    const search = new MiniSearch<SearchDocument>({
      fields: [
        'title',
        'description',
        'created',
        'updated',
        'categoriesText',
        'referencesText',
        'slug',
      ],
      searchOptions: {
        boost: {
          title: 4,
          description: 2,
          categoriesText: 2,
          slug: 1.5,
        },
        fuzzy: 0.2,
        prefix: true,
      },
      storeFields: ['id'],
    });

    search.addAll(documents);

    return search;
  }, [documents]);

  const normalizedQuery = query.trim();

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

  const results = useMemo(() => {
    if (normalizedQuery.length === 0) {
      return [];
    }

    return miniSearch
      .search(normalizedQuery)
      .slice(0, maxResults)
      .map(result => documentsById.get(String(result.id)))
      .filter(document => document !== undefined);
  }, [documentsById, maxResults, miniSearch, normalizedQuery]);

  const activeResult = results[activeIndex];

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
    router.push(getPostHref(lang, document.slug));
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

  return (
    <div className={styles.localsearch}>
      <button type="button" aria-label={buttonAriaLabel} onClick={openDialog}>
        <span data-trigger-label>
          <span>{icon}</span>
          <span data-trigger-text>{buttonText}</span>
        </span>
        <span data-trigger-keys aria-hidden="true">
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
        <div data-panel>
          <div data-search-header>
            <div data-search-box>
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
                  data-reset-button
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
              data-cancel-button
              onClick={closeDialog}
              aria-label={cancelButtonAriaLabel}
            >
              {cancelButtonText}
            </button>
          </div>

          <div data-search-body className="custom-scrollbar-y-bold">
            {normalizedQuery.length === 0 ? (
              <section data-empty>
                <h3>{titleText}</h3>
                <p>{helpText}</p>
              </section>
            ) : null}

            {normalizedQuery.length > 0 && results.length === 0 ? (
              <section data-empty>
                <h3>{noResultsText}</h3>
                <p>&quot;{normalizedQuery}&quot;</p>
              </section>
            ) : null}

            {results.length > 0 ? (
              <section>
                <div data-source>{sourceText}</div>
                <ul id={resultsId}>
                  {results.map((document, index) => (
                    <li key={document.id}>
                      <button
                        type="button"
                        data-active={index === activeIndex}
                        onClick={() => navigateToResult(document)}
                      >
                        <span data-hit-content>
                          <span data-hit-title>{document.title}</span>
                          <span data-hit-path>
                            {pathPrefix} / {document.slug}
                          </span>
                          <span data-hit-description>{document.description}</span>
                          <span data-meta>
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
            <span data-command>
              <kbd aria-label={selectKeyAriaLabel}>Enter</kbd>
              <span>{selectText}</span>
            </span>
            <span data-command>
              <kbd aria-label={navigateUpKeyAriaLabel}>↑</kbd>
              <kbd aria-label={navigateDownKeyAriaLabel}>↓</kbd>
              <span>{navigateText}</span>
            </span>
            <span data-command>
              <kbd aria-label={closeKeyAriaLabel}>Esc</kbd>
              <span>{closeText}</span>
            </span>
          </footer>
        </div>
      </dialog>
    </div>
  );
}
