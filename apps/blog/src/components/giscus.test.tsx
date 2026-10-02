/**
 * @fileoverview Test for `giscus.tsx`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { ThemeProvider } from '@/contexts/theme';
import { themeDefault } from '@/data/theme';
import { Giscus } from './giscus';

// --------------------------------------------------------------------------------
// Mock
// --------------------------------------------------------------------------------

vi.mock('@giscus/react', () => ({
  default: ({ theme, lang }: { theme: string; lang: string }) => (
    <div data-theme={theme} lang={lang} />
  ),
}));

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('giscus', () => {
  it('should pass the current theme and language to the comments widget', async () => {
    const screen = await render(
      <ThemeProvider>
        <Giscus lang="ko" />
      </ThemeProvider>,
    );
    const widget = screen.container.querySelector('[data-theme]');

    assert.ok(widget);
    assert.strictEqual(widget.getAttribute('data-theme'), themeDefault);
    assert.strictEqual(widget.getAttribute('lang'), 'ko');
  });
});
