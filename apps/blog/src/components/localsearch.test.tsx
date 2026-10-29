/**
 * @fileoverview Test for `localsearch.tsx`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, describe, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { LocalSearch } from './localsearch';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('localsearch', () => {
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

  describe('spell checking', () => {
    it('should disable spell checking on the search input', async () => {
      const screen = await render(<LocalSearch lang="en" />);
      const input = screen.container.querySelector('input');

      assert.ok(input);
      assert.strictEqual(input.getAttribute('spellcheck'), 'false');
      assert.isFalse(input.spellcheck);
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
