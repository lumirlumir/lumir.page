/**
 * @fileoverview Test for `localsearch.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, describe, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { type ReactNode } from 'react';
import { LocalSearch, type LocalSearchProps } from './localsearch.jsx';

// --------------------------------------------------------------------------------
// Mock
// --------------------------------------------------------------------------------

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Next.js navigation runs in E2E tests; unit tests only need the rendered anchor.
vi.mock(
  'next/link',
  () =>
    function Link({
      href,
      children,
      'data-active': active,
    }: {
      href: string;
      children: ReactNode;
      'data-active'?: boolean;
    }) {
      return (
        <a href={href} data-active={active}>
          {children}
        </a>
      );
    },
);

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

  it('should show the ancestor path and safely highlight a body excerpt with its section link', async () => {
    const screen = await render(
      <LocalSearch
        documents={[
          {
            id: 'example.en:1',
            url: '/en/posts/example#references',
            heading: 'References',
            parent: {
              id: 'usage',
              text: 'Usage',
              depth: 2,
              content: '',
              parent: {
                id: 'example',
                text: 'Example article',
                depth: 1,
                content: '',
                parent: null,
              },
            },
            content: `${'Background text. '.repeat(70)}Use tooltips <img src=x> for context.`,
            slug: 'example',
            lang: 'en',
            readtime: 1,
            data: {
              title: 'Example article',
              description: 'Metadata summary',
              created: '2026-10-03',
              updated: '2026-10-03',
              categories: [],
              references: [],
            },
          },
        ]}
        translations={translations}
      />,
    );
    const button = screen.container.querySelector('button');

    assert.ok(button);
    button.focus();
    await userEvent.keyboard('tooltip');
    await vi.waitFor(() => {
      assert.strictEqual(screen.container.querySelectorAll('li > a').length, 1);
    });

    const link = screen.container.querySelector('li > a');
    const excerpt = link?.querySelector('span')?.children[2];

    assert.ok(link);
    assert.ok(excerpt);
    assert.strictEqual(link.getAttribute('href'), '/en/posts/example#references');
    assert.strictEqual(
      link.querySelector('span')?.children[0].textContent,
      'Example article / Usage / References',
    );
    assert.include(excerpt.textContent, '<img src=x>');
    assert.strictEqual(excerpt.querySelector('mark')?.textContent, 'tooltips');
    assert.isAtMost(excerpt.textContent.length, 222);
    assert.isNull(link.querySelector('img'));

    await screen.getByRole('searchbox', { name: 'Search' }).fill('tooltaps');
    await vi.waitFor(() => {
      assert.strictEqual(excerpt.querySelector('mark')?.textContent, 'tooltips');
    });
  });

  it('should include a body H1 in the path of a matching child section', async () => {
    const screen = await render(
      <LocalSearch
        documents={[
          {
            id: 'example.en:2',
            url: '/en/posts/example#windows',
            heading: 'Windows',
            parent: {
              id: 'installation',
              text: 'Installation',
              depth: 1,
              content: '',
              parent: null,
            },
            content: 'Tooltip setup.',
            slug: 'example',
            lang: 'en',
            readtime: 1,
            data: {
              title: 'Example article',
              description: 'Metadata summary',
              created: '2026-10-03',
              updated: '2026-10-03',
              categories: [],
              references: [],
            },
          },
        ]}
        translations={translations}
      />,
    );

    const button = screen.container.querySelector('button');

    assert.ok(button);
    button.focus();
    await userEvent.keyboard('tooltip');

    await vi.waitFor(() => {
      assert.strictEqual(
        screen.container.querySelector('li > a > span')?.children[0].textContent,
        'Example article / Installation / Windows',
      );
    });
  });

  it('should highlight exact, prefix, and fuzzy matches in titles and descriptions while preserving text', async () => {
    const screen = await render(
      <LocalSearch
        documents={[
          {
            id: 'react.en',
            url: '/en/posts/react',
            heading: '',
            parent: null,
            content: '',
            slug: 'react',
            lang: 'en',
            readtime: 1,
            data: {
              title: 'React & Reactivity <img src=x>',
              description: 'Try REACT; a reaction guide.',
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

    assert.ok(button);
    button.focus();
    await userEvent.keyboard('react');
    await vi.waitFor(() => {
      assert.strictEqual(screen.container.querySelectorAll('li > a').length, 1);
    });
    const result = screen.container.querySelector('li > a > span');
    const title = result?.children[0];
    const description = result?.children[2];

    assert.ok(result);
    assert.ok(title);
    assert.ok(description);
    await vi.waitFor(() => {
      assert.deepStrictEqual(
        Array.from(title.querySelectorAll('mark'), mark => mark.textContent),
        ['React', 'Reactivity'],
      );
      assert.deepStrictEqual(
        Array.from(description.querySelectorAll('mark'), mark => mark.textContent),
        ['REACT', 'reaction'],
      );
    });
    assert.strictEqual(title.textContent, 'React & Reactivity <img src=x>');
    assert.strictEqual(description.textContent, 'Try REACT; a reaction guide.');
    assert.isNull(result.querySelector('img'));

    await screen.getByRole('searchbox', { name: 'Search' }).fill('reactiv');
    await vi.waitFor(() => {
      assert.deepStrictEqual(
        Array.from(title.querySelectorAll('mark'), mark => mark.textContent),
        ['Reactivity'],
      );
      assert.deepStrictEqual(
        Array.from(description.querySelectorAll('mark'), mark => mark.textContent),
        [],
      );
    });

    await screen.getByRole('searchbox', { name: 'Search' }).fill('reacr');
    await vi.waitFor(() => {
      assert.deepStrictEqual(
        Array.from(title.querySelectorAll('mark'), mark => mark.textContent),
        ['React'],
      );
      assert.deepStrictEqual(
        Array.from(description.querySelectorAll('mark'), mark => mark.textContent),
        ['REACT'],
      );
    });
    assert.strictEqual(title.textContent, 'React & Reactivity <img src=x>');
    assert.strictEqual(description.textContent, 'Try REACT; a reaction guide.');
    assert.isNull(result.querySelector('img'));
  });

  it('should scroll hidden keyboard selections into view without scrolling visible results', async () => {
    const screen = await render(
      <LocalSearch
        documents={[
          {
            id: 'react-first.en',
            url: '/en/posts/react-first',
            heading: '',
            parent: null,
            content: '',
            slug: 'react-first',
            lang: 'en',
            readtime: 1,
            data: {
              title: 'React first',
              description: 'React guide',
              created: '2026-10-02',
              updated: '2026-10-02',
              categories: [],
              references: [],
            },
          },
          {
            id: 'react-second.en',
            url: '/en/posts/react-second',
            heading: '',
            parent: null,
            content: '',
            slug: 'react-second',
            lang: 'en',
            readtime: 1,
            data: {
              title: 'React second',
              description: 'React guide',
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

    assert.ok(button);
    button.focus();
    await userEvent.keyboard('React');
    await vi.waitFor(() => {
      assert.strictEqual(screen.container.querySelectorAll('li > a').length, 2);
    });
    const input = screen.container.querySelector('input');
    const list = screen.container.querySelector('ul');
    const panel = list?.parentElement?.parentElement;
    const source = list?.previousElementSibling;
    const first = list?.querySelectorAll('a')[0];
    const second = list?.querySelectorAll('a')[1];

    assert.ok(input);
    assert.ok(list);
    assert.ok(panel);
    assert.ok(source instanceof HTMLElement);
    assert.ok(first);
    assert.ok(second);

    // Give the panel deterministic dimensions while exercising real browser scrolling.
    Object.assign(panel.style, { height: '120px', padding: '0', overflowY: 'auto' });
    Object.assign(list.style, { margin: '0', padding: '0' });
    source.style.display = 'none';
    first.style.height = '40px';
    second.style.height = '40px';
    const firstScroll = vi.spyOn(first, 'scrollIntoView');
    const secondScroll = vi.spyOn(second, 'scrollIntoView');

    await userEvent.keyboard('{ArrowDown}{ArrowUp}');

    assert.strictEqual(first.getAttribute('data-active'), 'true');
    assert.strictEqual(firstScroll.mock.calls.length, 0);
    assert.strictEqual(secondScroll.mock.calls.length, 0);

    panel.style.height = '60px';
    await userEvent.keyboard('{ArrowDown}');

    assert.strictEqual(second.getAttribute('data-active'), 'true');
    assert.strictEqual(secondScroll.mock.calls.length, 1);
    assert.isAbove(panel.scrollTop, 0);
    assert.isAtMost(
      second.getBoundingClientRect().bottom,
      panel.getBoundingClientRect().bottom,
    );
    assert.strictEqual(document.activeElement, input);

    await userEvent.keyboard('{ArrowUp}');

    assert.strictEqual(first.getAttribute('data-active'), 'true');
    assert.strictEqual(firstScroll.mock.calls.length, 1);
    assert.strictEqual(panel.scrollTop, 0);

    await userEvent.keyboard('{ArrowUp}');

    assert.strictEqual(second.getAttribute('data-active'), 'true');
    assert.strictEqual(secondScroll.mock.calls.length, 2);
    assert.isAbove(panel.scrollTop, 0);

    await userEvent.keyboard('{ArrowDown}');

    assert.strictEqual(first.getAttribute('data-active'), 'true');
    assert.strictEqual(firstScroll.mock.calls.length, 2);
    assert.strictEqual(panel.scrollTop, 0);
    assert.strictEqual(input.value, 'React');
    assert.strictEqual(document.activeElement, input);
  });

  describe('spell checking', () => {
    it('should disable spell checking on the search input', async () => {
      const screen = await render(
        <LocalSearch documents={[]} translations={translations} />,
      );
      const input = screen.container.querySelector('input');

      assert.ok(input);
      assert.strictEqual(input.getAttribute('spellcheck'), 'false');
      assert.isFalse(input.spellcheck);
    });
  });

  describe('typing on the search button', () => {
    it('should search with the first uppercase letter and continue typing in the input', async () => {
      const screen = await render(
        <LocalSearch
          documents={[
            {
              id: 'react.en',
              url: '/en/posts/react',
              heading: '',
              parent: null,
              content: '',
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
        <LocalSearch documents={[]} translations={translations} />,
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
        <LocalSearch documents={[]} translations={translations} />,
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
        <LocalSearch documents={[]} translations={translations} />,
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
        <LocalSearch documents={[]} translations={translations} />,
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
        <LocalSearch documents={[]} translations={translations} />,
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
        <LocalSearch documents={[]} translations={translations} />,
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
        <LocalSearch documents={[]} translations={translations} />,
      );
      const keycaps = screen.container.querySelectorAll('button kbd');

      assert.strictEqual(keycaps.length, 2);
      assert.strictEqual(keycaps[0].textContent, 'Ctrl');
      assert.strictEqual(keycaps[1].textContent, 'K');
    });
  });
});
