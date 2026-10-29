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
import { useRef, type ReactNode } from 'react';
import { type LangKey, type LangRecord } from '@/data/lang';
import styles from './localsearch.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Props for the `LocalSearch` component.
 */
export interface LocalSearchProps {
  /**
   * Language of the search UI.
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
       * Translations for the search box controls.
       */
      readonly searchBox: {
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
    };
  };

  /**
   * The icon to display.
   * @default Search Icon
   */
  readonly icon?: ReactNode;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const defaultIcon = <LmSearch aria-hidden="true" size={28} strokeWidth="1.5" />;

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
          cancelButtonText: '취소',
          cancelButtonAriaLabel: '취소',
          searchInputLabel: '검색',
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
          cancelButtonText: 'Cancel',
          cancelButtonAriaLabel: 'Cancel',
          searchInputLabel: 'Search',
        },
      },
    },
  },
} as const satisfies LangRecord<{
  translations: NonNullable<LocalSearchProps['translations']>;
}>;

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
      searchBox: { cancelButtonText, cancelButtonAriaLabel, searchInputLabel },
    },
  } = dictionary[lang].translations,
  icon = defaultIcon,
}: LocalSearchProps) {
  const dialogRef = useRef<DialogHandle | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const os = useOs();

  // ------------------------------------------------------------------------------
  // Callback
  // ------------------------------------------------------------------------------

  function openSearch() {
    dialogRef.current?.open();
  }

  function toggleSearch() {
    dialogRef.current?.toggle();
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
      <Dialog.Open className={styles.open} aria-label={buttonAriaLabel}>
        <span>
          <span>{icon}</span>
          <span>{buttonText}</span>
        </span>
        <span className="markdown" aria-hidden="true">
          <kbd>{os === 'macos' || os === 'ios' ? 'Cmd' : 'Ctrl'}</kbd>
          <kbd>K</kbd>
        </span>
      </Dialog.Open>

      <Dialog.Content className={styles.content} aria-label={dialogAriaLabel}>
        <div>
          <div>
            <div>
              <span>{icon}</span>
              <input
                ref={inputRef}
                type="search"
                spellCheck={false}
                placeholder={placeholder}
                aria-label={searchInputLabel}
              />
            </div>
            <Dialog.Close aria-label={cancelButtonAriaLabel}>
              {cancelButtonText}
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
