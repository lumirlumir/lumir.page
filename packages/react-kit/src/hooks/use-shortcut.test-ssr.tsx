import { assert, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useShortcut } from './use-shortcut.js';

it('does not invoke the shortcut during server rendering', () => {
  const onShortcut = vi.fn();

  function Shortcut() {
    useShortcut('k', onShortcut);
    return null;
  }

  renderToString(<Shortcut />);
  assert.lengthOf(onShortcut.mock.calls, 0);
});
