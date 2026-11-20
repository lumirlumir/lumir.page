import { assert, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { SVGWrapper } from './svg-wrapper.js';

it('renders the configured SVG viewBox and path on the server', () => {
  const Icon = SVGWrapper({
    attrs: { viewBox: '0 0 24 24' },
    children: <path d="M0 0h24" />,
  });

  const html = renderToString(<Icon />);

  assert.include(html, 'viewBox="0 0 24 24"');
  assert.include(html, '<path d="M0 0h24"></path>');
});
