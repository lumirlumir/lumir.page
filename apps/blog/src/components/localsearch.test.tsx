/**
 * @fileoverview Test for `localsearch.tsx`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, beforeEach, describe, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { ComponentProps } from 'react';

let { LocalSearch } = await import('./localsearch');

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const article = {
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
  headings: [
    { id: 'react', text: 'React guide', depth: 1, content: 'Learn React' },
    { id: 'hooks', text: 'React hooks', depth: 2, content: '' },
  ],
} as const;

// --------------------------------------------------------------------------------
// Mock
// --------------------------------------------------------------------------------

vi.mock(
  'next/link',
  () =>
    ({
      children,
      onNavigate: _onNavigate,
      ...props
    }: ComponentProps<'a'> & { onNavigate?: unknown }) => <a {...props}>{children}</a>,
);

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('localsearch', () => {
  beforeEach(async () => {
    // Isolate the module-level search cache between browser tests.
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
    it('should fetch on opening and reuse pending and loaded data', async () => {
      const response = Promise.withResolvers<Response>();
      const fetchSearch = vi.spyOn(globalThis, 'fetch').mockReturnValue(response.promise);
      const screen = await render(<LocalSearch lang="en" />);

      assert.strictEqual(fetchSearch.mock.calls.length, 0);
      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      assert.deepStrictEqual(fetchSearch.mock.calls, [['/en/search.json']]);
      assert.include(screen.container.textContent, 'Loading search data...');

      await userEvent.keyboard('{Escape}/');
      assert.strictEqual(fetchSearch.mock.calls.length, 1);

      response.resolve(Response.json([]));
      await vi.waitFor(() => assert.include(screen.container.textContent, 'Search docs'));
      await screen.unmount();

      const remounted = await render(<LocalSearch lang="en" />);
      await remounted.getByRole('button', { name: 'Search', exact: true }).click();
      await vi.waitFor(() =>
        assert.include(remounted.container.textContent, 'Search docs'),
      );
      assert.strictEqual(fetchSearch.mock.calls.length, 1);
    });

    it('should search a pending query when loading finishes', async () => {
      const response = Promise.withResolvers<Response>();
      vi.spyOn(globalThis, 'fetch').mockReturnValue(response.promise);
      const screen = await render(<LocalSearch lang="en" />);

      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      await screen.getByRole('searchbox', { name: 'Search' }).fill('React');
      assert.include(screen.container.textContent, 'Loading search data...');
      assert.notInclude(screen.container.textContent, 'No search results.');

      response.resolve(Response.json([article]));
      await vi.waitFor(() => {
        assert.include(
          screen.container.querySelector('li > a')?.textContent,
          'React guide',
        );
      });
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
        assert.include(screen.container.textContent, 'Failed to load search data.');
      });
      await screen.getByRole('button', { name: 'Retry' }).click();
      await vi.waitFor(() => {
        assert.include(screen.container.textContent, 'No search results.');
      });
      assert.strictEqual(fetchSearch.mock.calls.length, 2);
      assert.strictEqual(screen.container.querySelector('input')?.value, 'React');
    });

    it('should retry a network failure on reopening, not closing', async () => {
      const fetchSearch = vi
        .spyOn(globalThis, 'fetch')
        .mockRejectedValueOnce(new TypeError('Network failure'))
        .mockResolvedValueOnce(Response.json([]));
      const screen = await render(<LocalSearch lang="en" />);

      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      await vi.waitFor(() => {
        assert.include(screen.container.textContent, 'Failed to load search data.');
      });
      await userEvent.keyboard('{Control>}k{/Control}');
      assert.strictEqual(fetchSearch.mock.calls.length, 1);
      await userEvent.keyboard('{Control>}k{/Control}');
      await vi.waitFor(() => assert.include(screen.container.textContent, 'Search docs'));
      assert.strictEqual(fetchSearch.mock.calls.length, 2);
    });

    it('should clear the query when Escape closes the dialog', async () => {
      const screen = await render(<LocalSearch lang="en" />);

      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      await screen.getByRole('searchbox', { name: 'Search' }).fill('React');
      // Leave the search input so Escape closes the dialog instead of clearing the input itself.
      await userEvent.keyboard('{Tab}{Escape}');
      await vi.waitFor(() => {
        assert.isFalse(screen.container.querySelector('dialog')?.open);
        assert.strictEqual(screen.container.querySelector('input')?.value, '');
      });
    });

    it('should request search data for the selected language', async () => {
      const screen = await render(<LocalSearch lang="ko" />);

      await userEvent.keyboard('{Meta>}k{/Meta}');
      await vi.waitFor(() => assert.include(screen.container.textContent, '문서 검색'));
      assert.deepStrictEqual(vi.mocked(fetch).mock.calls, [['/ko/search.json']]);
    });
  });

  describe('search result rendering', () => {
    it('should rank title and body matches first and preserve content-only ties', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        Response.json([
          {
            ...article,
            headings: [
              { id: 'overview', text: 'Overview', depth: 1, content: 'React overview' },
              { id: 'usage', text: 'Usage', depth: 2, content: 'Use React here.' },
              { id: 'hooks', text: 'React hooks', depth: 2, content: '' },
              { id: 'state', text: 'REACT state', depth: 2, content: 'React state.' },
              { id: 'other', text: 'Other tools', depth: 2, content: 'Unrelated.' },
            ],
          },
        ]),
      );
      const screen = await render(<LocalSearch lang="en" />);

      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      await screen.getByRole('searchbox', { name: 'Search' }).fill(' rEaCt ');
      await vi.waitFor(() => {
        assert.deepStrictEqual(
          Array.from(screen.container.querySelectorAll('li > a'), link =>
            link.getAttribute('href'),
          ),
          [
            '/en/posts/react#state',
            '/en/posts/react#hooks',
            '/en/posts/react#overview',
            '/en/posts/react#usage',
          ],
        );
      });
    });

    it('should show article and section titles with a safe highlighted excerpt and section link', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        Response.json([
          {
            ...article,
            headings: [
              { id: 'installation', text: 'Installation', depth: 1, content: '' },
              { id: 'usage', text: 'Usage', depth: 2, content: '' },
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

      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      await screen.getByRole('searchbox', { name: 'Search' }).fill('tooltip');
      await vi.waitFor(() => {
        assert.strictEqual(
          screen.container.querySelector('li > a mark')?.textContent,
          'tooltip',
        );
      });
      const link = screen.container.querySelector('li > a');
      const excerpt = link?.querySelector('span')?.children[1];

      assert.ok(link);
      assert.ok(excerpt);
      assert.strictEqual(link.getAttribute('href'), '/en/posts/react#references');
      assert.strictEqual(
        link.querySelector('span')?.children[0].textContent,
        'React guide / References',
      );
      assert.include(excerpt.textContent, '<img src=x>');
      assert.isAtMost(excerpt.textContent.length, 222);
      assert.isNull(link.querySelector('img'));
    });

    it('should highlight title and body matches and update them with the query', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        Response.json([
          {
            ...article,
            headings: [
              {
                id: 'react',
                text: 'React & Reactivity',
                depth: 1,
                content: 'Try REACT.',
              },
            ],
          },
        ]),
      );
      const screen = await render(<LocalSearch lang="en" />);

      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      await screen.getByRole('searchbox', { name: 'Search' }).fill('react');
      await vi.waitFor(() => {
        assert.deepStrictEqual(
          Array.from(
            screen.container.querySelectorAll('li > a mark'),
            mark => mark.textContent,
          ),
          ['React', 'REACT'],
        );
      });
      assert.strictEqual(
        screen.container.querySelector('li > a > span')?.children[0].textContent,
        'React & Reactivity',
      );
      assert.strictEqual(
        screen.container.querySelector('li > a > span')?.children[1].textContent,
        'Try REACT.',
      );

      await screen.getByRole('searchbox', { name: 'Search' }).fill('reactiv');
      await vi.waitFor(() => {
        assert.deepStrictEqual(
          Array.from(
            screen.container.querySelectorAll('li > a mark'),
            mark => mark.textContent,
          ),
          ['Reactiv'],
        );
      });
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(() => {
      vi.mocked(fetch).mockResolvedValue(Response.json([article]));
    });

    it('should select by hover or keyboard and open the active result on Enter', async () => {
      const screen = await render(<LocalSearch lang="en" />);
      screen.container.style.setProperty('--color-bg-default', 'white');
      screen.container.style.setProperty('--color-bg-neutral-muted', 'silver');
      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      await screen.getByRole('searchbox', { name: 'Search' }).fill('React');
      await vi.waitFor(() =>
        assert.strictEqual(screen.container.querySelectorAll('li > a').length, 2),
      );
      const [first, second] =
        screen.container.querySelectorAll<HTMLAnchorElement>('li > a');
      const firstClick = vi.spyOn(first, 'click').mockImplementation(() => {});
      const secondClick = vi.spyOn(second, 'click').mockImplementation(() => {});

      assert.strictEqual(first.getAttribute('data-active'), 'true');
      await userEvent.hover(second);
      assert.strictEqual(first.getAttribute('data-active'), 'false');
      assert.strictEqual(second.getAttribute('data-active'), 'true');
      await userEvent.keyboard('{Enter}');
      assert.strictEqual(firstClick.mock.calls.length, 0);
      assert.strictEqual(secondClick.mock.calls.length, 1);

      await userEvent.keyboard('{ArrowUp}');
      assert.strictEqual(first.getAttribute('data-active'), 'true');
      assert.strictEqual(second.getAttribute('data-active'), 'false');
      assert.isTrue(second.matches(':hover'));
      assert.strictEqual(getComputedStyle(first).backgroundColor, 'rgb(192, 192, 192)');
      assert.strictEqual(getComputedStyle(second).backgroundColor, 'rgb(255, 255, 255)');
      assert.strictEqual(document.activeElement, screen.container.querySelector('input'));
      await userEvent.keyboard('{Enter}');
      assert.strictEqual(firstClick.mock.calls.length, 1);
      assert.strictEqual(secondClick.mock.calls.length, 1);
    });

    it('should wrap keyboard selection and scroll the selected result into view', async () => {
      const screen = await render(<LocalSearch lang="en" />);
      await screen.getByRole('button', { name: 'Search', exact: true }).click();
      await screen.getByRole('searchbox', { name: 'Search' }).fill('React');
      await vi.waitFor(() =>
        assert.strictEqual(screen.container.querySelectorAll('li > a').length, 2),
      );
      const [first, second] =
        screen.container.querySelectorAll<HTMLAnchorElement>('li > a');
      const scroll = vi.spyOn(second, 'scrollIntoView').mockImplementation(() => {});

      await userEvent.keyboard('{ArrowUp}');
      assert.strictEqual(second.getAttribute('data-active'), 'true');
      assert.deepStrictEqual(scroll.mock.calls, [
        [{ behavior: 'smooth', block: 'nearest', inline: 'nearest' }],
      ]);

      await userEvent.keyboard('{ArrowDown}');
      assert.strictEqual(first.getAttribute('data-active'), 'true');
      assert.strictEqual(document.activeElement, screen.container.querySelector('input'));
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
