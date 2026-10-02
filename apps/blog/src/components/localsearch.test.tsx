/**
 * @fileoverview Test for `localsearch.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, describe, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { LocalSearch, type LocalSearchProps } from './localsearch.jsx';

// --------------------------------------------------------------------------------
// Mock
// --------------------------------------------------------------------------------

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// --------------------------------------------------------------------------------
// Constant
// --------------------------------------------------------------------------------

const translations = {
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
      titleText: 'Search docs metadata',
      helpText: 'Search titles and descriptions.',
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
} satisfies LocalSearchProps['translations'];

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('localsearch', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('typing on the search button', () => {
    it('should search with the first uppercase letter and continue typing in the input', async () => {
      const screen = await render(
        <LocalSearch
          vMarkdownFileMetas={[
            {
              id: 'react.en',
              slug: 'react',
              lang: 'en',
              readtime: 1,
              data: {
                title: 'React guide',
                description: 'Learn React',
                created: '2026-10-02',
                updated: '2026-10-02',
                categories: [],
                references: [],
              },
            },
          ]}
          translations={translations}
        />,
      );
      const button = screen.container.querySelector('button');
      const dialog = screen.container.querySelector('dialog');
      const input = screen.container.querySelector('input');

      assert.ok(button);
      assert.ok(dialog);
      assert.ok(input);

      button.focus();
      await userEvent.keyboard('{Shift>}R{/Shift}');

      assert.isTrue(dialog.open);
      assert.strictEqual(input.value, 'R');
      assert.strictEqual(document.activeElement, input);
      await vi.waitFor(() => {
        assert.include(dialog.querySelector('ul')?.textContent, 'React guide');
      });

      await userEvent.keyboard('eact');

      assert.strictEqual(input.value, 'React');
    });

    it('should open the dialog with the first lowercase letter as the query', async () => {
      const screen = await render(
        <LocalSearch vMarkdownFileMetas={[]} translations={translations} />,
      );
      const button = screen.container.querySelector('button');
      const dialog = screen.container.querySelector('dialog');
      const input = screen.container.querySelector('input');

      assert.ok(button);
      assert.ok(dialog);
      assert.ok(input);

      button.focus();
      await userEvent.keyboard('a');

      assert.isTrue(dialog.open);
      assert.strictEqual(input.value, 'a');
      assert.strictEqual(document.activeElement, input);
    });

    it('should open the dialog with the first digit as the query', async () => {
      const screen = await render(
        <LocalSearch vMarkdownFileMetas={[]} translations={translations} />,
      );
      const button = screen.container.querySelector('button');
      const dialog = screen.container.querySelector('dialog');
      const input = screen.container.querySelector('input');

      assert.ok(button);
      assert.ok(dialog);
      assert.ok(input);

      button.focus();
      await userEvent.keyboard('1');

      assert.isTrue(dialog.open);
      assert.strictEqual(input.value, '1');
      assert.strictEqual(document.activeElement, input);
    });

    it('should ignore modified letters, punctuation, and IME composition on the button', async () => {
      const screen = await render(
        <LocalSearch vMarkdownFileMetas={[]} translations={translations} />,
      );
      const button = screen.container.querySelector('button');
      const dialog = screen.container.querySelector('dialog');
      const input = screen.container.querySelector('input');

      assert.ok(button);
      assert.ok(dialog);
      assert.ok(input);

      button.focus();
      await userEvent.keyboard('{Control>}a{/Control}{Meta>}a{/Meta}{Alt>}a{/Alt}.');
      button.dispatchEvent(
        new KeyboardEvent('keydown', {
          bubbles: true,
          isComposing: true,
          key: 'a',
        }),
      );

      assert.isFalse(dialog.open);
      assert.strictEqual(input.value, '');
      assert.strictEqual(document.activeElement, button);
    });
  });

  describe('keyboard shortcut display', () => {
    it('should display Cmd K on macOS', async () => {
      vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
      );

      const screen = await render(
        <LocalSearch vMarkdownFileMetas={[]} translations={translations} />,
      );
      const keycaps = screen.container.querySelectorAll('button kbd');

      assert.strictEqual(keycaps.length, 2);
      assert.strictEqual(keycaps[0].textContent, 'Cmd');
      assert.strictEqual(keycaps[1].textContent, 'K');
    });

    it('should display Cmd K on iOS', async () => {
      vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
        'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15',
      );

      const screen = await render(
        <LocalSearch vMarkdownFileMetas={[]} translations={translations} />,
      );
      const keycaps = screen.container.querySelectorAll('button kbd');

      assert.strictEqual(keycaps.length, 2);
      assert.strictEqual(keycaps[0].textContent, 'Cmd');
      assert.strictEqual(keycaps[1].textContent, 'K');
    });

    it('should display Ctrl K on Windows', async () => {
      vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      );

      const screen = await render(
        <LocalSearch vMarkdownFileMetas={[]} translations={translations} />,
      );
      const keycaps = screen.container.querySelectorAll('button kbd');

      assert.strictEqual(keycaps.length, 2);
      assert.strictEqual(keycaps[0].textContent, 'Ctrl');
      assert.strictEqual(keycaps[1].textContent, 'K');
    });

    it('should display Ctrl K on Linux', async () => {
      vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      );

      const screen = await render(
        <LocalSearch vMarkdownFileMetas={[]} translations={translations} />,
      );
      const keycaps = screen.container.querySelectorAll('button kbd');

      assert.strictEqual(keycaps.length, 2);
      assert.strictEqual(keycaps[0].textContent, 'Ctrl');
      assert.strictEqual(keycaps[1].textContent, 'K');
    });
  });
});
