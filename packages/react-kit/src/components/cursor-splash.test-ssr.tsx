import { assert, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CursorSplash } from './cursor-splash.js';

it('renders the splash canvas on the server', () => {
  assert.strictEqual(renderToString(<CursorSplash />), '<div><canvas></canvas></div>');
});
