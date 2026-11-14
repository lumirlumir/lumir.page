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
import Link from 'next/link';
import { useDeferredValue, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import type { LangRecord, PropsWithLang } from '@/data/lang';
import type { VMarkdownFileMetaWithHeadings } from '@/data/v-markdown';
import { Search, type HighlightOptions, type Match } from '@/utils/search';
import styles from './localsearch.module.css';

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
    cancel: '취소',
    title: '문서 검색',
    noResults: '검색 결과가 없습니다',
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
    cancel: 'Cancel',
    title: 'Search docs',
    noResults: 'No results for',
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
    | 'cancel'
    | 'title'
    | 'noResults'
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

let searchPromiseCache: Promise<readonly VMarkdownFileMetaWithHeadings[]> | undefined;

function renderHighlight(text: string, range: Match | null, options?: HighlightOptions) {
  const { before, match, after } = Search.highlight(text, range, options);

  return (
    <>
      {before}
      {match && <mark>{match}</mark>}
      {after}
    </>
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
  const [searchData, setSearchData] = useState<
    readonly VMarkdownFileMetaWithHeadings[] | null
  >(null);
  const [failed, setFailed] = useState<boolean>(false);
  const deferredQuery = useDeferredValue(query);
  const os = useOs();
  const search = useMemo(() => new Search(searchData ?? []), [searchData]);
  const results = useMemo(() => search.search(deferredQuery), [search, deferredQuery]);
  const labels = dictionary[lang];

  // ------------------------------------------------------------------------------
  // Callback
  // ------------------------------------------------------------------------------

  async function loadSearch() {
    if (searchData !== null) {
      return;
    }

    setFailed(false);

    try {
      searchPromiseCache ??= (async () => {
        const response = await fetch(`/${lang}/search.json`);

        if (!response.ok) {
          throw new Error('Failed to load search data.');
        }

        return (await response.json()) as readonly VMarkdownFileMetaWithHeadings[];
      })();

      setSearchData(await searchPromiseCache);
    } catch {
      searchPromiseCache = undefined;
      setFailed(true);
    }
  }

  function updateQuery(nextQuery: string) {
    setQuery(nextQuery);
    setActiveIndex(0);
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const links = resultsPanelRef.current?.querySelectorAll<HTMLAnchorElement>('li > a');

    if (!links?.length) {
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      links[activeIndex]?.click();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();

      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const index = (activeIndex + direction + links.length) % links.length;

      setActiveIndex(index);

      links[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
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
    <>
      <link rel="prefetch" href={`/${lang}/search.json`} as="fetch" />
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
        <Dialog.Open className={styles.open} aria-label={labels.search}>
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
              </div>
              <Dialog.Close aria-label={labels.cancel}>{labels.cancel}</Dialog.Close>
            </div>

            <div ref={resultsPanelRef}>
              <section>
                {searchData === null ? (
                  <>
                    <h3>{failed ? labels.error : labels.loading}</h3>
                    {failed ? (
                      <button type="button" onClick={loadSearch}>
                        {labels.retry}
                      </button>
                    ) : null}
                  </>
                ) : query.length === 0 ? (
                  <h3>{labels.title}</h3>
                ) : results.length === 0 ? (
                  <h3>{labels.noResults}</h3>
                ) : (
                  <ul>
                    {results.map(
                      ({ vMarkdownFileMeta, vMarkdownHeading, matches }, index) => {
                        const href =
                          `${vMarkdownFileMeta.url}#${encodeURIComponent(vMarkdownHeading.id)}` as const;

                        return (
                          <li key={href}>
                            <Link
                              href={href}
                              data-active={index === activeIndex}
                              onMouseMove={() => setActiveIndex(index)}
                              // Close on same-tab navigation; modifier clicks keep the search open.
                              onNavigate={() => dialogRef.current?.close()}
                            >
                              <span>
                                <span>
                                  {vMarkdownHeading.id !== vMarkdownFileMeta.slug && (
                                    <>{vMarkdownFileMeta.data.title} / </>
                                  )}
                                  {renderHighlight(
                                    vMarkdownHeading.text,
                                    matches.text ?? null,
                                  )}
                                </span>
                                <span>{vMarkdownFileMeta.slug}</span>
                                <span>
                                  {renderHighlight(
                                    vMarkdownHeading.content,
                                    matches.content ?? null,
                                    { excerpt: true },
                                  )}
                                </span>
                                <span>
                                  <span>{vMarkdownFileMeta.data.created}</span>
                                  <span>
                                    {labels.updated} {vMarkdownFileMeta.data.updated}
                                  </span>
                                  {vMarkdownFileMeta.data.categories.map(category => (
                                    <span key={category}>{category}</span>
                                  ))}
                                </span>
                              </span>
                            </Link>
                          </li>
                        );
                      },
                    )}
                  </ul>
                )}
              </section>
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
    </>
  );
}
