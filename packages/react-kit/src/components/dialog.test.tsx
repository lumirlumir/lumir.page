/**
 * @fileoverview Test for `dialog.tsx`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { createRef } from 'react';
import { assert, describe, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Dialog } from './dialog.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('dialog', () => {
  it('Trigger button should open the native modal and forward element attributes', async () => {
    const screen = await render(
      <Dialog
        trigger="Search"
        triggerProps={{ 'aria-label': 'Open search', className: 'trigger' }}
        aria-label="Search dialog"
        className="search-dialog"
        closedby="any"
      >
        <input aria-label="Search query" />
      </Dialog>,
    );
    const button = screen.container.querySelector('button');
    const dialog = screen.container.querySelector('dialog');

    assert.isNotNull(button);
    assert.isNotNull(dialog);
    assert.strictEqual(button.type, 'button');
    assert.strictEqual(button.className, 'trigger');
    assert.strictEqual(button.getAttribute('aria-label'), 'Open search');
    assert.strictEqual(dialog.className, 'search-dialog');
    assert.strictEqual(dialog.getAttribute('aria-label'), 'Search dialog');
    assert.strictEqual(dialog.getAttribute('closedby'), 'any');
    assert.strictEqual(dialog.open, false);

    button.click();

    assert.strictEqual(dialog.open, true);
    assert.strictEqual(dialog.matches(':modal'), true);
    assert.strictEqual(document.activeElement, dialog.querySelector('input'));
  });

  it('Native dialog ref should close and reopen the modal while forwarding close events', async () => {
    const dialogRef = createRef<HTMLDialogElement>();
    const onClose = vi.fn();
    const screen = await render(
      <Dialog dialogRef={dialogRef} trigger="Open" aria-label="Example" onClose={onClose}>
        <button type="button" onClick={() => dialogRef.current?.close()}>
          Cancel
        </button>
      </Dialog>,
    );
    const dialog = screen.container.querySelector('dialog');
    const trigger = screen.container.querySelector('button');
    const cancel = dialog?.querySelector('button');

    assert.isNotNull(dialog);
    assert.isNotNull(trigger);
    assert.ok(cancel);

    trigger.click();
    assert.strictEqual(dialog.open, true);

    cancel.click();
    assert.strictEqual(dialog.open, false);
    await vi.waitFor(() => assert.strictEqual(onClose.mock.calls.length, 1));

    dialogRef.current?.showModal();
    assert.strictEqual(dialog.open, true);
  });

  it('Disabled trigger button should not open the dialog', async () => {
    const screen = await render(
      <Dialog trigger="Open" triggerProps={{ disabled: true }} aria-label="Example">
        Content
      </Dialog>,
    );
    const button = screen.container.querySelector('button');
    const dialog = screen.container.querySelector('dialog');

    assert.isNotNull(button);
    assert.isNotNull(dialog);

    button.click();
    assert.strictEqual(dialog.open, false);
  });
});
