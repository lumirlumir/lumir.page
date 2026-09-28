/**
 * @fileoverview Test for `dialog.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { createRef, type MouseEvent } from 'react';
import { assert, describe, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Dialog, type DialogHandle } from './dialog.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('dialog', () => {
  it('Trigger button should open the native modal and focus the requested element', async () => {
    const inputRef = createRef<HTMLInputElement>();
    const screen = await render(
      <Dialog
        trigger="Search"
        triggerProps={{ 'aria-label': 'Open search', className: 'trigger' }}
        aria-label="Search dialog"
        className="search-dialog"
        closedby="any"
        initialFocusRef={inputRef}
      >
        <input ref={inputRef} aria-label="Search query" />
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
    assert.strictEqual(document.activeElement, inputRef.current);
  });

  it('Content close method should close the dialog and forward its close event', async () => {
    const onClose = vi.fn();
    const screen = await render(
      <Dialog trigger="Open" aria-label="Example" onClose={onClose}>
        {({ close }) => (
          <button type="button" onClick={close}>
            Cancel
          </button>
        )}
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
  });

  it('Prevented trigger click should leave the dialog closed while the handle can open and close it', async () => {
    const ref = createRef<DialogHandle>();
    const onClick = vi.fn((event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    });
    const screen = await render(
      <Dialog ref={ref} trigger="Open" triggerProps={{ onClick }} aria-label="Example">
        Content
      </Dialog>,
    );
    const button = screen.container.querySelector('button');
    const dialog = screen.container.querySelector('dialog');

    assert.isNotNull(button);
    assert.isNotNull(dialog);
    assert.isNotNull(ref.current);

    button.click();
    assert.strictEqual(onClick.mock.calls.length, 1);
    assert.strictEqual(dialog.open, false);

    ref.current.open();
    ref.current.open();
    assert.strictEqual(dialog.open, true);

    ref.current.close();
    ref.current.close();
    assert.strictEqual(dialog.open, false);
  });
});
