/**
 * @fileoverview Local search.
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
import { useDeferredValue, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import type { LangKey, LangRecord, PropsWithLang } from '@/data/lang';
import type { VMarkdownFileMetaWithHeadings } from '@/data/v-markdown';
import styles from './localsearch.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type LocalSearchResult = SearchResult &
  Pick<VMarkdownFileMetaWithHeadings, 'slug' | 'data' | 'url' | 'headings'>;

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const icon = <LmSearch aria-hidden="true" size={28} strokeWidth="1.5" />;

const dictionary = {
  ko: {
    search: '검색',
    loading: '검색 데이터를 불러오는 중입니다.',
    error: '검색 데이터를 불러오지 못했습니다.',
    retry: '다시 시도',
    clear: '지우기',
    clearLabel: '검색 창 지우기',
    cancel: '취소',
    title: '문서 검색',
    help: '제목, 설명, 섹션 제목과 본문을 검색합니다.',
    noResults: '검색 결과가 없습니다',
    source: '문서',
    updated: '수정',
    select: '선택',
    enter: '엔터',
    navigate: '이동',
    arrowUp: '위쪽 화살표',
    arrowDown: '아래쪽 화살표',
    close: '닫기',
    escape: '닫기',
  },
  en: {
    search: 'Search',
    loading: 'Loading search data.',
    error: 'Failed to load search data.',
    retry: 'Retry',
    clear: 'Clear',
    clearLabel: 'Clear the query',
    cancel: 'Cancel',
    title: 'Search docs',
    help: 'Search titles, descriptions, section headings, and body text.',
    noResults: 'No results for',
    source: 'Posts',
    updated: 'Updated',
    select: 'Select',
    enter: 'Enter',
    navigate: 'Navigate',
    arrowUp: 'Arrow up',
    arrowDown: 'Arrow down',
    close: 'Close',
    escape: 'Escape',
  },
} as const satisfies LangRecord<
  Record<
    | 'search'
    | 'loading'
    | 'error'
    | 'retry'
    | 'clear'
    | 'clearLabel'
    | 'cancel'
    | 'title'
    | 'help'
    | 'noResults'
    | 'source'
    | 'updated'
    | 'select'
    | 'enter'
    | 'navigate'
    | 'arrowUp'
    | 'arrowDown'
    | 'close'
    | 'escape',
    string
  >
>;

let localSearchPromiseCache:
  Promise<MiniSearch<VMarkdownFileMetaWithHeadings>> | undefined;

function loadLocalSearch(lang: LangKey) {
  if (localSearchPromiseCache) {
    return localSearchPromiseCache;
  }

  localSearchPromiseCache = (async () => {
    try {
      const response = await fetch(`/${lang}/search.json`);

      if (!response.ok) {
        throw new Error('Failed to load search data.');
      }

      const documents =
        (await response.json()) as readonly VMarkdownFileMetaWithHeadings[];

      return createLocalSearch(documents);
    } catch (error) {
      localSearchPromiseCache = undefined;

      throw error;
    }
  })();

  return localSearchPromiseCache;
}

// TODO: from here.

/**
 * Creates and populates a MiniSearch instance, preserving its native search API.
 */
function createLocalSearch(documents: readonly VMarkdownFileMetaWithHeadings[]) {
  const search = new MiniSearch<VMarkdownFileMetaWithHeadings>({
    idField: 'url',
    fields: ['title', 'description', 'heading', 'content'],
    extractField: (document, fieldName) => {
      if (fieldName === 'title' || fieldName === 'description') {
        // Keep post metadata searches on the post record instead of every section.
        return document.headings[0].text ? '' : document.data[fieldName];
      }

      if (fieldName === 'heading') {
        return document.headings[0].text;
      }

      if (fieldName === 'content') {
        return document.headings[0].content;
      }

      return MiniSearch.getDefault('extractField')(document, fieldName);
    },
    searchOptions: {
      boost: { title: 2, heading: 2 },
      fuzzy: 0.2,
      prefix: true,
    },
    storeFields: ['slug', 'data', 'url', 'headings'],
  });

  documents.forEach(({ headings, ...metadata }) => {
    headings.forEach((section, index) => {
      search.add({
        ...metadata,
        headings: [index === 0 ? { ...section, text: '' } : section],
        url: `${metadata.url}#${encodeURIComponent(section.id)}`,
      });
    });
  });

  return search;
}

function highlightMatches(
  document: LocalSearchResult,
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
        ? document.headings[0].text
        : document.headings[0].content;

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

export function LocalSearch({ lang }: PropsWithLang) {
  const dialogRef = useRef<DialogHandle | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultsPanelRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const deferredQuery = useDeferredValue(query.trim());
  const os = useOs();

  const [miniSearch, setMiniSearch] =
    useState<MiniSearch<VMarkdownFileMetaWithHeadings> | null>(null);
  const [failed, setFailed] = useState(false);

  const results = useMemo(() => {
    if (miniSearch === null || deferredQuery.length === 0) {
      return [];
    }

    return miniSearch.search(deferredQuery).slice(0, 10) as LocalSearchResult[];
  }, [miniSearch, deferredQuery]);

  const activeResult = results[activeIndex];
  const labels = dictionary[lang];

  // ------------------------------------------------------------------------------
  // Callback
  // ------------------------------------------------------------------------------

  const loadSearch = async () => {
    if (miniSearch !== null) {
      return;
    }

    setFailed(false);

    try {
      setMiniSearch(await loadLocalSearch(lang));
    } catch {
      setFailed(true);
    }
  };

  function updateQuery(nextQuery: string) {
    setQuery(nextQuery);
    setActiveIndex(0);
  }

  function resetSearch() {
    updateQuery('');
    inputRef.current?.focus();
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
    updateQuery(event.key);
    dialogRef.current?.open();
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
      const link =
        resultsPanelRef.current?.querySelectorAll<HTMLAnchorElement>('li > a')[
          activeIndex
        ];
      link?.click();
    }
  }

  // ------------------------------------------------------------------------------
  // Hook
  // ------------------------------------------------------------------------------

  useShortcut('/', () => dialogRef.current?.open());
  useShortcut('k', () => dialogRef.current?.toggle(), {
    ctrlKey: true,
    ignoreEditable: false,
  });
  useShortcut('k', () => dialogRef.current?.toggle(), {
    metaKey: true,
    ignoreEditable: false,
  });

  // ------------------------------------------------------------------------------
  // Return
  // ------------------------------------------------------------------------------

  return (
    <Dialog.Root
      ref={dialogRef}
      initialFocusRef={inputRef}
      onOpenChange={open => {
        if (open) {
          loadSearch();
        } else {
          updateQuery('');
        }
      }}
    >
      <link rel="prefetch" href={`/${lang}/search.json`} as="fetch" />

      <Dialog.Open
        className={styles.open}
        aria-label={labels.search}
        onKeyDown={onButtonKeyDown}
      >
        <span>
          <span>{icon}</span>
          <span>{labels.search}</span>
        </span>
        <span className="markdown" aria-hidden="true">
          <kbd>{os === 'macos' || os === 'ios' ? 'Cmd' : 'Ctrl'}</kbd>
          <kbd>K</kbd>
        </span>
      </Dialog.Open>

      <Dialog.Content className={styles.content} aria-label={labels.search}>
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
                placeholder={labels.search}
                aria-label={labels.search}
              />
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={resetSearch}
                  title={labels.clearLabel}
                  aria-label={labels.clearLabel}
                >
                  {labels.clear}
                </button>
              )}
            </div>
            <Dialog.Close aria-label={labels.cancel}>{labels.cancel}</Dialog.Close>
          </div>

          <div ref={resultsPanelRef}>
            {miniSearch === null ? (
              <section role="status">
                <h3>{failed ? labels.error : labels.loading}</h3>
                {failed ? (
                  <button type="button" onClick={loadSearch}>
                    {labels.retry}
                  </button>
                ) : null}
              </section>
            ) : query.length === 0 ? (
              <section>
                <h3>{labels.title}</h3>
                <p>{labels.help}</p>
              </section>
            ) : results.length === 0 ? (
              <section>
                <h3>{labels.noResults}</h3>
                <p>&quot;{query}&quot;</p>
              </section>
            ) : (
              <section>
                <div>{labels.source}</div>
                <ul>
                  {results.map((document, index) => (
                    <li key={document.url}>
                      <Link
                        href={document.url}
                        data-active={index === activeIndex}
                        // Close on same-tab navigation; modifier clicks keep the search open.
                        onNavigate={() => dialogRef.current?.close()}
                      >
                        <span>
                          <span>
                            {highlightMatches(document, 'title')}
                            {document.headings[0].text ? (
                              <> / {highlightMatches(document, 'heading')}</>
                            ) : null}
                          </span>
                          <span>blog / posts / {document.slug}</span>
                          <span>
                            {highlightMatches(
                              document,
                              document.headings[0].text ||
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
                              {labels.updated} {document.data.updated}
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
            )}
          </div>

          <footer className="markdown">
            <span>
              <kbd aria-label={labels.enter}>Enter</kbd>
              <span>{labels.select}</span>
            </span>
            <span>
              <kbd aria-label={labels.arrowUp}>↑</kbd>
              <kbd aria-label={labels.arrowDown}>↓</kbd>
              <span>{labels.navigate}</span>
            </span>
            <span>
              <kbd aria-label={labels.escape}>Esc</kbd>
              <span>{labels.close}</span>
            </span>
          </footer>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
