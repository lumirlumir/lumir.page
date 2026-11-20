import { assert, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useScroll } from './use-scroll.js';

it('renders the scroll target on the server', () => {
  function ScrollTarget() {
    const [ref] = useScroll<HTMLDivElement>();
    return <div ref={ref}>Target</div>;
  }

  assert.strictEqual(renderToString(<ScrollTarget />), '<div>Target</div>');
});
