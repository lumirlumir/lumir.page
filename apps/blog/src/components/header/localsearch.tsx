/**
 * @fileoverview React search component using `minisearch`.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

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
import styles from './search.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export interface SearchDocument {
  /**
   * Stable identifier used by MiniSearch and result lookup.
   */
  readonly id: string;

  /**
   * Post slug used to build the result href.
   */
  readonly slug: string;

  /**
   * Searchable post title.
   */
  readonly title: string;

  /**
   * Searchable post description.
   */
  readonly description: string;

  /**
   * Post creation date.
   */
  readonly created: string;

  /**
   * Post update date.
   */
  readonly updated: string;

  /**
   * Post categories shown in the search result metadata.
   */
  readonly categories: string[];

  /**
   * Post references used by the search index.
   */
  readonly references: string[];

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
export interface SearchClientProps {
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

  /**
   * Translations for the search UI.
   */
  readonly translations?: {
    /**
     * Translations for the search button.
     */
    readonly button?: {
      /**
       * The aria-label for the search button.
       *
       * @default "Open search dialog"
       */
      readonly buttonAriaLabel?: string;

      /**
       * The text to display on the search button.
       *
       * @default "Search"
       */
      readonly buttonText?: string;
    };

    /**
     * Translations for the search dialog.
     */
    readonly dialog?: {
      /**
       * The aria-label for the search dialog.
       *
       * @default "Search"
       */
      readonly dialogAriaLabel?: string;

      /**
       * Translations for the search box controls.
       */
      readonly searchBox?: {
        /**
         * The text to display on the reset button.
         *
         * @default "Clear"
         */
        readonly resetButtonText?: string;

        /**
         * The title for the reset button.
         *
         * @default "Clear the query"
         */
        readonly resetButtonTitle?: string;

        /**
         * The aria-label for the reset button.
         *
         * @default "Clear the query"
         */
        readonly resetButtonAriaLabel?: string;

        /**
         * The text to display on the cancel button.
         *
         * @default "Cancel"
         */
        readonly cancelButtonText?: string;

        /**
         * The aria-label for the cancel button.
         *
         * @default "Cancel"
         */
        readonly cancelButtonAriaLabel?: string;

        /**
         * The aria-label for the search input.
         *
         * @default "Search"
         */
        readonly searchInputLabel?: string;
      };

      /**
       * Translations for the initial empty search screen.
       */
      readonly startScreen?: {
        /**
         * The title to display before the user enters a query.
         *
         * @default "Search docs metadata"
         */
        readonly titleText?: string;

        /**
         * The help text to display before the user enters a query.
         *
         * @default "Titles, descriptions, dates, categories, references, and slugs are indexed first. Body search can be added later."
         */
        readonly helpText?: string;
      };

      /**
       * Translations for the no-results screen.
       */
      readonly noResultsScreen?: {
        /**
         * The text to display when no results match the query.
         *
         * @default "No results for"
         */
        readonly noResultsText?: string;
      };

      /**
       * Translations for the results screen.
       */
      readonly resultsScreen?: {
        /**
         * The source label to display above search results.
         *
         * @default "Posts"
         */
        readonly sourceText?: string;

        /**
         * The path prefix to display before each result slug.
         *
         * @default "blog / posts"
         */
        readonly pathPrefix?: string;

        /**
         * The label to display before each result update date.
         *
         * @default "Updated"
         */
        readonly updatedText?: string;
      };

      /**
       * Translations for the search dialog footer.
       */
      readonly footer?: {
        /**
         * The text that explains the select command.
         *
         * @default "Select"
         */
        readonly selectText?: string;

        /**
         * The aria-label for the select keycap.
         *
         * @default "Enter"
         */
        readonly selectKeyAriaLabel?: string;

        /**
         * The text that explains the navigate command.
         *
         * @default "Navigate"
         */
        readonly navigateText?: string;

        /**
         * The aria-label for the navigate-up keycap.
         *
         * @default "Arrow up"
         */
        readonly navigateUpKeyAriaLabel?: string;

        /**
         * The aria-label for the navigate-down keycap.
         *
         * @default "Arrow down"
         */
        readonly navigateDownKeyAriaLabel?: string;

        /**
         * The text that explains the close command.
         *
         * @default "Close"
         */
        readonly closeText?: string;

        /**
         * The aria-label for the close keycap.
         *
         * @default "Escape"
         */
        readonly closeKeyAriaLabel?: string;
      };
    };
  };

  /**
   * Search documents to index on the client.
   */
  readonly documents: SearchDocument[];
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function getPostHref(slug: string): Route {
  return `/posts/${slug}` as Route;
}

function isSearchDocument(
  document: SearchDocument | undefined,
): document is SearchDocument {
  return document !== undefined;
}

function Key({
  ariaLabel,
  children,
}: {
  /**
   * The aria-label for the keycap.
   *
   * @default undefined
   */
  readonly ariaLabel?: string;

  /**
   * The visible keycap text.
   */
  readonly children: string;
}) {
  return <kbd aria-label={ariaLabel}>{children}</kbd>;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function SearchClient({
  icon = undefined,
  maxResults = 10,
  placeholder = 'Search',
  translations: {
    button: { buttonAriaLabel = 'Open search dialog', buttonText = 'Search' } = {},
    dialog: {
      dialogAriaLabel = 'Search',
      searchBox: {
        resetButtonText = 'Clear',
        resetButtonTitle = 'Clear the query',
        resetButtonAriaLabel = 'Clear the query',
        cancelButtonText = 'Cancel',
        cancelButtonAriaLabel = 'Cancel',
        searchInputLabel = 'Search',
      } = {},
      startScreen: {
        titleText = 'Search docs metadata',
        helpText = 'Titles, descriptions, dates, categories, references, and slugs are indexed first. Body search can be added later.',
      } = {},
      noResultsScreen: { noResultsText = 'No results for' } = {},
      resultsScreen: {
        sourceText = 'Posts',
        pathPrefix = 'blog / posts',
        updatedText = 'Updated',
      } = {},
      footer: {
        selectText = 'Select',
        selectKeyAriaLabel = 'Enter',
        navigateText = 'Navigate',
        navigateUpKeyAriaLabel = 'Arrow up',
        navigateDownKeyAriaLabel = 'Arrow down',
        closeText = 'Close',
        closeKeyAriaLabel = 'Escape',
      } = {},
    } = {},
  } = {},

  // TODO: From here
  documents,
}: SearchClientProps) {
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
      .filter(isSearchDocument);
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
    router.push(getPostHref(document.slug));
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
          <Key>Ctrl</Key>
          <Key>K</Key>
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
              <Key ariaLabel={selectKeyAriaLabel}>Enter</Key>
              <span>{selectText}</span>
            </span>
            <span data-command>
              <Key ariaLabel={navigateUpKeyAriaLabel}>↑</Key>
              <Key ariaLabel={navigateDownKeyAriaLabel}>↓</Key>
              <span>{navigateText}</span>
            </span>
            <span data-command>
              <Key ariaLabel={closeKeyAriaLabel}>Esc</Key>
              <span>{closeText}</span>
            </span>
          </footer>
        </div>
      </dialog>
    </div>
  );
}
