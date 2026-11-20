import { assert, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useScrollProgress } from './use-scroll-progress.js';

it('does not report scroll progress during server rendering', () => {
  const onProgress = vi.fn();

  function ScrollProgress() {
    useScrollProgress(onProgress);
    return null;
  }

  renderToString(<ScrollProgress />);
  assert.lengthOf(onProgress.mock.calls, 0);
});
