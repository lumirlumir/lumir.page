/**
 * @fileoverview Dialog component.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  createContext,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
  type RefObject,
} from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Defines the shape of the context value provided by the `DialogContext`,
 * including the dialog reference and the `open`/`close`/`toggle` methods.
 */
interface DialogContextValue extends DialogHandle {
  readonly dialogRef: RefObject<HTMLDialogElement | null>;
}

/**
 * Imperative methods exposed through the `Dialog.Root` ref.
 */
export interface DialogHandle {
  /**
   * Opens the dialog as a modal and focuses `initialFocusRef` when provided.
   * Does nothing when the dialog content is not mounted.
   */
  readonly open: () => void;

  /**
   * Closes the dialog if it is open.
   * Does nothing when the dialog content is not mounted.
   */
  readonly close: () => void;

  /**
   * Closes the dialog when open, or opens it as a modal and focuses `initialFocusRef`.
   * Does nothing when the dialog content is not mounted.
   */
  readonly toggle: () => void;
}

/**
 * Props for the `Dialog.Root` component.
 */
export interface DialogRootProps {
  /**
   * Children that share the dialog context, including `Dialog.Content` and its controls.
   */
  readonly children: ReactNode;

  /**
   * Ref that exposes the dialog's `open`, `close`, and `toggle` methods.
   * @default undefined
   */
  readonly ref?: Ref<DialogHandle>;

  /**
   * Ref to the element to focus whenever `open` is called, even if the dialog is already open.
   * @default undefined
   */
  readonly initialFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * Native `<dialog>` props for `Dialog.Content`, excluding the internally managed ref.
 * The `closedby` prop defaults to `'any'`.
 */
export type DialogContentProps = ComponentPropsWithoutRef<'dialog'>;

/**
 * Native button props and ref for `Dialog.Open`, excluding the fixed `type="button"`.
 */
export type DialogOpenProps = Omit<ComponentPropsWithRef<'button'>, 'type'>;

/**
 * Native button props and ref for `Dialog.Close`, excluding the fixed `type="button"`.
 */
export type DialogCloseProps = Omit<ComponentPropsWithRef<'button'>, 'type'>;

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const DialogContext = createContext<DialogContextValue | undefined>(undefined);

function useDialogContext(): DialogContextValue {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('Dialog components must be used within `Dialog.Root`');
  }

  return context;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Provides shared dialog controls to `Dialog.Content`, `Dialog.Open`, and `Dialog.Close`
 * without rendering a DOM wrapper.
 *
 * Pass a `ref` to call `open()`, `close()`, or `toggle()` imperatively, and `initialFocusRef` to
 * choose which element receives focus when the dialog opens.
 *
 * @example
 * ```tsx
 * import { Dialog } from '@lumir/react-kit/components';
 * import { useRef } from 'react';
 *
 * function Component() {
 *   const inputRef = useRef<HTMLInputElement>(null);
 *
 *   return (
 *     <Dialog.Root initialFocusRef={inputRef}>
 *       <Dialog.Open>Open search</Dialog.Open>
 *       <Dialog.Content aria-label="Search">
 *         <input ref={inputRef} type="search" aria-label="Search query" />
 *         <Dialog.Close>Close search</Dialog.Close>
 *       </Dialog.Content>
 *     </Dialog.Root>
 *   );
 * }
 * ```
 */
export function DialogRoot({ children, ref, initialFocusRef }: DialogRootProps) {
  'use no memo'; // Avoid a ref-access false positive when React Compiler processes the emitted JSX runtime call.

  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog === null) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    initialFocusRef?.current?.focus();
  }, [initialFocusRef]);

  const close = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog === null) {
      return;
    }

    if (dialog.open) {
      dialog.close();
    }
  }, []);

  const toggle = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog === null) {
      return;
    }

    if (dialog.open) {
      close();
    } else {
      open();
    }
  }, [open, close]);

  useImperativeHandle(ref, () => ({ open, close, toggle }));

  return (
    <DialogContext
      value={useMemo(
        () => ({ dialogRef, open, close, toggle }),
        [dialogRef, open, close, toggle],
      )}
    >
      {children}
    </DialogContext>
  );
}

/**
 * Renders the native `<dialog>` element using the ref managed by `Dialog.Root`.
 * Forwards native dialog props and defaults `closedby` to `'any'`.
 *
 * @throws {Error} If rendered outside `Dialog.Root`.
 */
export function DialogContent({
  // Specifies the types of user actions that can be used to close the `<dialog>` element.
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby
  closedby = 'any',
  ...props
}: DialogContentProps) {
  const { dialogRef } = useDialogContext();

  return <dialog {...props} ref={dialogRef} closedby={closedby} />;
}

/**
 * Renders a `type="button"` control that opens the dialog.
 * Calls the supplied `onClick` first; `event.preventDefault()` prevents opening.
 * Forwards the remaining button props and ref to the native element.
 *
 * @throws {Error} If rendered outside `Dialog.Root`.
 */
export function DialogOpen({ onClick, ...props }: DialogOpenProps) {
  const { open } = useDialogContext();

  return (
    <button
      {...props}
      type="button"
      onClick={event => {
        onClick?.(event);
        if (!event.defaultPrevented) open();
      }}
    />
  );
}

/**
 * Renders a `type="button"` control that closes the dialog.
 * Calls the supplied `onClick` first; `event.preventDefault()` prevents closing.
 * Forwards the remaining button props and ref to the native element.
 *
 * @throws {Error} If rendered outside `Dialog.Root`.
 */
export function DialogClose({ onClick, ...props }: DialogCloseProps) {
  const { close } = useDialogContext();

  return (
    <button
      {...props}
      type="button"
      onClick={event => {
        onClick?.(event);
        if (!event.defaultPrevented) close();
      }}
    />
  );
}

/**
 * Compound dialog components: `Root`, `Content`, `Open`, and `Close`.
 * @see {@linkcode DialogRoot} for usage examples.
 */
export const Dialog = {
  Root: DialogRoot,
  Content: DialogContent,
  Open: DialogOpen,
  Close: DialogClose,
} as const;
