/**
 * @fileoverview Test for `dialog.tsx`.
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
  it('should render native content with forwarded attributes and default dismissal', async () => {
    const screen = await render(
      <Dialog.Root>
        <Dialog.Content className="dialog" aria-label="Search" id="search-dialog">
          Search content
        </Dialog.Content>
      </Dialog.Root>,
    );
    const dialog = screen.container.querySelector('dialog');

    assert.ok(dialog);
    assert.strictEqual(screen.container.firstElementChild, dialog);
    assert.isFalse(dialog.open);
    assert.strictEqual(dialog.className, 'dialog');
    assert.strictEqual(dialog.getAttribute('aria-label'), 'Search');
    assert.strictEqual(dialog.id, 'search-dialog');
    assert.strictEqual(dialog.getAttribute('closedby'), 'any');
    assert.strictEqual(dialog.textContent, 'Search content');
  });

  it('should allow overriding the native dismissal policy', async () => {
    const screen = await render(
      <Dialog.Root>
        <Dialog.Content closedby="none" />
      </Dialog.Root>,
    );
    const dialog = screen.container.querySelector('dialog');

    assert.ok(dialog);
    assert.strictEqual(dialog.getAttribute('closedby'), 'none');
  });

  it('should open a modal and close it through buttons while forwarding refs and events', async () => {
    const openRef = createRef<HTMLButtonElement>();
    const closeRef = createRef<HTMLButtonElement>();
    const onOpenClick = vi.fn();
    const onCloseClick = vi.fn();
    const onClose = vi.fn();
    const screen = await render(
      <Dialog.Root>
        <Dialog.Open ref={openRef} onClick={onOpenClick} aria-label="Open search">
          Open
        </Dialog.Open>
        <Dialog.Content onClose={onClose}>
          <Dialog.Close ref={closeRef} onClick={onCloseClick} className="close">
            Close
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>,
    );
    const dialog = screen.container.querySelector('dialog');

    assert.ok(dialog);
    assert.ok(openRef.current);
    assert.ok(closeRef.current);
    assert.strictEqual(openRef.current.type, 'button');
    assert.strictEqual(closeRef.current.type, 'button');
    assert.strictEqual(openRef.current.getAttribute('aria-label'), 'Open search');
    assert.strictEqual(closeRef.current.className, 'close');

    await screen.getByRole('button', { name: 'Open search' }).click();

    assert.isTrue(dialog.open);
    assert.isTrue(dialog.matches(':modal'));
    assert.strictEqual(onOpenClick.mock.calls.length, 1);

    await screen.getByRole('button', { name: 'Close' }).click();

    assert.isFalse(dialog.open);
    assert.strictEqual(onCloseClick.mock.calls.length, 1);
    assert.strictEqual(onClose.mock.calls.length, 1);
  });

  it('should let an open click handler prevent opening', async () => {
    const onClick = vi.fn((event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    });
    const screen = await render(
      <Dialog.Root>
        <Dialog.Open onClick={onClick}>Open</Dialog.Open>
        <Dialog.Content />
      </Dialog.Root>,
    );
    const dialog = screen.container.querySelector('dialog');

    assert.ok(dialog);

    await screen.getByRole('button', { name: 'Open' }).click();

    assert.strictEqual(onClick.mock.calls.length, 1);
    assert.isFalse(dialog.open);
  });

  it('should let a close click handler prevent closing', async () => {
    const onClick = vi.fn((event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    });
    const screen = await render(
      <Dialog.Root>
        <Dialog.Open>Open</Dialog.Open>
        <Dialog.Content>
          <Dialog.Close onClick={onClick}>Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>,
    );
    const dialog = screen.container.querySelector('dialog');

    assert.ok(dialog);

    await screen.getByRole('button', { name: 'Open' }).click();
    await screen.getByRole('button', { name: 'Close' }).click();

    assert.strictEqual(onClick.mock.calls.length, 1);
    assert.isTrue(dialog.open);
  });

  it('should focus the requested element and ignore repeated open and close calls', async () => {
    const dialogRef = createRef<DialogHandle>();
    const inputRef = createRef<HTMLInputElement>();
    const screen = await render(
      <Dialog.Root ref={dialogRef} initialFocusRef={inputRef}>
        <Dialog.Content>
          <button type="button">First focusable element</button>
          <input ref={inputRef} aria-label="Search" />
        </Dialog.Content>
      </Dialog.Root>,
    );
    const dialog = screen.container.querySelector('dialog');

    assert.ok(dialog);
    assert.ok(dialogRef.current);
    assert.ok(inputRef.current);

    const showModal = vi.spyOn(dialog, 'showModal');
    const close = vi.spyOn(dialog, 'close');

    dialogRef.current.close();
    assert.strictEqual(close.mock.calls.length, 0);

    dialogRef.current.open();
    assert.isTrue(dialog.open);
    assert.strictEqual(showModal.mock.calls.length, 1);
    assert.strictEqual(document.activeElement, inputRef.current);

    dialog.querySelector('button')?.focus();
    dialogRef.current.open();
    assert.isTrue(dialog.open);
    assert.strictEqual(showModal.mock.calls.length, 1);
    assert.strictEqual(document.activeElement, inputRef.current);

    dialogRef.current.close();
    dialogRef.current.close();
    assert.isFalse(dialog.open);
    assert.strictEqual(close.mock.calls.length, 1);
  });

  it('should toggle a modal open and closed while preserving initial focus and close events', async () => {
    const dialogRef = createRef<DialogHandle>();
    const inputRef = createRef<HTMLInputElement>();
    const onClose = vi.fn();
    const screen = await render(
      <Dialog.Root ref={dialogRef} initialFocusRef={inputRef}>
        <Dialog.Content onClose={onClose}>
          <button type="button">First focusable element</button>
          <input ref={inputRef} aria-label="Search" />
        </Dialog.Content>
      </Dialog.Root>,
    );
    const dialog = screen.container.querySelector('dialog');

    assert.ok(dialog);
    assert.ok(dialogRef.current);
    assert.ok(inputRef.current);

    dialogRef.current.toggle();

    assert.isTrue(dialog.open);
    assert.isTrue(dialog.matches(':modal'));
    assert.strictEqual(document.activeElement, inputRef.current);

    dialogRef.current.toggle();

    assert.isFalse(dialog.open);
    await vi.waitFor(() => assert.strictEqual(onClose.mock.calls.length, 1));

    dialogRef.current.toggle();

    assert.isTrue(dialog.open);
    assert.isTrue(dialog.matches(':modal'));
    assert.strictEqual(document.activeElement, inputRef.current);
  });

  it('should toggle using the current native state after button opening and native closing', async () => {
    const dialogRef = createRef<DialogHandle>();
    const screen = await render(
      <Dialog.Root ref={dialogRef}>
        <Dialog.Open>Open</Dialog.Open>
        <Dialog.Content />
      </Dialog.Root>,
    );
    const dialog = screen.container.querySelector('dialog');

    assert.ok(dialog);
    assert.ok(dialogRef.current);

    await screen.getByRole('button', { name: 'Open' }).click();
    assert.isTrue(dialog.open);

    dialogRef.current.toggle();
    assert.isFalse(dialog.open);

    dialogRef.current.open();
    dialog.close();
    assert.isFalse(dialog.open);

    dialogRef.current.toggle();
    assert.isTrue(dialog.open);
    assert.isTrue(dialog.matches(':modal'));
  });

  it('should safely handle open, close, and toggle calls without mounted content', async () => {
    const dialogRef = createRef<DialogHandle>();

    await render(<Dialog.Root ref={dialogRef}>{null}</Dialog.Root>);

    assert.ok(dialogRef.current);
    assert.doesNotThrow(() => dialogRef.current?.open());
    assert.doesNotThrow(() => dialogRef.current?.close());
    assert.doesNotThrow(() => dialogRef.current?.toggle());
  });

  it('should open when the initial focus ref has no mounted element', async () => {
    const dialogRef = createRef<DialogHandle>();
    const inputRef = createRef<HTMLInputElement>();
    const screen = await render(
      <Dialog.Root ref={dialogRef} initialFocusRef={inputRef}>
        <Dialog.Content />
      </Dialog.Root>,
    );
    const dialog = screen.container.querySelector('dialog');

    assert.ok(dialog);
    assert.ok(dialogRef.current);

    dialogRef.current.open();

    assert.isTrue(dialog.open);
  });
});
