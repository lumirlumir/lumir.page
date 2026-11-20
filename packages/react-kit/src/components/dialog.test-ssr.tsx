import { assert, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Dialog } from './dialog.js';

it('renders a closed dialog with its open and close buttons on the server', () => {
  const html = renderToString(
    <Dialog.Root>
      <Dialog.Open>Open</Dialog.Open>
      <Dialog.Content>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>,
  );

  assert.strictEqual(
    html,
    '<button type="button">Open</button><dialog closedby="any"><button type="button">Close</button></dialog>',
  );
});
