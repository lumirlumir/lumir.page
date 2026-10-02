/**
 * @fileoverview Type test for `dialog.tsx`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { createRef, type ComponentProps, type ReactElement } from 'react';
import {
  Dialog,
  DialogRoot,
  DialogContent,
  DialogOpen,
  DialogClose,
  type DialogHandle,
  type DialogRootProps,
  type DialogContentProps,
  type DialogOpenProps,
  type DialogCloseProps,
} from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region DialogHandle

const handle: DialogHandle = { open: () => {}, close: () => {}, toggle: () => {} };

handle.open() satisfies void;
handle.close() satisfies void;
handle.toggle() satisfies void;

// @ts-expect-error - `close` is required.
({ open: () => {}, toggle: () => {} }) satisfies DialogHandle;
// @ts-expect-error - `toggle` is required.
({ open: () => {}, close: () => {} }) satisfies DialogHandle;
// @ts-expect-error - `open` should be a function.
({ open: true, close: () => {}, toggle: () => {} }) satisfies DialogHandle;
// @ts-expect-error - `toggle` should be a function.
({ open: () => {}, close: () => {}, toggle: true }) satisfies DialogHandle;
// @ts-expect-error - `open` does not accept arguments.
handle.open('search');
// @ts-expect-error - `close` does not accept arguments.
handle.close('search');
// @ts-expect-error - `toggle` does not accept arguments.
handle.toggle('search');
// @ts-expect-error - The handle does not expose the native dialog element.
handle.showModal();

// #endregion DialogHandle
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region DialogRootProps

const dialogRef = createRef<DialogHandle>();
const inputRef = createRef<HTMLInputElement>();
const buttonRef = createRef<HTMLButtonElement>();
let rootProps: DialogRootProps;

rootProps = { children: null };
rootProps = { children: 'Content', ref: dialogRef };
rootProps = { children: <span />, initialFocusRef: inputRef };
rootProps = { children: <span />, initialFocusRef: buttonRef };
rootProps = {
  children: null,
  ref: value => {
    value?.open();
    value?.close();
    value?.toggle();
  },
};

// @ts-expect-error - `children` is required.
rootProps = {};
// @ts-expect-error - `ref` should reference a dialog handle.
rootProps = { children: null, ref: inputRef };
// @ts-expect-error - Initial focus requires an HTMLElement ref.
rootProps = { children: null, initialFocusRef: dialogRef };
// @ts-expect-error - The root does not render a DOM wrapper.
rootProps = { children: null, className: 'dialog' };

// #endregion DialogRootProps
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region DialogContentProps

let contentProps: DialogContentProps;

contentProps = {};
contentProps = { children: 'Content', className: 'dialog', 'aria-label': 'Search' };
contentProps = { closedby: 'any' };
contentProps = { closedby: 'closerequest' };
contentProps = { closedby: 'none' };
contentProps = {
  onClose: event => {
    event.currentTarget satisfies HTMLDialogElement;
  },
  onCancel: event => {
    event.currentTarget satisfies HTMLDialogElement;
    event.preventDefault();
  },
};

// @ts-expect-error - The content ref is managed by Dialog.Root.
contentProps = { ref: createRef<HTMLDialogElement>() };
// @ts-expect-error - `closedby` only accepts native dismissal policies.
contentProps = { closedby: 'outside' };
// @ts-expect-error - `href` is not a dialog attribute.
contentProps = { href: '/search' };

// #endregion DialogContentProps
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region DialogOpenProps

let openProps: DialogOpenProps;

openProps = {};
openProps = { children: 'Open', ref: createRef<HTMLButtonElement>(), disabled: true };
openProps = {
  onClick: event => {
    event.currentTarget satisfies HTMLButtonElement;
    event.preventDefault();
  },
};

// @ts-expect-error - The open button always uses type="button".
openProps = { type: 'submit' };
// @ts-expect-error - The open ref should reference a button.
openProps = { ref: createRef<HTMLInputElement>() };
// @ts-expect-error - `href` is not a button attribute.
openProps = { href: '/search' };

// #endregion DialogOpenProps
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region DialogCloseProps

let closeProps: DialogCloseProps;

closeProps = {};
closeProps = {
  children: 'Close',
  ref: createRef<HTMLButtonElement>(),
  'aria-label': 'Close search',
};
closeProps = {
  onClick: event => {
    event.currentTarget satisfies HTMLButtonElement;
    event.preventDefault();
  },
};

// @ts-expect-error - The close button always uses type="button".
closeProps = { type: 'submit' };
// @ts-expect-error - The close ref should reference a button.
closeProps = { ref: createRef<HTMLInputElement>() };
// @ts-expect-error - `href` is not a button attribute.
closeProps = { href: '/search' };

// #endregion DialogCloseProps
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region Dialog

({}) as typeof Dialog.Root satisfies typeof DialogRoot;
({}) as typeof Dialog.Content satisfies typeof DialogContent;
({}) as typeof Dialog.Open satisfies typeof DialogOpen;
({}) as typeof Dialog.Close satisfies typeof DialogClose;
({}) as ComponentProps<typeof DialogRoot> satisfies DialogRootProps;
({}) as ComponentProps<typeof DialogContent> satisfies DialogContentProps;
({}) as ComponentProps<typeof DialogOpen> satisfies DialogOpenProps;
({}) as ComponentProps<typeof DialogClose> satisfies DialogCloseProps;
({}) as ReturnType<typeof DialogRoot> satisfies ReactElement;
({}) as ReturnType<typeof DialogContent> satisfies ReactElement;
({}) as ReturnType<typeof DialogOpen> satisfies ReactElement;
({}) as ReturnType<typeof DialogClose> satisfies ReactElement;

function DialogTypeTest() {
  return [
    <Dialog.Root key="compound" ref={dialogRef} initialFocusRef={inputRef}>
      <Dialog.Open ref={buttonRef}>Open</Dialog.Open>
      <Dialog.Content aria-label="Search">
        <input ref={inputRef} />
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>,
    <DialogRoot key="named">
      <DialogOpen>Open</DialogOpen>
      <DialogContent closedby="none">
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </DialogRoot>,

    // @ts-expect-error - `children` is required.
    <Dialog.Root key="missing-children" />,
    // @ts-expect-error - The content ref is managed by `Dialog.Root`.
    <Dialog.Content key="content-ref" ref={createRef<HTMLDialogElement>()} />,
    // @ts-expect-error - The open button type cannot be overridden.
    <Dialog.Open key="open-type" type="submit" />,
    // @ts-expect-error - The close button type cannot be overridden.
    <Dialog.Close key="close-type" type="submit" />,
  ];
}

// #endregion Dialog
// --------------------------------------------------------------------------------
