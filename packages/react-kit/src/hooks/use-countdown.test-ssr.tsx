import { assert, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { useCountdown } from './use-countdown.js';

it('renders the initial countdown duration on the server', () => {
  function Countdown() {
    const [count] = useCountdown(3_000);
    return count;
  }

  assert.strictEqual(renderToString(<Countdown />), '3000');
});
