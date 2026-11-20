import { assert, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useToggle } from './use-toggle.js';

it('renders the default toggle state on the server', () => {
  function ToggleState() {
    const [enabled] = useToggle();
    return String(enabled);
  }

  assert.strictEqual(renderToString(<ToggleState />), 'false');
});
