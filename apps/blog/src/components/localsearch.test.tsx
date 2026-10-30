/**
 * @fileoverview Test for `localsearch.tsx`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, beforeEach, describe, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { type ReactNode } from 'react';
// Let Vite discover dependencies before importing fresh instances in each test.
import './localsearch.jsx';

let LocalSearch: (typeof import('./localsearch.jsx'))['LocalSearch'];

// --------------------------------------------------------------------------------
// Mock
// --------------------------------------------------------------------------------

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

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
// Test
// --------------------------------------------------------------------------------

describe('localsearch', () => {
  beforeEach(async () => {
    // Native browser modules retain their cache even after vi.resetModules().
    ({ LocalSearch } = await import(
      /* @vite-ignore */ `./localsearch.tsx?test=${crypto.randomUUID()}`
    ));
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json([]));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('translations', () => {
    it('should render the Korean translations and search icon with only the language prop', async () => {
      const screen = await render(<LocalSearch lang="ko" />);
      const button = screen.container.querySelector('button');
      const input = screen.container.querySelector('input');
      const dialog = screen.container.querySelector('dialog');

      assert.ok(button);
      assert.ok(input);
      assert.ok(dialog);
      assert.strictEqual(button.getAttribute('aria-label'), '검색');
      assert.strictEqual(input.placeholder, '검색');
      assert.isNotNull(button.querySelector('svg'));
      assert.strictEqual(dialog.getAttribute('aria-label'), '검색');
    });

    it('should render the English translations and search icon with only the language prop', async () => {
      const screen = await render(<LocalSearch lang="en" />);
      const button = screen.container.querySelector('button');
      const input = screen.container.querySelector('input');
      const dialog = screen.container.querySelector('dialog');

      assert.ok(button);
      assert.ok(input);
      assert.ok(dialog);
      assert.strictEqual(button.getAttribute('aria-label'), 'Search');
      assert.strictEqual(input.placeholder, 'Search');
      assert.isNotNull(button.querySelector('svg'));
      assert.strictEqual(dialog.getAttribute('aria-label'), 'Search');
    });
  });

  describe('default icon', () => {
    it('should inherit the text color instead of forcing white', async () => {
      const screen = await render(<LocalSearch lang="en" />);
      const icon = screen.container.querySelector('button svg');

      assert.ok(icon instanceof SVGElement);
      assert.strictEqual(icon.style.color, 'currentcolor');
    });
  });

  describe('spell checking', () => {
    it('should disable spell checking on the search input', async () => {
      const screen = await render(<LocalSearch lang="en" />);
      const input = screen.container.querySelector('input');

      assert.ok(input);
      assert.strictEqual(input.getAttribute('spellcheck'), 'false');
      assert.isFalse(input.spellcheck);
    });
  });

  describe('search data loading', () => {
    it('should defer fetching until opening and reuse a pending request and completed index after remounting', async () => {
      const response = Promise.withResolvers<Response>();
      const fetchSearch = vi.spyOn(globalThis, 'fetch').mockReturnValue(response.promise);
      const screen = await render(<LocalSearch lang="en" />);

      assert.strictEqual(fetchSearch.mock.calls.length, 0);
      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      assert.deepStrictEqual(fetchSearch.mock.calls, [['/en/search.json']]);
      assert.include(
        screen.container.querySelector('[role="status"]')?.textContent,
        'Loading search data.',
      );
      await userEvent.keyboard('{Escape}');
      await userEvent.keyboard('/');
      assert.strictEqual(fetchSearch.mock.calls.length, 1);

      response.resolve(Response.json([]));
      await vi.waitFor(() => {
        assert.isNull(screen.container.querySelector('[role="status"]'));
      });
      await screen.unmount();

      const remounted = await render(<LocalSearch lang="en" />);
      await remounted.getByRole('button', { name: 'Search', exact: true }).click();
      await vi.waitFor(() => {
        assert.isNull(remounted.container.querySelector('[role="status"]'));
      });
      assert.strictEqual(fetchSearch.mock.calls.length, 1);
    });

    it('should search the query entered while loading as soon as the index is ready', async () => {
      const response = Promise.withResolvers<Response>();
      vi.spyOn(globalThis, 'fetch').mockReturnValue(response.promise);
      const screen = await render(<LocalSearch lang="en" />);

      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      await screen.getByRole('searchbox', { name: 'Search' }).fill('React');
      assert.strictEqual(screen.container.querySelectorAll('li > a').length, 0);
      assert.notInclude(screen.container.textContent, 'No results for');

      response.resolve(
        Response.json([
          {
            id: 'react.en',
            url: '/en/posts/react',
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
            headings: [{ id: 'react', text: 'React guide', depth: 1, content: '' }],
          },
        ]),
      );

      await vi.waitFor(() => {
        assert.include(
          screen.container.querySelector('li > a')?.textContent,
          'React guide',
        );
      });
      assert.strictEqual(screen.container.querySelector('input')?.value, 'React');
    });

    it('should retry an unsuccessful response without losing the query', async () => {
      const fetchSearch = vi
        .spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(new Response(null, { status: 503 }))
        .mockResolvedValueOnce(Response.json([]));
      const screen = await render(<LocalSearch lang="en" />);

      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      await screen.getByRole('searchbox', { name: 'Search' }).fill('React');
      await vi.waitFor(() => {
        assert.include(
          screen.container.querySelector('[role="status"]')?.textContent,
          'Failed to load search data.',
        );
      });
      await screen.getByRole('button', { name: 'Retry' }).click();
      await vi.waitFor(() => {
        assert.isNull(screen.container.querySelector('[role="status"]'));
      });

      assert.deepStrictEqual(fetchSearch.mock.calls, [
        ['/en/search.json'],
        ['/en/search.json'],
      ]);
      assert.strictEqual(screen.container.querySelector('input')?.value, 'React');
    });

    it('should retry a network failure when reopening but not when closing the dialog', async () => {
      const fetchSearch = vi
        .spyOn(globalThis, 'fetch')
        .mockRejectedValueOnce(new TypeError('Network failure'))
        .mockResolvedValueOnce(Response.json([]));
      const screen = await render(<LocalSearch lang="en" />);

      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      await vi.waitFor(() => {
        assert.include(
          screen.container.querySelector('[role="status"]')?.textContent,
          'Failed to load search data.',
        );
      });
      await userEvent.keyboard('{Control>}k{/Control}');
      assert.strictEqual(fetchSearch.mock.calls.length, 1);
      await userEvent.keyboard('{Control>}k{/Control}');
      await vi.waitFor(() => {
        assert.isNull(screen.container.querySelector('[role="status"]'));
      });
      assert.strictEqual(fetchSearch.mock.calls.length, 2);
    });

    it('should cache each language separately and reuse it when switching back', async () => {
      const fetchSearch = vi
        .spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce(Response.json([]))
        .mockResolvedValueOnce(Response.json([]));
      const screen = await render(<LocalSearch lang="en" />);

      await userEvent.keyboard('{Meta>}k{/Meta}');
      await vi.waitFor(() => {
        assert.isNull(screen.container.querySelector('[role="status"]'));
      });
      await userEvent.keyboard('{Escape}');
      await screen.rerender(<LocalSearch lang="ko" />);
      await userEvent.keyboard('/');
      await vi.waitFor(() => {
        assert.isNull(screen.container.querySelector('[role="status"]'));
      });
      assert.deepStrictEqual(fetchSearch.mock.calls, [
        ['/en/search.json'],
        ['/ko/search.json'],
      ]);

      await userEvent.keyboard('{Escape}');
      await screen.rerender(<LocalSearch lang="en" />);
      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      await vi.waitFor(() => {
        assert.isNull(screen.container.querySelector('[role="status"]'));
      });
      assert.strictEqual(fetchSearch.mock.calls.length, 2);
    });
  });

  describe('search result rendering', () => {
    it('should show only the article and section titles and safely highlight a body excerpt with its section link', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        Response.json([
          {
            id: 'example.en',
            url: '/en/posts/example',
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
            headings: [
              {
                id: 'example',
                text: 'Example article',
                depth: 1,
                content: '',
              },
              {
                id: 'usage',
                text: 'Usage',
                depth: 2,
                content: '',
              },
              {
                id: 'references',
                text: 'References',
                depth: 3,
                content: `${'Background text. '.repeat(70)}Use tooltips <img src=x> for context.`,
              },
            ],
          },
        ]),
      );

      const screen = await render(<LocalSearch lang="en" />);
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
        'Example article / References',
      );
      await vi.waitFor(() => {
        assert.strictEqual(excerpt.querySelector('mark')?.textContent, 'tooltips');
      });
      assert.include(excerpt.textContent, '<img src=x>');
      assert.isAtMost(excerpt.textContent.length, 222);
      assert.isNull(link.querySelector('img'));

      await screen.getByRole('searchbox', { name: 'Search' }).fill('tooltaps');
      await vi.waitFor(() => {
        assert.strictEqual(excerpt.querySelector('mark')?.textContent, 'tooltips');
      });
    });

    it('should omit a body H1 ancestor from the title of a matching child section', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        Response.json([
          {
            id: 'example.en',
            url: '/en/posts/example',
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
            headings: [
              {
                id: 'example',
                text: 'Example article',
                depth: 1,
                content: '',
              },
              {
                id: 'installation',
                text: 'Installation',
                depth: 1,
                content: '',
              },
              {
                id: 'windows',
                text: 'Windows',
                depth: 2,
                content: 'Tooltip setup.',
              },
            ],
          },
        ]),
      );

      const screen = await render(<LocalSearch lang="en" />);

      const button = screen.container.querySelector('button');

      assert.ok(button);
      button.focus();
      await userEvent.keyboard('tooltip');

      await vi.waitFor(() => {
        assert.strictEqual(
          screen.container.querySelector('li > a > span')?.children[0].textContent,
          'Example article / Windows',
        );
      });
    });

    it('should highlight exact, prefix, and fuzzy matches in titles and descriptions while preserving text', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        Response.json([
          {
            id: 'react.en',
            url: '/en/posts/react',
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
            headings: [
              {
                id: 'react',
                text: 'React & Reactivity <img src=x>',
                depth: 1,
                content: '',
              },
            ],
          },
        ]),
      );

      const screen = await render(<LocalSearch lang="en" />);
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
  });

  describe('keyboard navigation', () => {
    it('should scroll hidden keyboard selections into view without scrolling visible results', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        Response.json([
          {
            id: 'react-first.en',
            url: '/en/posts/react-first',
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
            headings: [
              {
                id: 'react-first',
                text: 'React first',
                depth: 1,
                content: '',
              },
            ],
          },
          {
            id: 'react-second.en',
            url: '/en/posts/react-second',
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
            headings: [
              {
                id: 'react-second',
                text: 'React second',
                depth: 1,
                content: '',
              },
            ],
          },
        ]),
      );

      const screen = await render(<LocalSearch lang="en" />);
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
  });

  describe('typing on the search button', () => {
    it('should search with the first uppercase letter and continue typing in the input', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        Response.json([
          {
            id: 'react.en',
            url: '/en/posts/react',
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
            headings: [{ id: 'react', text: 'React guide', depth: 1, content: '' }],
          },
        ]),
      );

      const screen = await render(<LocalSearch lang="en" />);
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
      const screen = await render(<LocalSearch lang="en" />);
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
      const screen = await render(<LocalSearch lang="en" />);
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
      const screen = await render(<LocalSearch lang="en" />);
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

      const screen = await render(<LocalSearch lang="en" />);
      const keycaps = screen.container.querySelectorAll('button kbd');

      assert.strictEqual(keycaps.length, 2);
      assert.strictEqual(keycaps[0].textContent, 'Cmd');
      assert.strictEqual(keycaps[1].textContent, 'K');
    });

    it('should display Cmd K on iOS', async () => {
      vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
        'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15',
      );

      const screen = await render(<LocalSearch lang="en" />);
      const keycaps = screen.container.querySelectorAll('button kbd');

      assert.strictEqual(keycaps.length, 2);
      assert.strictEqual(keycaps[0].textContent, 'Cmd');
      assert.strictEqual(keycaps[1].textContent, 'K');
    });

    it('should display Ctrl K on Windows', async () => {
      vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      );

      const screen = await render(<LocalSearch lang="en" />);
      const keycaps = screen.container.querySelectorAll('button kbd');

      assert.strictEqual(keycaps.length, 2);
      assert.strictEqual(keycaps[0].textContent, 'Ctrl');
      assert.strictEqual(keycaps[1].textContent, 'K');
    });

    it('should display Ctrl K on Linux', async () => {
      vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      );

      const screen = await render(<LocalSearch lang="en" />);
      const keycaps = screen.container.querySelectorAll('button kbd');

      assert.strictEqual(keycaps.length, 2);
      assert.strictEqual(keycaps[0].textContent, 'Ctrl');
      assert.strictEqual(keycaps[1].textContent, 'K');
    });
  });

  describe('responsive layout', () => {
    it('should use CSS to fill and resize the mobile viewport while keeping the desktop dialog smaller', async () => {
      const originalWidth = window.innerWidth;
      const originalHeight = window.innerHeight;
      await page.viewport(390, 844);

      try {
        const screen = await render(<LocalSearch lang="en" />);
        const dialog = screen.container.querySelector('dialog');

        assert.ok(dialog);

        await screen.getByRole('button', { name: 'Search', exact: true }).click();

        assert.strictEqual(dialog.getBoundingClientRect().width, 390);
        assert.strictEqual(dialog.getBoundingClientRect().height, 844);
        assert.strictEqual(dialog.getBoundingClientRect().top, 0);
        assert.strictEqual(dialog.style.length, 0);

        await page.viewport(390, 600);

        assert.strictEqual(dialog.getBoundingClientRect().width, 390);
        assert.strictEqual(dialog.getBoundingClientRect().height, 600);
        assert.strictEqual(dialog.getBoundingClientRect().top, 0);
        assert.strictEqual(dialog.style.length, 0);

        await page.viewport(1024, 844);

        assert.isBelow(dialog.getBoundingClientRect().width, 1024);
        assert.isBelow(dialog.getBoundingClientRect().height, 844);

        await screen.unmount();
      } finally {
        await page.viewport(originalWidth, originalHeight);
      }
    });
  });
});
